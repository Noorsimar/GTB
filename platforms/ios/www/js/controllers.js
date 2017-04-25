
var type;
var catcolor;



var application = angular.module('app.controllers',[])






application.controller('indexCtrl',
function ($scope,$state, $stateParams,$ionicLoading,$ionicPopup) {

if(window.localStorage.getItem("user_id"))
{
	$state.go("menu.home");
}
else
{
	$state.go("login");
}

})


application.controller('sidemenuCtrl',
function ($scope,$state, $stateParams,$ionicLoading,$ionicPopup) {


$scope.quickticket= function () {

	var type = "M Ticket";
	var fare = 45;
	var source = window.localStorage.getItem("source");
	var destination = window.localStorage.getItem("destination");
	var city = window.localStorage.getItem("city");
		var url = "?type="+type+"&fare="+fare+"&source="+source+"&destination="+destination+"&user_id="+window.localStorage.getItem("user_id")+"&city="+city+"&ticketfor=Adult";
		var encodedurl=encodeURI(url);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var responseishere= xmlhttp.responseText;
				if(responseishere=="error")
				{
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: 'Error While Creating Ticket.'
					});
				}
				else if(responseishere=="error_wallet")
				{
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
					title: 'Not Enough Money',
					template: 'Not Enough Money in Wallet.'
					});
				}
				else
				{
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
					title: 'Success',
					template: 'Ticket Created.'
					});
					console.log("Wallet: "+responseishere);
					
					window.localStorage.setItem("wallet",responseishere);
					$state.reload("menu.home");
					$state.reload("menu.wallet");
				}
			}
		};
		xmlhttp.open("GET", "http://lailasohailatweb.ipage.com/uts/createticket.php"+encodedurl, true);
		xmlhttp.send();
	}















$scope.logout = function () {
      var confirmPopup = $ionicPopup.confirm({
          title: 'Logout',
          template: 'Are you sure you want to log out?',
          buttons: [
    {
        text: "No",
        type: 'button-positive',
        onTap: function (e) {
            return false;
        }
    },
    {
        text: "Yes",
        onTap: function (e) {
            return true;
        }
    },
          ]

      });
    confirmPopup.then(function (res) {
        if (res) {
              console.log('Logged out!');
              window.localStorage.removeItem("user_id");
			  $state.go("login");
        } 
      });

  }

})

application.controller('loginCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state, $stateParams,$ionicPopup,$ionicLoading) {


$scope.login = function (){

	$ionicLoading.show();
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	if(email.length!=0 && password.length!=0)
	{
	    	var url="?email="+email+"&password="+password;
					
					var encodedurl=encodeURI(url);
					var xmlhttp = new XMLHttpRequest();
					        xmlhttp.onreadystatechange = function() {
					            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					                var responseishere= xmlhttp.responseText;
					                if(responseishere=="error")
					               {
					               		$ionicLoading.hide();
										var alertPopup = $ionicPopup.alert({
						                   title: 'Error',
						                   template: 'Wrong Email/Mobile Number or Password.'
						                 });
					               } 	
					               else
					               {
					               		$ionicLoading.hide();
					               		var myobj = JSON.parse(responseishere);
					               		window.localStorage.setItem("user_id",myobj.user_id);
					               		window.localStorage.setItem("wallet",myobj.wallet);
					               		window.localStorage.setItem("city",myobj.city);
					               		window.localStorage.setItem("source",myobj.source);
					               		window.localStorage.setItem("destination",myobj.destination);
					               		
					               		$state.reload("menu.wallet");
					               		$state.go('menu.home');
					               }

					            }
					        };
					        xmlhttp.open("GET", "http://lailasohailatweb.ipage.com/uts/login.php"+encodedurl, true);
					        xmlhttp.send();
	}
	else
	{		
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
			title: 'Error',
			template: 'Please fill all the fields.'
			});
	}

}

})
   
application.controller('signupCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state, $stateParams,$ionicPopup,$ionicLoading) {


$scope.mycity="MUMBAI";
	$scope.mumbai=1;
	$scope.chennai=0;
	$scope.newdelhi=0;


$scope.cityselected = function() {
var x = document.getElementById("signupcity").value;

	if(x=="MUMBAI")
	{
		$scope.mumbai=1;
		$scope.chennai=0;
		$scope.newdelhi=0;
	}
	else if(x=="CHENNAI")
	{
		$scope.mumbai=0;
		$scope.chennai=1;
		$scope.newdelhi=0;
	}
	else if(x=="NEW DELHI")
	{
		$scope.mumbai=0;
		$scope.chennai=0;
		$scope.newdelhi=1;
	}

}



$scope.signup = function() {
	$ionicLoading.show();
	var emailadd = document.getElementById("emailaddress").value;
	var mobile = document.getElementById("mobilenumber").value;
	var password = document.getElementById("passwordentered").value;
	var confirmpassword = document.getElementById("confirmpasswordentered").value;
	var dob = document.getElementById("dateofbirth").value;	

	var city = document.getElementById("signupcity").value;
	var source = document.getElementById("signupsource").value;
	var destination = document.getElementById("signupdestination").value;


	if(emailadd.length!=0 && mobilenumber.length!=0 && password.length!=0 && confirmpassword.length!=0 && dob.length!=0)
	{
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    if(re.test(emailadd))
	    {

	    	if(mobile.length==10)
	    	{
		    	if(password==confirmpassword)
		    	{
		    		if(password.length>=5)
		    		{
		    			if(destination != source)
		    			{
							var url="?email="+emailadd+"&password="+password+"&mobile="+mobile+"&dob="+dob+"&city="+city+"&source="+source+"&destination="+destination;							
							var encodedurl=encodeURI(url);
							var xmlhttp = new XMLHttpRequest();
						        xmlhttp.onreadystatechange = function() {
						            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						                var responseishere= xmlhttp.responseText;
						                if(responseishere=="success")
						               {
						               		var alertPopup = $ionicPopup.alert({
							                   title: 'Sign Up Successful',
							                   template: 'You can login now!'

							                 });
						               		$ionicLoading.hide();
						               		$state.go('login');
						               } 	
						               else
						               {

						               		$ionicLoading.hide();
											var alertPopup = $ionicPopup.alert({
							                   title: 'Error',
							                   template: 'Email Address or Mobile Number Already Exists.'
							                 });
						               }

						            }
						        };
						        xmlhttp.open("GET", "http://lailasohailatweb.ipage.com/uts/register.php"+encodedurl, true);
						        xmlhttp.send();
						}
						else
						{
							$ionicLoading.hide();
							var alertPopup = $ionicPopup.alert({
							title: 'Error',
							template: 'Source and destination cannot be same.'
							});
						}
					}
					else
					{
						$ionicLoading.hide();
						var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: 'Password length must be greater than 5 characters.'
						});
						
					}	
		    	}
		    	else
		    	{
					$ionicLoading.hide();
		    		var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: 'Password and confirm password does not match.'
					});
		    	}
		    }
		    else
		    {
		    	$ionicLoading.hide();
		    	var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: 'Please Enter a valid 10 digit number.'
				});
		    }	
	    }
	    else
	    {

			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
			title: 'Error',
			template: 'Please enter a valid email address.'
			});
	    }
	}
	else
	{

		$ionicLoading.hide();
		var alertPopup = $ionicPopup.alert({
		title: 'Error',
		template: 'Please fill all the fields.'
		});

	}

    };






})

application.controller('stationbookingCtrl',
function ($scope,$state, $stateParams,$cordovaCamera,$ionicLoading,$ionicPopup) {

		$scope.mycity="MUMBAI";
		$scope.mumbai=1;
		$scope.chennai=0;
		$scope.newdelhi=0;


$scope.cityselected = function() {
	var x = document.getElementById("city_station").value;

	if(x=="MUMBAI")
	{
		$scope.mumbai=1;
		$scope.chennai=0;
		$scope.newdelhi=0;
	}
	else if(x=="CHENNAI")
	{
		$scope.mumbai=0;
		$scope.chennai=1;
		$scope.newdelhi=0;
	}
	else if(x=="NEW DELHI")
	{
		$scope.mumbai=0;
		$scope.chennai=0;
		$scope.newdelhi=1;
	}

}










$scope.createticket = function()
{
	$ionicLoading.show();
	var type = "Station Ticket";
	var source = document.getElementById("source_station").value;
	var city = document.getElementById("city_station").value;
	var fare = 10;

		var url = "?type="+type+"&fare="+fare+"&source="+source+"&user_id="+window.localStorage.getItem("user_id")+"&city="+city;
		var encodedurl=encodeURI(url);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var responseishere= xmlhttp.responseText;
				if(responseishere=="error")
				{
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: 'Error While Creating Ticket.'
					});
				}
				else if(responseishere=="error_wallet")
				{
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
					title: 'Not Enough Money',
					template: 'Not Enough Money in Wallet.'
					});
				}
				else
				{
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
					title: 'Success',
					template: 'Ticket Created.'
					});
					console.log("Wallet: "+responseishere);
					
					window.localStorage.setItem("wallet",responseishere);
					$state.reload("menu.home");
					$state.reload("menu.wallet");
				}
			}
		};
		xmlhttp.open("GET", "http://lailasohailatweb.ipage.com/uts/createticket.php"+encodedurl, true);
		xmlhttp.send();
	


}	


})





















   
   
application.controller('normalbookingCtrl',
function ($scope,$state, $stateParams,$cordovaCamera,$ionicLoading,$ionicPopup) {

		$scope.mycity="MUMBAI";
		$scope.mumbai=1;
		$scope.chennai=0;
		$scope.newdelhi=0;


$scope.cityselected = function() {
	var x = document.getElementById("city").value;

	if(x=="MUMBAI")
	{
		$scope.mumbai=1;
		$scope.chennai=0;
		$scope.newdelhi=0;
	}
	else if(x=="CHENNAI")
	{
		$scope.mumbai=0;
		$scope.chennai=1;
		$scope.newdelhi=0;
	}
	else if(x=="NEW DELHI")
	{
		$scope.mumbai=0;
		$scope.chennai=0;
		$scope.newdelhi=1;
	}

}










$scope.createticket = function()
{
	$ionicLoading.show();
	var type = document.getElementById("type").value;
	var source = document.getElementById("source").value;
	var destination = document.getElementById("destination").value;

	var city = document.getElementById("city").value;
	var fare=45;
	var ticketfor = document.getElementById("ticketfor").value;
	if(ticketfor=="Adult")
	{
		fare = 45;
	}
	else if(ticketfor=="Child")
	{
		fare = 25;
	}


	if(destination != source)
	{
		var url = "?type="+type+"&fare="+fare+"&source="+source+"&destination="+destination+"&user_id="+window.localStorage.getItem("user_id")+"&city="+city+"&ticketfor="+ticketfor;
		var encodedurl=encodeURI(url);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var responseishere= xmlhttp.responseText;
				if(responseishere=="error")
				{
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: 'Error While Creating Ticket.'
					});
				}
				else if(responseishere=="error_wallet")
				{
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
					title: 'Not Enough Money',
					template: 'Not Enough Money in Wallet.'
					});
				}
				else
				{
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
					title: 'Success',
					template: 'Ticket Created.'
					});
					console.log("Wallet: "+responseishere);
					
					window.localStorage.setItem("wallet",responseishere);
					$state.reload("menu.home");
					$state.reload("menu.wallet");
				}
			}
		};
		xmlhttp.open("GET", "http://lailasohailatweb.ipage.com/uts/createticket.php"+encodedurl, true);
		xmlhttp.send();
	}
	else
	{
		$ionicLoading.hide();
		var alertPopup = $ionicPopup.alert({
		title: 'Error',
		template: 'Source and destination cannot be same.'
		});
	}


}	


})
   
application.controller('settingsCtrl',
function ($scope,$state,$ionicLoading,$ionicPopup, $cordovaCamera) {



	$scope.prev_city = window.localStorage.getItem("city");
	$scope.prev_source = window.localStorage.getItem("source");
	$scope.prev_destination = window.localStorage.getItem("destination");
	
	$scope.mycity="MUMBAI";
	$scope.mumbai=1;
	$scope.chennai=0;
	$scope.newdelhi=0;


$scope.cityselected = function() {
var x = document.getElementById("quickcity").value;

	if(x=="MUMBAI")
	{
		$scope.mumbai=1;
		$scope.chennai=0;
		$scope.newdelhi=0;
	}
	else if(x=="CHENNAI")
	{
		$scope.mumbai=0;
		$scope.chennai=1;
		$scope.newdelhi=0;
	}
	else if(x=="NEW DELHI")
	{
		$scope.mumbai=0;
		$scope.chennai=0;
		$scope.newdelhi=1;
	}

}




$scope.updatepassword = function(){

	$ionicLoading.show();
	var oldpass = document.getElementById("oldpassword").value;
	var newpass = document.getElementById("newpassword").value;
	if(oldpass.length!=0 && newpass.length!=0)
	{
		if(newpass.length>=5)
		{
					var url="?user_id="+window.localStorage.getItem('user_id')+"&password="+oldpass+"&newpassword="+newpass;
					var encodedurl=encodeURI(url);
					var xmlhttp = new XMLHttpRequest();
					        xmlhttp.onreadystatechange = function() {
					            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					                var responseishere= xmlhttp.responseText;
					                if(responseishere=="success")
					               {
					               		var alertPopup = $ionicPopup.alert({
						                   title: 'Success',
						                   template: 'Password Updated Successfully.'
						                 });
					               		$ionicLoading.hide();
					               		$state.reload("changepassword");	
					               } 	
					               else if(responseishere=="error")
					               {

					               		$ionicLoading.hide();
										var alertPopup = $ionicPopup.alert({
						                   title: 'Error',
						                   template: 'Invalid Current Password.'
						                 });
					               }

					            }
					        };
					        xmlhttp.open("GET", "http://lailasohailatweb.ipage.com/uts/changepassword.php"+encodedurl, true);
					        xmlhttp.send();
		}
		else
		{
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
			title: 'Error',
			template: 'New Password Length Must Be Greater or Equal To 5.'
			});
		}

	}	
	else
	{
		$ionicLoading.hide();
		var alertPopup = $ionicPopup.alert({
		title: 'Error',
		template: 'Please fill all the fields.'
		});
	}



}



$scope.updatequick= function()
{
	$ionicLoading.show();
	var source = document.getElementById("quicksource").value;
	var destination = document.getElementById("quickdestination").value;

	var city = document.getElementById("quickcity").value;
	if(destination != source)
	{
		var url = "?source="+source+"&destination="+destination+"&user_id="+window.localStorage.getItem("user_id")+"&city="+city;
		var encodedurl=encodeURI(url);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var responseishere= xmlhttp.responseText;
				if(responseishere=="error")
				{
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: 'Error While Updating Quick Settings.'
					});
				}
				
				else
				{
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
					title: 'Success',
					template: 'Quick Settings Updated.'
					});
					window.localStorage.setItem("city",city);
					window.localStorage.setItem("source",source);
					window.localStorage.setItem("destination",destination);


					$scope.prev_city = city; 
					$scope.prev_source = source; 
					$scope.prev_destination = destination; 
					
				}
			}
		};
		xmlhttp.open("GET", "http://lailasohailatweb.ipage.com/uts/updatequicksettings.php"+encodedurl, true);
		xmlhttp.send();
	}
	else
	{
		$ionicLoading.hide();
		var alertPopup = $ionicPopup.alert({
		title: 'Error',
		template: 'Source and destination cannot be same.'
		});
	}
}




})
   
application.controller('walletCtrl',
function ($scope, $state,$ionicPopup,$ionicLoading,$stateParams) {

$scope.walletvalue =window.localStorage.getItem("wallet");

if($scope.walletvalue==0 || $scope.walletvalue==0)
{
	$scope.walletvalue="zero";
}
console.log($scope.walletvalue);



$scope.updatewallet = function()
{
	$ionicLoading.show();
	var wallet_value =	document.getElementById("wallet").value;
	if(wallet_value)
	{
		var url = "?wallet="+wallet_value+"&user_id="+window.localStorage.getItem("user_id");
		var encodedurl=encodeURI(url);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var responseishere= xmlhttp.responseText;
				if(responseishere=="error")
				{
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: 'Error While Updating Wallet.'
					});
				} 	
				else
				{
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
					title: 'Success',
					template: 'Wallet Updated.'
					});
					window.localStorage.setItem("wallet",responseishere);
					$scope.walletvalue = responseishere;
					if($scope.walletvalue==0 || $scope.walletvalue==0)
					{
						$scope.walletvalue="zero";
					}
				}
			}
		};
		xmlhttp.open("GET", "http://lailasohailatweb.ipage.com/uts/wallet.php"+encodedurl, true);
		xmlhttp.send();
	}
	else
	{
		$ionicLoading.hide();
		var alertPopup = $ionicPopup.alert({
		title: 'Error',
		template: 'Email Address or Mobile Number Already Exists.'
		});
	}
}

})

   
application.controller('homeCtrl',
function ($scope,$state, $stateParams,$ionicLoading,$ionicPopup) {

$scope.cancelticket = function (ticket,fare,dated) 
{
      var confirmPopup = $ionicPopup.confirm({
          title: 'Cancel Ticket',
          template: 'Are you sure you want to cancel this ticket?',
          buttons: [
    {
        text: "No",
        type: 'button-positive',
        onTap: function (e) {
            return false;
        }
    },
    {
        text: "Yes",
        onTap: function (e) {
            return true;
        }
    },
          ]

      });
    confirmPopup.then(function (res) {
        if (res) {
        	$ionicLoading.show();
        	var url = "?ticket_id="+ticket+"&fare="+fare+"&user_id="+window.localStorage.getItem("user_id")+"&dated="+dated;
			var encodedurl=encodeURI(url);
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var responseishere= xmlhttp.responseText;
					if(responseishere=="error")
					{
						$ionicLoading.hide();
						var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: 'Error While Cancelling Ticket.'
						});
					} 
					else if(responseishere=="date_error")
					{
						$ionicLoading.hide();
						var alertPopup = $ionicPopup.alert({
						title: 'Error',
						template: 'Past tickets cannot be cancelled.'
						});
					}
					else
					{
						console.log(responseishere);
						$ionicLoading.hide();
						var alertPopup = $ionicPopup.alert({
						title: 'Cancelled',
						template: 'Ticket Cancelled.'
						});
						window.localStorage.setItem("wallet",responseishere);
						console.log(responseishere);
						$state.reload("menu.wallet");
					}
				}
			};
			xmlhttp.open("GET", "http://lailasohailatweb.ipage.com/uts/cancelticket.php"+encodedurl, true);
			xmlhttp.send();

        } 
      });


  }
$scope.tickets = [];
$scope.gettickets= function()
{
					$scope.tickets = [];
  					$ionicLoading.show();
					var url="?user_id="+window.localStorage.getItem("user_id");
					var encodedurl=encodeURI(url);
					var xmlhttp = new XMLHttpRequest();
					        xmlhttp.onreadystatechange = function() {
					            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					                var responseishere= xmlhttp.responseText;
					                if(responseishere=="error")
					               {
					               		var alertPopup = $ionicPopup.alert({
						                   title: 'Nothing Found',
						                   template: 'No Tickets Found.'
						                 });
					               		$ionicLoading.hide();
					               } 	
					               else
					               {
					               	var myobj = JSON.parse(responseishere);
									for(var i=0;i<myobj.length;i++)
									{
									 	 if(myobj[i].type=="M Ticket")
									 	 {
									 	 	myobj[i].color="#C8F4D0";
									 	 	myobj[i].show_id=1;
									 	 }
									 	 else if(myobj[i].type=="Paper Ticket")
									 	 {
									 	 	myobj[i].color="#FFC0CB";
									 	 	myobj[i].show_id=0;
									 	 }
									 	 else if(myobj[i].type=="Station Ticket")
									 	 {
									 	 	myobj[i].color="#d3d3d3";
									 	 	myobj[i].show_id=1;
									 	 }
						               	 $scope.tickets.push(myobj[i]);		               	 
					               	}
					               		$ionicLoading.hide();
					               }
					               $scope.$broadcast('scroll.refreshComplete');
					            }
					        };
					        xmlhttp.open("GET", "http://lailasohailatweb.ipage.com/uts/get_tickets.php"+encodedurl, true);
					        xmlhttp.send();
}
$scope.gettickets();











})