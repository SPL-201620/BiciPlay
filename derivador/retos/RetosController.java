
package controllers.retos;

import controllers.ruta.Ubicacion;
import play.db.ebean.Transactional;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import controllers.recorridos.RecorridoGrupal;
import controllers.recorridos.RecorridoIndividual;
import controllers.usuarios.Usuario;
import org.hibernate.Session;
import org.hibernate.Transaction;
import play.mvc.Result;
import services.Counter;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManagerFactory;
import java.util.ArrayList;
import java.util.List;

import static play.mvc.Controller.request;
import static play.mvc.Controller.session;
import static play.mvc.Results.badRequest;
import static play.mvc.Results.ok;

/**
 * Created by Daniel on 2/10/2016.
 */
@Singleton
public class RetosController {
    public final static String ID_USUARIO = "idUsuario";
    private final static Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

    private static final String PERSISTENCE_UNIT_NAME = "defaultPersistenceUnit";
    private static EntityManagerFactory factory;

    @Inject
    public RetosController(Counter counter) {

    }

    public Result retarAmigo() {
        JsonNode json = request().body().asJson();
        if (json == null) return badRequest("Expecting Json data");

        Reto reto = new Reto();
        reto.creador = new Usuario(getUsuarioLogIn());
        reto.retado = new Usuario(json.findPath("retadoId").asInt());
        reto.recorrido = new RecorridoIndividual(json.findPath("recorridoId").asInt());
        reto.save();
        return ok(GSON.toJson(reto));
    }


    public Result darRetos() {
        List<Reto> misRetos = Reto.find.where().eq("retado_id", getUsuarioLogIn()).findList();
        for(Reto reto: misRetos){
            reto.retado = Usuario.find.byId((long)reto.retado.id);
            reto.creador = Usuario.find.byId((long)reto.creador.id);
            reto.recorrido = RecorridoIndividual.find.byId((long)reto.recorrido.id);
        }
        return ok(GSON.toJson(misRetos));
    }

    @Transactional
    public Result asociarReccorrido(int idReto){

        JsonNode json = request().body().asJson();
        if (json == null) return badRequest("Expecting Json data");
        int idRecorrido = json.findPath("recorridoId").asInt();
        Reto reto = Reto.find.byId(idReto);
        RecorridoIndividual recorridoRealizado = RecorridoIndividual.find.byId((long)idRecorrido);
        RecorridoIndividual recorridoPropuesto = RecorridoIndividual.find.byId((long)reto.recorrido.id);

        Ubicacion inicioRealizado = recorridoRealizado.ubicaciones.get(0);
        Ubicacion inicioPropuesto = recorridoPropuesto.ubicaciones.get(0);
        Ubicacion finRealizado = recorridoRealizado.ubicaciones.get(recorridoRealizado.ubicaciones.size()-1);
        Ubicacion finPropuesto = recorridoPropuesto.ubicaciones.get(recorridoPropuesto.ubicaciones.size()-1);
        String mensaje;
        if( inicioRealizado.compareTo(inicioPropuesto) == 0 && finRealizado.compareTo(finPropuesto) == 0 || inicioRealizado.compareTo(finPropuesto) == 0 && finRealizado.compareTo(inicioPropuesto) == 0){
            if(reto.recorridoRealizado == null){
                reto.setRecorridoRealizado(recorridoRealizado);
                reto.update();
                System.out.println("Se asocia el recorrido " + reto.recorridoRealizado.id + " al reto " + reto.id);
                mensaje = "Se ha registrado tu recorrido. Ya puedes ver tu clasificación.";
            } else {
                RecorridoIndividual recorridoAnterior = RecorridoIndividual.find.byId((long)reto.recorridoRealizado.id);
                if(recorridoAnterior.duracion > recorridoRealizado.duracion){

                    reto.setRecorridoRealizado(recorridoRealizado);
                    reto.update();
                    mensaje = "Has superado tu marca. Ya puedes ver tu nueva clasificación.";
                } else{
                    mensaje = "No has superado tu marca, inténtalo de nuevo.";
                }
            }
        } else{
            recorridoRealizado.delete();
            mensaje = "No has llegado a la meta del recorrido aún.";
        }

        return ok(mensaje);
    }

    public Result ranking(int recorridoPropuestoId){
        List<Reto> retosRanking = Reto.find.where().eq("recorrido_id", recorridoPropuestoId).findList();

        List<Reto> toRemove = new ArrayList<Reto>();
        for(Reto reto: retosRanking){
            if(reto.recorridoRealizado == null){
                toRemove.add(reto);
            } else{
                reto.retado = Usuario.find.byId((long)reto.retado.id);
                reto.creador = Usuario.find.byId((long)reto.creador.id);
                reto.recorrido = RecorridoIndividual.find.byId((long)reto.recorrido.id);
                reto.recorridoRealizado = RecorridoIndividual.find.byId((long)reto.recorridoRealizado.id);
            }

        }

        retosRanking.removeAll(toRemove);
        return ok(GSON.toJson(retosRanking));
    }


    public int getUsuarioLogIn() {
        //  return 21;
        return Integer.valueOf(session(ID_USUARIO));

    }
}
