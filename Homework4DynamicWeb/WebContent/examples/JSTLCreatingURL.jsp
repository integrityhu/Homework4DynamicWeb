<?xml version="1.0" encoding="utf-8" ?>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<fmt:requestEncoding value="UTF-8" />

<c:url value="JSTLDisplayingURL.jsp" var="displayingURL">
<c:param name="name" value="<%= java.net.URLEncoder.encode(request.getParameter(\"name\"),\"UTF-8\") %>" />
<c:param name="age" value="${param.age}" />
<c:param name="email" value="${param.email}" />
</c:url>

<html>
<head>
<title>A c:url eredmény Lapja</title>
</head>
<body>
Az alábbiak kerültek átadásra az URL paramétereként:
<p />
A generált URL : <c:out value = "${displayingURL}" />. <p/>
Kattintson <a href='<c:out value="${displayingURL}" />'>ide</a> hogy részletesen megtekintse a paramétereket.<br/>
<a href="../index.html">index</a>
</body>
</html>