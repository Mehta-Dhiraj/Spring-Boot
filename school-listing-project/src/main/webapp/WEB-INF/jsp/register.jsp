<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Register</title>
</head>
<body>
	<form:form method="POST" modelAttribute="admin">
		<h3>Enter User Name</h3>
		<form:input type="text" name="username" required="required" path="username"></form:input>
		<h3>Enter Email</h3>
		<form:input type="text" name="email" required="required" path="email"></form:input>
		<h3>Enter the City</h3>
		<form:input type="text" name="city" required="required" path="city"></form:input>
		<h3>Enter the Password</h3>
		<form:input type="text" name="password" required="required" path="password"></form:input>		
		<br>
		<input type="submit">
	</form:form>
</body>
</html>