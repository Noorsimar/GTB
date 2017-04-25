<?php

include 'database.php';

$email=$_GET['email'];
$password=$_GET['password'];

$query="select * from users where (email = '$email' AND password='$password') OR (mobile='$email' AND password = '$password')";

$result = $con->query($query);

		if ($result->num_rows > 0) 
		{
			while($row = $result->fetch_assoc()) 
			{
                                echo json_encode($row);
			}			
		}
		else
		{
			echo "error";
		}

?>