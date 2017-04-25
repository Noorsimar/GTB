<?php

include 'database.php';

$user_id=$_GET['user_id'];

$query="select * from tickets where user_id='$user_id' ORDER BY ticket_id DESC ";


$result=$con->query($query);

$row_cnt = mysqli_num_rows($result);
if ($result->num_rows > 0) 
{
$count=0;
echo "[";
while($row = $result->fetch_assoc()) 
{
		$count++;
        echo json_encode($row);
        
    	if($count!=$row_cnt)
    	{
    			echo ",";
    	}


}
echo "]";
}
else
{
echo "error";
}

?>