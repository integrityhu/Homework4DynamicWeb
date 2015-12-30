function doTransform() {
	var XMLpath = "XMLGenerator?xsl=jquery";
	var XSLpath = "xsl/table.xsl";
	var xslRef;
	var xmlRef;
	$.ajax({
		type : "GET",
		url : XSLpath,
		async : false,
		dataType : "xml",
		success : function(xsl) {
			xslRef = xsl;
		}
	});

	$.ajax({
		type : "GET",
		url : XMLpath,
		async : false,
		dataType : "xml",
		success : function(xml) {
			xmlRef = xml;
		}
	});

	if ((xmlRef != null) && (xslRef != null)) {
		var fragment;
		containerDoc = document.implementation.createDocument('', "xml", null);
		$(xmlRef).find('>').each(function(index) {
			containerDoc.firstChild.appendChild(this);
		});

		if ($.browser.msie) {
			var objCompiled = new ActiveXObject("MSXML2.XSLTemplate");
			objCompiled.stylesheet = xslRef;
			var objXSLProc = objCompiled.createProcessor();
			objXSLProc.input = containerDoc;
			objXSLProc.transform();
			fragment = objXSLProc.output;
		} else {
			var xsltProcessor = new XSLTProcessor();
			xsltProcessor.reset();
			xsltProcessor.importStylesheet(xslRef);

			fragment = xsltProcessor
					.transformToFragment(containerDoc, document);
		}
		if (fragment != null) {
			$("#content").html(fragment);
		} else {
			alert('There is no fragment.');
		}
	}
}