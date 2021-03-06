<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Add School</title>
<link href="webjars/bootstrap/4.5.0/css/bootstrap.min.css"
	rel="stylesheet">
<style>
body, html {
	height: 100%;
}

#header {
	background: url(img/addback.jpg) center center no-repeat;
	background-size: cover;
	height: 100%;
	color: #aee8e8;
	display: flex;
	align-items: center;
}

.container {
	padding-top: 10px;
	padding-left: 150px;
}

.td {
	padding: 10px;
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
	<nav class="navbar navbar-expand-sm navbar-light" style="background-color:#5cb0bd">
		<a class="navbar-brand" href="/"> <img src="/img/headLogo.png"
			width="150" height="40" class="d-inline-block align-top" alt=""
			loading="lazy"></a>
		<ul class="navbar-nav">
			<li class="nav-item mr-sm-4"><a class="nav-link" href="/">Home</a>
			</li>
			<li class="nav-item mr-sm-4"><a class="nav-link" href="/admin">Back</a>
			</li>
		</ul>
		<div class="ml-auto">
			<a class="nav-link btn btn-danger" href="/logout">Logout</a>
		</div>
	</nav>
	<section id="header">
		<div class="container">
			<form:form method="POST" modelAttribute="school">
				<center>
					<h2>Add new School</h2>
				</center>

				<table>
					<tr>

						<td class="td"><form:label path="name">Enter School name :</form:label></td>
						<td><form:input type="text" name="name" required="required"
								path="name" placeholder="Enter School Name" minlength="10"></form:input></td>
					</tr>
					<tr>
						<td class="td"><form:label path="city">Enter the City :</form:label></td>
						<td><form:input type="text" name="city" required="required"
								path="city" placeholder="Enter City Name" minlength="3"></form:input></td>
					</tr>
					<tr>
						<td class="td"><form:label path="area">Enter the Area :</form:label></td>
						<td><form:input type="text" name="area" required="required"
								path="area" placeholder="Enter Area" minlength="3"></form:input></td>
					</tr>
					<tr>
						<td class="td"><form:label path="address">Enter the Full Address :</form:label></td>
						<td><form:input type="text" name="address"
								required="required" path="address" placeholder="Enter Full Address" minlength="12"></form:input></td>
					</tr>
					<tr>
						<td class="td"><form:label path="fees">Enter the fee :</form:label></td>
						<td><form:input type="text" name="fees" required="required"
								path="fees" placeholder="Enter the Anual fee" minlength="5"></form:input></td>
					</tr>
					<tr>
						<td class="td"><form:label path="bus">Enter the Bus facility :</form:label></td>
						<td><form:input type="text" name="bus" required="required"
								path="bus" maxlength="3" minlength="2" placeholder="Yes or No"></form:input></td>
					</tr>
					<tr>
						<td class="td"><form:label path="infrastructure">Enter the infrastructure rating :</form:label></td>
						<td><form:input type="text" name="infrastructure"
								required="required" path="infrastructure" maxlength="5" minlength="4" placeholder="example(4.5/5)"></form:input></td>
					</tr>
					<tr>
						<td class="td"><form:label path="rating">Enter the overall rating :</form:label></td>
						<td><form:input type="text" name="rating" required="required"
								path="rating" maxlength="5" minlength="4" placeholder="example(4.5/5)"></form:input></td>
					</tr>
					<tr>
						<td></td>
						<td><button type="submit" class="btn btn-success">Add</button></td>
					</tr>
				</table>

			</form:form>
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
	<script src="webjars/bootstrap/4.5.0/js/bootstrap.min.js"></script>
</body>
</html>