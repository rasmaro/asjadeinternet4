<html>

 <head>
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />

  <title>Graphs</title>

  <!-- Load c3.css -->

<link href="c3/c3.css" rel="stylesheet">



<!-- Load d3.js and c3.js -->

<script src="https://d3js.org/d3.v5.min.js" charset="utf-8"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="c3/c3.min.js"></script>

<script>
    function barMode(){
        setTimeout(function () {
            chart.transform('bar');
        }, 500);
    }
    
    function lineMode(){
        setTimeout(function () {
            chart.transform('spline');
        }, 500);
        
    }
    
    function myAjax() {
      $.ajax({
           type: "POST",
           url: 'update.php',
           data:{action:'call_this'},
           success:function(html) {
             alert(html);
           }

      });
 }
 
 
</script>

 </head>

 <body>
     
     <div id="buttons">
        <button onclick="barMode()">Tulbad</button>
        <button onclick="lineMode()">Jooned</button>
        <a href="" onclick="myAjax()" >Refresh Data</a>
        <a href="./timeWeb.html" >go to time web</a>
     </div>

 <div id="chart">

    <script>


    var chart=c3.generate({
   data: {
       url: '/AquariumProj/charts_team2/AqData1.csv',
       x: 'Timestamp',
       xFormat: '%Y-%m-%d %H:%M:%S', // how the date is parsed
        //~ My date format in .csv file is: 3/2/2016 6:44:00 PM
       columns: [
            ['Timestamp'],
            ['Temperature'],
            ['LightLevel']
        ],
        axes: {
            Timestamp: 'y',
            Temperature: 'y',
            LightLevel: 'y2'
        },
        type: 'spline'
    },
    axis: {
        x: {
                type: 'timeseries',
            tick: {
                format: '%Y-%m-%d %H:%M' // how the date is displayed
            }
            },
            y2: {
            show: true
        }
        },
    zoom: {
  enabled: true
},
    subchart: {
        show: true
    },
    bar: {
  width: {
    ratio: 1
  }
}
});

    </script>
    
    </div>
 
    <div id ="period">
        <form id="savePeriod">
            <label>Vali perioodi päevade arv:</label>
            <select id="daySelection"></select>
            <br>
            <label>Vali perioodi pikkus:</label>
            <select id="periodLength"></select>
            <br>
            <label>Vali diagrammi tüüp:</label>
            <select id="diagramSelection"></select>
            <br>
            <label>Kommentaar:</label>
            <input type="text" id="comment">
            <br>
        </form>
        <label>salvesta valik</label>
        <button onclick="saveSelection()">Salvesta</button>
        <script> 
            
            function getData() {
                let aData = [];
                d3.csv("AqData.csv", function(data) {
                    aData.push(data);
                });
                return aData;
            }
            
            let data = getData();
            
            let oDaySelection = document.getElementById("daySelection");
            let oPeriodSelection = document.getElementById("periodLength");
            let oDiagramSelection = document.getElementById("diagramSelection");

            let aDayAmount = [1, 2, 3, 4, 5, 6, 7];
            let aPeriodLengthText = ["1 tund", "2 tundi", "3 tundi", "6 tundi", "12 tundi"];
            let aDiagramSelectionText = ["joondiagramm", "tulpdiagramm", "karpdiagramm"];

            for(i=0; i < aDayAmount.length; i++){
                let opt = aDayAmount[i];
                let el= document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                oDaySelection.appendChild(el);
            };

            for (i=0; i < aPeriodLengthText.length; i++){
                let optText = aPeriodLengthText[i];
                let el= document.createElement("option");
                el.textContent = optText;
                el.value = i;
                oPeriodSelection.appendChild(el); 
            }

            for (i=0; i < aDiagramSelectionText.length; i++){
                let optText = aDiagramSelectionText[i];
                let el= document.createElement("option");
                el.textContent = optText;
                el.value = i;
                oDiagramSelection.appendChild(el);
            }

            function saveSelection(){
                let aData = getData();
                let oDaySelection = document.getElementById("daySelection");
                let oPeriodSelection = document.getElementById("periodLength");
                let oDiagramSelection = document.getElementById("diagramSelection");
                let oComment = document.getElementById("comment");

                let iDaySelectionValue = oDaySelection.options[oDaySelection.selectedIndex].value;
                let iPeriodSelectionValue = oPeriodSelection.options[oPeriodSelection.selectedIndex].value;
                let iDiagramSelectionValue = oDiagramSelection.options[oDiagramSelection.selectedIndex].value;
                let sComment = oComment.value;
                                
                let currentDate = new Date();
                let dd = String(currentDate.getDate()).padStart(2, '0');
                let mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = currentDate.getFullYear();
                let time = currentDate.getHours() + ":" + (currentDate.getMinutes()<10?'0':'') + currentDate.getMinutes() + ":" + currentDate.getSeconds();

                let periodStartDd = String(currentDate.getDate()).padStart(2, '0') - iDaySelectionValue;

                currentDate = yyyy + '-' + mm + '-' + dd;
                let startDate = yyyy + '-' + mm + '-' + periodStartDd;

                let dateTime = currentDate + " " + time;
                let startTime = startDate + " " +  time;

                if (dateTime && startTime && iPeriodSelectionValue && iDiagramSelectionValue && sComment){
                    $.ajax({
                        url: "save.php",
                        type: "POST",
                        data: {
                            StartTime: startTime,
                            EndTime: dateTime,
                            Comment: sComment,
                            Graph: iDiagramSelectionValue,
                            Period: iPeriodSelectionValue
                        },
                        cache: false
                    });
                } else {
                    alert('Täida kõik väljad !');
                }
                
            }
        </script>
    </div>
 

 </body>

</html>
 