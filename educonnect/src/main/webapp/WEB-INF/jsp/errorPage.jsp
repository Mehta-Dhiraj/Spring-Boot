<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>No School Found</title>
<link href="webjars/bootstrap/5.3.2/css/bootstrap.min.css"
	rel="stylesheet">
<style>
body, html {
	height: 100%;
}

#header {
	background-color: #78B1D2;
	background-size: cover;
	height: 100%;
	color: black;
	display: flex;
	align-items: center;
}
</style>
</head>
<body>
	<nav class="navbar navbar-light" style="background-color:#5cb0bd">
		<a class="navbar-brand" href="/"> <img src="/img/headLogo.png"
			width="150" height="40" class="d-inline-block align-top" alt=""
			loading="lazy"></a> <a class="navbar-brand" href="/"><b>Your
				DREAM|SCHOOL</b></a>
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
				<li class="nav-item"><a class="nav-link" href="/about">About</a></li>
				<li class="nav-item"><a class="nav-link" href="/contact">Contact</a></li>
			</ul>
		</div>
	</nav>
	<section id="header">
		<div class="container">
			<h1>Sorry!!!</h1>
			<br>
			<h3>
				We can't locate any School in your selected area <b>${area}</b>.
			</h3>
			<br> <br>
			<h4>
				Kindly check all available schools in <b>${city}</b> by clicking <a
					href="/cityList">here.</a>
			</h4>
		</div>
		</div>
	</section>
	<script src="webjars/jquery/3.5.1/jquery.min.js"></script>
	<script src="webjars/bootstrap/5.3.2/js/bootstrap.min.js"></script>


</body>
</html>