<?php

include "database.php";

$type= $_GET['type'];
$ticketfor = $_GET['ticketfor'];
$city = $_GET['city'];
$source= $_GET['source'];
$destination=  $_GET['destination'];
$user_id= $_GET['user_id'];
$fare= $_GET['fare'];
date_default_timezone_set('Asia/Kolkata');
$date = date('M d,Y  ', time());

			$query = "select * from users where user_id='$user_id'";
			$result = $con->query($query);
			while($row = $result->fetch_assoc()) 
			{
	            $wallet = $row['wallet'];
	            $wallet = intval($wallet);
	            
	            $wallet = $wallet - $fare;

                    if($wallet<0)
                    {
                    	echo "error_wallet";
                    }
	            	else
	            	{
	            		$query="insert into tickets(type,source,destination,dated,fare,user_id,city,ticketfor) values ('$type','$source','$destination','$date','$fare','$user_id','$city','$ticketfor')";
						if($con->query($query) === TRUE)
						{
							$query = "update users set wallet='$wallet' where user_id='$user_id'";
				            if($con->query($query) === TRUE)
							{
								echo $wallet;
							}
						}
						else
						{
							echo "error";
						}	
					}
			}			
?>
