<?xml version="1.0" encoding="utf-8" ?>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<sql:query var="rs" dataSource="jdbc/demand">
select id,name,descriptorXML from ContainerDescriptor
</sql:query>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>MySQL teszt lap</title>
</head>
<body>
  <h2>Results</h2>
<table>
<thead>
<tr>
<%-- Get the column names for the header of the table --%>
<c:forEach var="columnName" items="${rs.columnNames}">
  <th><c:out value="${columnName}"/></th>
</c:forEach>
</tr>
</thead>
<tbody>
<c:forEach var="row" items="${rs.rows}">
  <tr>
    <td><c:out value="${row.id}"/></td>
    <td><c:out value="${row.name}"/></td>
    <td><c:out value="${row.descriptorXML}"/></td>
  </tr>
</c:forEach>
</tbody>
</table>
<a href="../index.html">index</a>
</body>
</html>