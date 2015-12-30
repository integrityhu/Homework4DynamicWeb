<?xml version="1.0" encoding="utf-8" ?>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<html>
<head>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>the c:url core action</title>
</head>
<body>
<p>
  Ez egy egyszerű szövegbeviteli mezőket tartalmazó űrlap.
</p>
<form action="JSTLCreatingURL.jsp" method="post" accept-charset="UTF-8">
<table>
<tr><td>Név:</td>
<td><input type="text" name="name"/></td></tr>
<tr><td>Életkor:</td>
<td><input type="text" name="age"/></td></tr>
<tr><td>e-mail cím:</td >
<td><input type="text" name="email" /></td></tr>
</table>
<input type="submit" value="Mehet" />
</form>
</body>
</html>