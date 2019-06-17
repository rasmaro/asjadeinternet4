<?php 

    $conn = mysqli_connect('localhost', 'id8643453_sander', 'parool12', 'id8643453_andmed');
        
    $sql = "SELECT Id, StartTime, EndTime, Comment, Graph, PeriodLength FROM Period ORDER BY Id ASC";
    if ($result=mysqli_query($conn,$sql))
    {
      // Fetch one and one row
      echo "<TABLE id='data'>";
      echo "<TR><TH>Sr.No.</TH><TH>Start Time</TH><TH>End Time</TH><TH>LComment</TH><TH>Graph type</TH><TH>Period length</TH></TR>";
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