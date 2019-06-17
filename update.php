if($_POST['action'] == 'call_this') {
    <?php 
            // open the file "demosaved.csv" for writing
        $file = fopen('AqData.csv', 'w');
         
        // save the column headers
        fputcsv($file, array('Timestamp','Temperature', 'WaterLevel', 'LightLevel'));
         
        // Sample data. This can be fetched from mysql too
        // Open the connection
        $link = mysqli_connect('localhost', 'id8643453_sander', 'parool12', 'id8643453_andmed');
         
        //query the database
        $query = 'SELECT Timestamp, Temperature, WaterLevel, LightLevel FROM aquarium WHERE ID%15 = 0';
         
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
}