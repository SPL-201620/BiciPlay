
package controllers.reportes;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import controllers.recorridos.*;
import controllers.retos.Reto;
import controllers.ruta.Ubicacion;
import controllers.usuarios.Usuario;
import play.api.libs.json.JsPath;
import play.db.ebean.Transactional;
import play.mvc.Result;
import services.Counter;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManagerFactory;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static play.mvc.Controller.request;
import static play.mvc.Controller.session;
import static play.mvc.Results.badRequest;
import static play.mvc.Results.ok;

@Singleton
public class ReportesController {

    public static final String UNIDAD_TIEMPO = "semana";
    public static final int NUM_PERIODOS = 53;
    public static final int PERIODO = Calendar.WEEK_OF_YEAR;


    public static final String TIPO_INDIVIDUAL = "Recorridos individuales";
    public static final String TIPO_DISTANCIA = "Distancia Recorrida (km)";
    public static final String TIPO_TIEMPO = "Tiempo invertido (min)";
    public static final String TIPO_VELOCIDAD = "Velocidad promedio (km/h)";
    public static final String TIPO_CALORIAS = "Calorias quemadas (Cal)";
    public static final String TIPO_GRUPALES = "Recorridos grupales";
    public static final String [] TIPOS = {TIPO_INDIVIDUAL, TIPO_DISTANCIA, TIPO_TIEMPO, TIPO_VELOCIDAD, TIPO_CALORIAS, TIPO_GRUPALES};





    public final static String ID_USUARIO = "idUsuario";
    private final static Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

    private static final String PERSISTENCE_UNIT_NAME = "defaultPersistenceUnit";


    private static EntityManagerFactory factory;

    @Inject
    public ReportesController(Counter counter) {

    }

    private static Reporte actualizar(String tipo, double cantidad, boolean agregar) {

        System.out.println("TIPO DATO: " + tipo);
        Date fecha = new Date();
        Calendar calendar = Calendar.getInstance();
        int periodo = calendar.get(PERIODO);
        Reporte reporte = Reporte.find.where()
                .eq("usuario_id", getUsuarioLogIn())
                .eq("tipo", tipo)
                .eq("periodo", periodo)
                .findUnique();

        if(reporte == null){
            reporte = new Reporte(tipo, cantidad, periodo, new Usuario(getUsuarioLogIn()));
        } else {
            double nuevaCantidad = agregar?reporte.cantidad + cantidad: cantidad;
            reporte.setCantidad(nuevaCantidad);
        }
        reporte.save();
        return reporte;
    }

    public static Reporte registrar (String tipo, double cantidad){
        if(tipo.equals(TIPO_TIEMPO)){
            Reporte rTiempo = actualizar(TIPO_TIEMPO, cantidad, true);
            Reporte rDistancia = actualizar(TIPO_DISTANCIA, 0, true);
            actualizar(TIPO_VELOCIDAD, rDistancia.cantidad/(rTiempo.cantidad/60), false);
            return rTiempo;
        } else if(tipo.equals(TIPO_DISTANCIA)){
            Reporte rTiempo = actualizar(TIPO_TIEMPO, 0, true);
            Reporte rDistancia = actualizar(TIPO_DISTANCIA, cantidad, true);
            actualizar(TIPO_VELOCIDAD, rDistancia.cantidad/(rTiempo.cantidad/60), false);
            return rTiempo;
        } else{
            return actualizar(tipo, cantidad, true);
        }

    }
    public Result darReporte() {
        JsonNode json = request().body().asJson();
        ReporteDatos reporte=  buildReporte(json.findPath("tipo").textValue());

        return ok(GSON.toJson(reporte));
    }

    public ReporteDatos buildReporte(String tipo){
        ReporteDatos reporteDatos = new ReporteDatos();
        reporteDatos.setTitle(tipo + " por " + UNIDAD_TIEMPO);
        reporteDatos.setxTitle(UNIDAD_TIEMPO + "s");
        reporteDatos.setyTitle(tipo);

        List<Reporte> datos = Reporte.find.where()
                .eq("usuario_id", getUsuarioLogIn())
                .eq("tipo", tipo)
                .orderBy("periodo")
                .findList();
        reporteDatos.setDatos(datos, NUM_PERIODOS);
        return reporteDatos;
    }

    public Result darTiposReporte() {
        return ok(GSON.toJson(TIPOS));
    }

    public Result darIndividualesEnPeriodo(int periodo){
        Calendar cal = Calendar.getInstance();
        cal.set(PERIODO, periodo);

        //TODO cambiar implementación para meses
        Calendar first = (Calendar) cal.clone();
        first.add(Calendar.DAY_OF_WEEK, first.getFirstDayOfWeek() - first.get(Calendar.DAY_OF_WEEK));

        Calendar last = (Calendar) first.clone();
        last.add(Calendar.DAY_OF_YEAR, 6);

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        System.out.println("TIME: " +  df.format(cal.getTime()) + " _ " + df.format(first.getTime()) + " -> " +
                df.format(last.getTime()));

        List<RecorridoIndividual> misRecorridos = RecorridoIndividual.find.where()
                .eq("usuarioCreador", getUsuarioLogIn())
                .between("fecha", getStartOfDay(first.getTime()), getEndOfDay(last.getTime())).findList();
        return ok(GSON.toJson(misRecorridos));

    }
    public Date getEndOfDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        return calendar.getTime();
    }

    public Date getStartOfDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }




    public static int getUsuarioLogIn() {
        return Integer.valueOf(session(ID_USUARIO));
    }


}
