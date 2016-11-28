(function() {
    angular.module('app').directive('dirReportes', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/reportes/dir-reportes.html',
            controller: controller
        };
    });


    function controller($scope, $timeout, Reporte, Config) {
        $scope.config = Config;

        $scope.individuales = [];
        $scope.selected = [];

        google.charts.load('current', {
            packages: ['corechart', 'bar']
        });


        Reporte.darTipos().then(function(tipos) {
            $scope.tiposDeReporte = tipos;
            $scope.tipoReporteActual = tipos[0];
        });

        $scope.$watch('tipoReporteActual', function(tipoReporte) {
            Reporte.darReporte(tipoReporte).then(function(reporte) {
                google.charts.setOnLoadCallback(drawBasic(reporte));
            });
        });






        function drawBasic(reporte) {
            function paint() {
                var data = new google.visualization.DataTable();
                data.addColumn('number', reporte.xTitle);
                data.addColumn('number', reporte.yTitle);
                data.addRows(reporte.datos);

                var options = {
                    title: reporte.title,
                    hAxis: {
                        title: reporte.xTitle,
                    },
                    vAxis: {
                        title: reporte.yTitle
                    }
                };
                var chart = new google.visualization.ColumnChart(
                    document.getElementById('chart_div'));

                chart.draw(data, options);
                google.visualization.events.addListener(chart, 'select', selectHandler);

                function selectHandler(e) {
                    //X
                    var selected = chart.getSelection()[0];
                    var periodo = selected ? selected.row : null;
                    console.log('A table row was selected', e, periodo);
                    if (periodo)
                        seleccionarPeriodo(periodo);
                }
            }

            return paint;
        }

        function seleccionarPeriodo(periodo) {
            Reporte.darRecorridos(periodo).then(function(individuales) {
                $scope.individuales = individuales;
            });
        }

    }
})();
