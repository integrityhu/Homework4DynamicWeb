<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-2">
<title>Insert title here</title>
</head>
<body>
<%@ page import="org.apache.commons.httpclient.methods.GetMethod" %>
<%@ page import="org.apache.commons.httpclient.HttpClient" %>
<%@ page import="hu.infokristaly.homework.dynamicweb.utils.GetFromWeb" %>
<%= hu.infokristaly.homework.dynamicweb.utils.GetFromWeb.getFromUrl("http://infokristaly.hu") %>
</body>
</html>