<?xml version="1.0" encoding="utf-8" ?>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<body>
Session scope változó beállítása:<br>
<c:set var="newVariable" value="Ez az infokristaly.hu oldala" scope="session" />
Kettints <a href="JSTLRetrievingSessionAttribute.jsp"><b>ide</b></a> hogy megnézd milyen session változó vannak.
</body>
</html>