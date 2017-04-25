<?php

include 'database.php';
$user_id=$_GET['user_id'];
$city=$_GET['city'];
$source=$_GET['source'];
$destination = $_GET['destination'];

$sql = "update users set city='$city',source='$source',destination='$destination' where user_id='$user_id'";	
			if($con->query($sql)==TRUE)
			{		
			    echo "success";
			}
			else
			{
			  echo "error";
			}
?>