<?xml version="1.0" encoding="utf-8" ?>
<%@page import="java.util.Enumeration"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<fmt:requestEncoding value="UTF-8" />
<html>
<head>
<title>the c:url core action Page 2</title>
</head>
<body>
	<h1>List of parameters which appended to the URL:</h1>
	<ul>
		<c:forEach var="parameter" items="${param}">
			<li><c:out value="${parameter.key} = ${parameter.value}" /></li>
		</c:forEach>
	</ul>
	<ul>
		<%
		    Enumeration<String> paramNames = request.getParameterNames();
		    while (paramNames.hasMoreElements()) {
		        String key = paramNames.nextElement();
		        out.println("<li>" + key + " = " + java.net.URLDecoder.decode(request.getParameter(key), "UTF-8") + "</li>");
		    }
		%>
	</ul>
	<a href="../index.html">index</a>
</body>
</html>