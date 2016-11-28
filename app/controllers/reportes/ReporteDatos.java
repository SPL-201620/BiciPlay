package controllers.reportes;

import com.google.gson.annotations.Expose;

import java.util.List;

/**
 * Created by jose on 11/27/16.
 */
public class ReporteDatos {
    @Expose
    private String title;
    @Expose
    private String xTitle;
    @Expose
    private String yTitle;
    @Expose
    private double [][] datos;

    public ReporteDatos (){
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getxTitle() {
        return xTitle;
    }

    public void setxTitle(String xTitle) {
        this.xTitle = xTitle;
    }

    public String getyTitle() {
        return yTitle;
    }

    public void setyTitle(String yTitle) {
        this.yTitle = yTitle;
    }

    public double[][] getDatos() {
        return datos;
    }


    public void setDatos(List<Reporte> datosP, int numPeriodos ) {
        datos = new double[numPeriodos][2];
        for (int i = 0; i<numPeriodos; i++) {
            datos[i][0] = i;
        }
        for (int i = 0; i<datosP.size(); i++) {
            Reporte reporte = datosP.get(i);
            datos[reporte.getPeriodo()][1] = reporte.getCantidad();
        }
    }
}
