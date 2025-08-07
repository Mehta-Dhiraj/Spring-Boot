<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>All Schools</title>
<link href="webjars/bootstrap/5.3.2/css/bootstrap.min.css"
	rel="stylesheet">
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
	<div class="container">
		<table class="table table-striped">
			<thead class="thead-dark">
				<tr>
					<th>Name</th>
					<th>City</th>
					<th>Area</th>
					<th>Address</th>
					<th>Fee</th>
					<th>Is Bus Available</th>
					<th>Infrastructure</th>
					<th>Rating</th>
				</tr>
			</thead>
			<c:forEach items="${allList}" var="school">
				<tr>
					<td>${school.name}</td>
					<td>${school.city}</td>
					<td>${school.area}</td>
					<td>${school.address}</td>
					<td>${school.fees}</td>
					<td>${school.bus}</td>
					<td>${school.infrastructure}</td>
					<td>${school.rating}</td>
				</tr>
			</c:forEach>
		</table>
	</div>
	<script src="webjars/jquery/3.5.1/jquery.min.js"></script>
	<script src="webjars/bootstrap/5.3.2/js/bootstrap.min.js"></script>
</body>
</html>