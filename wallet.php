<?php

include 'database.php';

$wallet=$_GET['wallet'];
$user_id= $_GET['user_id'];

			$query = "select * from users where user_id='$user_id' ";
			$result = $con->query($query);
			while($row = $result->fetch_assoc()) 
			{
	            $prev_wallet= $row['wallet'];
                $wallet= $prev_wallet+$wallet;
				$query="update users set wallet='$wallet' where user_id='$user_id' ";
				if($con->query($query) === TRUE)
				{
					$query = "select * from users where user_id='$user_id' ";
			$result = $con->query($query);
			while($row = $result->fetch_assoc()) 
			{
                            echo $row['wallet'];
                            }
				}
				else
				{
					echo "error";
				}
            }
?>