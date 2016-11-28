package controllers.configurador;


import com.avaje.ebean.Expr;
import com.avaje.ebean.ExpressionList;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import controllers.usuarios.Usuario;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.Counter;
import java.util.Arrays;
import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManagerFactory;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.List;


/**
 * Created by andres on 26/11/16.
 */
public class ConfiguradorController extends Controller {

    public final static String ID_USUARIO = "idUsuario";
    public final static String ROL_USUARIO = "rol";
    private final static Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

    private static final String PERSISTENCE_UNIT_NAME = "defaultPersistenceUnit";
    private static EntityManagerFactory factory;



    public Result validarConfiguracion2() {
        JsonNode json = request().body().asJson();
        if (json == null) {
            return badRequest("Expecting Json data");
        } else {
            String manubrio = json.findPath("manubrio").textValue();
            String marco = json.findPath("marco").textValue();
            String tenedor = json.findPath("tenedor").textValue();
            String frenos = json.findPath("frenos").textValue();
            String cambios = json.findPath("cambios").textValue();
            String llantas = json.findPath("llantas").textValue();
            String otros = json.findPath("otros").textValue();
            if (otros == null) {
                return badRequest("Digite un  o correo para buscar");
            } else {

                Configurador config = Configurador.find.where().and(
                        Expr.eq("manubrio", manubrio),
                        Expr.and(Expr.eq("marco", marco),
                                Expr.and(Expr.eq("tenedor", tenedor),
                                        Expr.and(Expr.eq("frenos", frenos),
                                                Expr.and(Expr.eq("cambios", cambios),
                                                        Expr.and(Expr.eq("llantas", llantas),
                                                                Expr.eq("otros", otros))))))).findUnique();

                if (config == null)
                    return ok("null");
                else
                    return ok("ok");


            }
        }
    }


    public Result validarConfiguracion() {
        JsonNode json = request().body().asJson();
        if (json == null) {
            return badRequest("Expecting Json data");
        } else {
            String configuracion = json.findPath("configuracion").textValue();
            if (configuracion == null) {
                return badRequest("Error con el JSon");
            } else {
                String[] Arreglo = configuracion.split(",");
                String [][]configuraciones= ConfiguracionesValidas.getConfiguracionesValidas();
                for (int i = 0; i < configuraciones.length; i++) {
                     if(Arrays.toString(Arreglo).contains(Arrays.toString(configuraciones[i])) )
                        return ok("ok");
                }
                    return ok("bad");
            }
        }
    }


}
