if($_POST['StartTime']) {
    <?php 

        $conn = mysqli_connect('localhost', 'id8643453_sander', 'parool12', 'id8643453_andmed');
            
        $startTime=$_POST['StartTime'];
        $endTime=$_POST['EndTime'];
        $comment=$_POST['Comment'];
        $graph=$_POST['Graph'];
        $period=$_POST['Period'];
        $sql = "INSERT INTO Period (StartTime, EndTime, Comment, Graph, PeriodLength) 
        VALUES ('$startTime','$endTime','$comment','$graph','$period')";

        if (mysqli_query($conn, $sql)) {
            echo "New record created successfully";
        } 
        else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }

        mysqli_close($conn);
    ?>
}
