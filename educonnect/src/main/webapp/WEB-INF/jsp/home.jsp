<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Home</title>
<link href="webjars/bootstrap/5.3.2/css/bootstrap.min.css"
	rel="stylesheet">
<style>
body, html {
	height: 100%;
}

#header {
	background: url(img/back1.jpg) center center no-repeat;
	background-size: cover;
	height: 100%;
	color: white;
	display: flex;
	align-items: center;
}

#header img {
	padding: 0 0 28px 0;
	width: 80%;
}

#header .header-right {
	background-color: rgba(0, 0, 0, 0.5);
	padding: 30px;
	border-radius: 10px;
}

#footer {
	color: white;
}

#footer .body {
	background-color: #777070;
}
</style>
</head>
<body>
	<nav class="navbar navbar-light" style="background-color:#5cb0bd">
		<a class="navbar-brand" href="/"> <img src="/img/headLogo.png"
			width="150" height="40" class="d-inline-block align-top" alt="logo"
			loading="lazy"></a> <a class="navbar-brand" href="/"><b><i>Your
					DREAM|SCHOOL</b></i></a>
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
	<section id="header">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<h2>Guide your child to a great future</h2>
					<p>We help millions of parents get a great education for their
						child.</p>
					<p>We present actionable, research-based parenting information,
						including academics,infrastructure, facilities etc.</p>
				</div>
				<div class="col-md-6 header-right">
					<p>Find a great school for your child</p>
					<form method="POST">
						<fieldset class="form-group">
							<label class="sr-only">name</label> <input type="text"
								required="required" placeholder="Enter city name"
								class="form-control mr-sm-4" name="city" minlength="3">
						</fieldset>
						<fieldset class="form-group">
							<label class="sr-only">name</label> <input type="text"
								required="required" placeholder="Enter your Area"
								class="form-control mr-sm-4" name="area" minlength="3">
						</fieldset>
						<button class="btn btn-success" type="submit">Search</button>
					</form>
				</div>
			</div>

		</div>
	</section>

	<section id="footer">
		<div class="card text-center">

			<div class="card-body body">
				<h5 class="card-title">Copyright &copy 2020 School Listing
					Ltd.</h5>
				<p class="card-text">All rights Reserved.</p>
				<p class="card-text">Important Notices</p>
				<p class="card-text">Privacy Policy</p>
			</div>
			<div class="card-footer text-muted">Mail us @ :
				Dhirajkumarmehta444@gmail.com</div>
		</div>
	</section>

	<script src="webjars/jquery/3.5.1/jquery.min.js"></script>
	<script src="webjars/bootstrap/5.3.2/js/bootstrap.min.js"></script>
</body>
</html>