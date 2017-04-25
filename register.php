<?php

include 'database.php';


$email=$_GET['email'];
$mobile= $_GET['mobile'];
$password=$_GET['password'];
$dob= $_GET['dob'];
$city = $_GET['city'];
$source = $_GET['source'];
$destination = $_GET['destination'];


$query="insert into users(email,mobile,password,dob,city,source,destination) values ('$email','$mobile','$password','$dob','$city','$source','$destination')";
		if($con->query($query) === TRUE)
		{
			echo "success";
		}
		else
		{
			echo "error";
		}
?>