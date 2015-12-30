<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
<title>Retrieving attributes from session</title>
</head>
<body>
A session változók között itt van a newVariable értéke: <b><c:out value="${sessionScope.newVariable}" /><b><br/>
<a href="../index.html">index</a>
</body>
</html>