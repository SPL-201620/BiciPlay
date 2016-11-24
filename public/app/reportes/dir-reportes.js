(function() {
    angular.module('app').directive('dirReportes', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/reportes/dir-reportes.html',
            controller: controller
        };
    });


    function controller($scope, $timeout, Reporte) {
        $scope.nombreReporte = "Hola Mundo ";
        google.charts.load('current', {
            packages: ['corechart', 'bar']
        });
        google.charts.setOnLoadCallback(drawBasic);


        function drawBasic() {

            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Semana');
            data.addColumn('number', 'Velocidad');

            data.addRows([
                [1, 2],
                [2, 6],
                [3, 3],
                [4, 4],
                [5, 7],
            ]);

            var options = {
                title: 'Velocidad promedio por semana',
                hAxis: {
                    title: 'Número de semana',
                },
                vAxis: {
                    title: 'Velocidad promedio'
                }
            };

            var chart = new google.visualization.ColumnChart(
                document.getElementById('chart_div'));

            chart.draw(data, options);
            google.visualization.events.addListener(chart, 'select', selectHandler);

            function selectHandler(e) {
                console.log('A table row was selected', e, chart.getSelection()[0].row);
            }
        }

    }
})();
