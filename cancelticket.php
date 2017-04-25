<?php

include 'database.php';


$ticket_id=$_GET['ticket_id'];
$fare = $_GET['fare'];
$user_id = $_GET['user_id'];
$date = $_GET['dated'];

date_default_timezone_set('Asia/Kolkata');
$today_date= date('M d,Y  ', time());

if(!strcmp($today_date,$date))
{

               $query="delete from tickets where ticket_id = '$ticket_id' ";
		if($con->query($query) === TRUE)
		{
			$query = "select * from users where user_id='$user_id' ";
			$result = $con->query($query);
			while($row = $result->fetch_assoc()) 
			{
	            $wallet = $row['wallet'];
	            $wallet = intval($wallet);
	            $wallet = $wallet + $fare;
	            $query = "update users set wallet='$wallet' where user_id='$user_id'";
	            if($con->query($query) === TRUE)
				{
					echo $wallet;
				}
			}			
		}
		else
		{
			echo "error";
		}
}
else
{
echo "date_error";
}
?>