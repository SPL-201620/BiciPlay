package controllers.configurador;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.Arrays;

/**
 * Created by andres on 27/11/16.
 */
public  class ConfiguracionesValidas {

    private static String [][]configuraciones;


    public static void leerArchivo() {
        File archivo = null;
        FileReader fr = null;
        BufferedReader br = null;
        int contador=0;

        File miDir = new File (".");
        try {
            System.out.println ("Directorio actual: " + miDir.getCanonicalPath());
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        try {

            archivo = new File("app//controllers//configurador//configuraciones");
            fr = new FileReader(archivo);
            br = new BufferedReader(fr);
            String linea;
            linea = br.readLine();
            linea=linea.replace('[',' ');
            String[] configuracionesLinea = linea.split("],  ");
            configuraciones=new String [configuracionesLinea.length][];
            for (int i = 0; i < configuracionesLinea.length; i++) {
                configuraciones[i]=configuracionesLinea[i].split(", ");
                Arrays.sort(configuraciones[i]);
                contador++;
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (null != fr) {
                    fr.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
    }



    public static String[][] getConfiguracionesValidas(){

        return configuraciones;

    }

}
