<!DOCTYPE html>
<html>
<head>
<meta http-equiv="refresh" content="5">
</head>
<body>
<style>
#c4ytable {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#c4ytable td, #c4ytable th {
    border: 1px solid #ddd;
    padding: 8px;
}

#c4ytable tr:nth-child(even){background-color: #f2f2f2;}

#c4ytable tr:hover {background-color: #ddd;}

#c4ytable th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #00A8A9;
    color: white;
}
</style>

<?php
    //Connect to database and create table
    $servername = "localhost";
	$username = "id8643453_sander";
	$password = "parool12";
	$dbname = "id8643453_andmed";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Database Connection failed: " . $conn->connect_error);
    }
?> 

<div id="cards" class="cards">

<?php 
    $sql = "SELECT ID, Temperature, WaterLevel, LightLevel, Date, Time FROM aquarium ORDER BY ID DESC";
    if ($result=mysqli_query($conn,$sql))
    {
      // Fetch one and one row
      echo "<TABLE id='c4ytable'>";
      echo "<TR><TH>Sr.No.</TH><TH>Water Temperature</TH><TH>Water Level</TH><TH>Light Level</TH><TH>Date</TH><TH>Time</TH></TR>";
      while ($row=mysqli_fetch_row($result))
      {
        echo "<TR>";
        echo "<TD>".$row[0]."</TD>";
        echo "<TD>".$row[1]."</TD>";
        echo "<TD>".$row[2]."</TD>";
        echo "<TD>".$row[3]."</TD>";
        echo "<TD>".$row[4]."</TD>";
        echo "<TD>".$row[5]."</TD>";
        echo "</TR>";
      }
      echo "</TABLE>";
      // Free result set
      mysqli_free_result($result);
    }

    mysqli_close($conn);
?>

</div>


<?php 
        // open the file "demosaved.csv" for writing
    $file = fopen('AqData1.csv', 'w');
     
    // save the column headers
    fputcsv($file, array('Timestamp','Temperature', 'LightLevel'));
     
    // Sample data. This can be fetched from mysql too
    // Open the connection
    $link = mysqli_connect('localhost', 'id8643453_sander', 'parool12', 'id8643453_andmed');
     
    //query the database
    $query = 'SELECT Timestamp, Temperature, LightLevel FROM aquarium WHERE ID%15 = 0';
     
    if ($rows = mysqli_query($link, $query))
    {
    // loop over the rows, outputting them
    while ($row = mysqli_fetch_assoc($rows))
    {
    fputcsv($file, $row);
    }
    // free result set
    mysqli_free_result($rows);
    }
    // close the connection
    mysqli_close($link);
     
    // Close the file
    fclose($file);
?>

</body>
</html>