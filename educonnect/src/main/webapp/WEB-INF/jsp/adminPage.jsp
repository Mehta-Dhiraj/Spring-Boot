<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Admin</title>
<link href="webjars/bootstrap/5.3.2/css/bootstrap.min.css"
	rel="stylesheet">
	<style>
	.container{
	padding-top: 20px;
	color: #2c3cc9;
	</style>
</head>
<body>

	<nav class="navbar navbar-expand-sm navbar-light" style="background-color:#5cb0bd">
	<a class="navbar-brand" href="/"> <img
			src="/img/headLogo.png"
			width="150" height="40" class="d-inline-block align-top" alt=""
			loading="lazy"></a>
		<ul class="navbar-nav">
			<li class="nav-item mr-sm-4"><a class="nav-link" href="/addSchool">Add</a>
			</li>
			<li class="nav-item mr-sm-4"><a class="nav-link" href="/delete">Delete</a>
			</li>
			<li class="nav-item mr-sm-4"><a class="nav-link" href="/update">Update</a>
			</li>
			<li class="nav-item mr-sm-4"><a class="nav-link" href="/allList">Show</a>
			</li>
			<li class="nav-item mr-sm-4"><a class="nav-link" href="/">Home</a>
			</li>
			
		</ul>
		<div class="ml-auto">
			<a class="nav-link btn btn-danger" href="/logout">Logout</a>
		</div>
	</nav>
	<section id="header">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<h2>Welcome to the Admin Page</h2>
					<p>Here you can add, delete, update or can view all lists available on your website.</p>
					<p>Always give authenticted and research-based parenting information,
						including academics,infrastructure, facilities etc. and never give wrong information to your viewers..</p>
				</div>
				<div class="col-md-6 header-right">
					<img src="img/add.jpg" class="img-thumbnail"alt="...">
					</div>
					</div>
					</div>
	
	</section>

	<script src="webjars/jquery/3.5.1/jquery.min.js"></script>
	<script src="webjars/bootstrap/5.3.2/js/bootstrap.min.js"></script>
</body>
</html>