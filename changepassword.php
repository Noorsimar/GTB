<?php

include 'database.php';

$user_id=$_GET['user_id'];
$password=$_GET['password'];
$newpass = $_GET['newpassword'];

$query="select * from users where user_id= '$user_id' AND password='$password'";

$result = $con->query($query);

		if ($result->num_rows > 0) 
		{
			$sql = "update users set password='$newpass' where user_id='$user_id'";			
			if($con->query($sql)==TRUE)
			{		
			echo "success";
			}
			else
			{
			echo "error";
			}
		}
		else
		{
			echo "error";
		}

?>