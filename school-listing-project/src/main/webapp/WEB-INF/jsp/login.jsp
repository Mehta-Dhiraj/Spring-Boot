<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Login Page</title>
<link href="webjars/bootstrap/4.5.0/css/bootstrap.min.css"
	rel="stylesheet">
	<style type="text/css">
	
	body{
	height:100%;
	background: rgb(78, 102, 126);
	font-family: 'Open Sans', sans-serif;
	}
	
.card {
	margin-top: 150px;
  width: 250px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
}
tr {
  background-color: #20b6db;
  color: white;
  padding: 10px;
  font-size: 20px;
  
}
input{
	border-radius: 10px;
}


	
	</style>

</head>
<body>
	<nav class="navbar navbar-light" style="background-color: #5cb0bd">
		<a class="navbar-brand" href="/"> <img src="/img/headLogo.png"
			width="150" height="40" class="d-inline-block align-top" alt="logo"
			loading="lazy"></a> <a class="navbar-brand" href="/"><b><i>
					Login</b></i></a>
		<button class="navbar-toggler" type="button" data-toggle="collapse"
			data-target="#navbarNav" aria-controls="navbarNav"
			aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav">
				<li class="nav-item active"><a class="nav-link" href="/">Home
						<span class="sr-only">(current)</span>
				</a></li>
				<li class="nav-item"><a class="nav-link" href="/admin">Admin</a></li>
				<li class="nav-item"><a class="nav-link" href="#">About</a></li>
				<li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
			</ul>
		</div>
	</nav>
	
	
	<div class="container">
	<form action="login" method="POST">
		<table align="center">
			<tbody class="card">
			<tr>
				<td><input class="input" type="text" name="username" placeholder="Username" /></td>
			</tr>
			<tr>
				<td><input class="input" type="password" name="password" placeholder="Password"/></td>
			</tr>
			<tr>
				<td><input class="input btn btn-primary" type="submit" name="login" value="Sign in" /></td>
			</tr>
			<tr>
				<td><a href="/register">New Registration</a></td>
			</tr>
		</tbody>
		</table>
	</form>
	</div>
	<script src="webjars/jquery/3.5.1/jquery.min.js"></script>
	<script src="webjars/bootstrap/4.5.0/js/bootstrap.min.js"></script>
</body>
</html>