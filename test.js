<html>
    <head>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />

    <title>Ajaveeb</title>

    <!-- Load c3.css -->

    <link href="c3/c3.css" rel="stylesheet">

    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }

        table, th, td {
            border: 1px solid black;
        }

        th, td {
            padding: 15px;
            text-align: left;
        }

        .container {
            width: 100%;
            height: 50%;
        }
    </style>

    <!-- Load d3.js and c3.js -->

    <script src="https://d3js.org/d3.v5.min.js" charset="utf-8"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="c3/c3.min.js"></script>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="./Chart.js"></script>


    </head>

    <body>
        <div id="navigation">
            <a href="./frontPage.html">go to front page</a>
        </div>
        <div id="dataTable"></div>
        <div id="buttons">
            <button id="selectRows" onClick="onSelectRow()">Select row</button>
        </div>

        <div class="container">
            <canvas id="myChart"></canvas>
        </div>

        <script>
            function showData() {
                
                  if (window.XMLHttpRequest) {
                        // code for IE7+, Firefox, Chrome, Opera, Safari
                        xmlhttp = new XMLHttpRequest();
                    } else {
                        // code for IE6, IE5
                        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    xmlhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            document.getElementById("dataTable").innerHTML = this.responseText;
                        }
                    };
                    xmlhttp.open("GET","getData.php",true);
                    xmlhttp.send();
            }

            showData();

            function getDataFromCsv() {
                let aData = [];
                d3.csv("AqData2.csv", function(data) {
                    aData.push(data);
                });
                return aData;
            }

            let aDataFromCsv = getDataFromCsv();

            function onSelectRow() {
                let table = document.getElementById("data");
                let rows = table.getElementsByTagName("tr");
                for (i = 0; i < rows.length; i++) {
                    let currentRow = table.rows[i];
                    let createClickHandler = function(row) {
                    return function() {
                        console.log(row.getElementsByTagName("td"));
                        let sStartTime = row.getElementsByTagName("td")[1].innerText;
                        let sEndTime = row.getElementsByTagName("td")[2].innerText;
                        let iGraphType = row.getElementsByTagName("td")[4].innerText;
                        createGraph(sStartTime, sEndTime, iGraphType);
                    };
                    };
                    currentRow.onclick = createClickHandler(currentRow);
                }
            }

            
            
            function createGraph(sStartTime, sEndTime, iGraph) {

                console.log(aDataFromCsv);
                let aGraphData = aDataFromCsv.filter(function (oData){
                    return oData.Timestamp < sEndTime && oData.Timestamp > sStartTime;
                });

                console.log(aGraphData);

                let oGraphs = {
                    0: "line",
                    1: "bar",
                    2: "boxplot"
                };

                let sGraph = oGraphs[iGraph];

                //Parse array data into array of values

                let aTemps = aGraphData.map(function (oData) {
                    return oData.Temperature;
                });

                let aTimestamps = aGraphData.map(function (oData) {
                    return oData.Timestamp;
                });
                
                let aWater = aGraphData.map(function (oData) {
                    return oData.WaterLevel;
                });

                let aLight = aGraphData.map(function (oData) {
                    return oData.LightLevel;
                });

                //Calculate Average

                let tempSum, tempAvg, waterAvg, waterSum, lightSum, lightAvg = 0;

                if (aTemps.length)
                {
                    tempSum = aTemps.reduce(function(a, b) { return +a + +b; });
                    tempAvg = tempSum / aTemps.length;
                }

                if (aWater.length)
                {
                    waterSum = aWater.reduce(function(a, b) { return +a + +b; });
                    waterAvg = waterSum / aWater.length;
                }

                if (aLight.length)
                {
                    lightSum = aLight.reduce(function(a, b) { return +a + +b; });
                    lightAvg = lightSum / aLight.length;
                }

                let dataDiv = document.getElementById('data');

                //Calculate median

                function getMedian(array) {
                    if (array.length) {
                        let sorted = array.slice().sort((a, b) => +a - +b);
                        let middle = Math.floor(sorted.length / 2);

                        if (sorted.length % 2 === 0) {
                            return (sorted[middle - 1] + sorted[middle]) / 2;
                        }

                        return sorted[middle];
                    }
                }

                let tempMedian = getMedian(aTemps);
                let waterMedian = getMedian(aWater);
                let lightMedian = getMedian(aLight);

                console.log(tempMedian);
                console.log(waterMedian);
                console.log(lightMedian);
                
                console.log(aWater);

                if (iGraph == 0) {
                    var ctx = document.getElementById('myChart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: aTimestamps,
                            datasets: [{
                                label: 'temperature',    
                                data: aTemps,
                                backgroundColor: "#3e95cd",
                                fill: false
                            }, {
                                label: 'Water level',    
                                data: aWater,
                                backgroundColor: "#8e5ea2",
                                fill: false
                            },  {
                                label: 'Light level',    
                                data: aLight,
                                backgroundColor: "#3cba9f",
                                fill: false
                            }]
                        },
                        options: {
                        }
                    });
                } else if (iGraph == 1) {
                    var ctx = document.getElementById('myChart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: aTimestamps,
                            datasets: [{
                                label: 'temperature',    
                                data: aTemps,
                                backgroundColor: "#3e95cd"
                            }, {
                                label: 'Water level',    
                                data: aWater,
                                backgroundColor: "#8e5ea2"
                            },  {
                                label: 'Light level',    
                                data: aLight,
                                backgroundColor: "#3cba9f"
                            }]
                        },
                        options: {
                        }
                    });
                } else if(iGraph == 2) {
                    var ctx = document.getElementById('myChart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: aTimestamps,
                            datasets: [{
                                label: 'temperature',    
                                data: aTemps,
                                backgroundColor: "#3e95cd"
                            }, {
                                label: 'Water level',    
                                data: aWater,
                                backgroundColor: "#8e5ea2"
                            },  {
                                label: 'Light level',    
                                data: aLight,
                                backgroundColor: "#3cba9f"
                            }]
                        },
                        options: {
                        }
                    });


                }

            }
            
        </script>
     </body>
</html>