<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
<title>Retrieving attributes from session</title>
</head>
<body>
A session v�ltoz�k k�z�tt itt van a newVariable �rt�ke: <b><c:out value="${sessionScope.newVariable}" /><b><br/>
<a href="../index.html">index</a>
</body>
</html>