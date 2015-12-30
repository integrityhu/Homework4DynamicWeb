function Client(owner){
    this.init(owner);
    $.extend(this, new ActionDrivenObject(this, owner, 'client'));
}

Client.prototype = {
    init: function(owner){
        this.className = 'Client';
        this.fetchTimed = false;
        this.jComponent = owner;
        this.httpReqObj = createXMLHttpRequest();
        this.xStyleSheets = new Object();
        this.staticXMLRefs = new Object();
        this.session = this.jComponent.xmlServer.sessionHandlerFactory.sessionHandler;
        this.containers = new Object();
    },
    addXSLT: function(styleName, path){
        this.xStyleSheets[styleName] = new Object();
        if ($.browser.mozilla || $.browser.opera) {
            this.httpReqObj.open("GET", path, false); //syncronous call with last param false
            this.httpReqObj.send(null);
            this.xStyleSheets[styleName].xslRef = this.httpReqObj.responseXML;
        }
        else 
            if ($.browser.msie) {
                var xsltProcessor = new ActiveXObject("MSXML2.FreeThreadedDomDocument");
                xsltProcessor.async = false;
                xsltProcessor.load(path);
                this.xStyleSheets[styleName].xsltProcessor = xsltProcessor;
            }
    },
    addStaticXMLRef: function(refName, xmlRef){
        this.staticXMLRefs[refName] = xmlRef;
    },
    loadTemplate: function(targetId, path){
        var targetObj = $(targetId);
        if (targetObj != null) {
            if (this.jComponent.loadas == 'xml') {
                $.ajax({
                    type: "GET",
                    url: path,
                    dataType: "xml",
                    success: function(xml){
                        $(xml).find('>').each(function(index){
                            $(targetObj).empty();
                            $(targetObj).append(this);
                        })
                    }
                });
            }
            else {
                this.httpReqObj.open("GET", path, false); //syncronous call with last param false
                this.httpReqObj.send(null);
                var tpl = this.httpReqObj.responseText;
                if (tpl != null) {
                    $(targetObj).html(tpl);
                }
            }
        }
    },
    loadScript: function(url){
        this.httpReqObj.open("GET", url, false); //syncronous call with last param false
        this.httpReqObj.send(null);
        return this.httpReqObj.responseText;
    },
    setContent: function(params, target){
        if (params.fragmentText != undefined) {
            $(target).html(params.fragmentText);
        }
        else {
            $(target).empty();
            $(target).html(params.fragment);
        }
    },
    appendRecordSet: function(params, target){
        var treechildren = $("#" + target).find(" > treechildren");
        if (treechildren.length > 0) {
            var containerDoc = this.createDocument();
            containerDoc.appendChild(params.fragment);
            $(containerDoc).find(" > treechildren > treeitem").each(function(index){
                $(treechildren[0]).append(this);
            });
        };
    },
    transform: function(styleName, xmlRef, params){
        var result = new Object();
        var containerDoc = null;

        if ($.browser.msie) {
        	containerDoc = document.implementation.createDocument('','xml',null);
        	$(containerDoc).append(xmlRef);
        } else {
        	containerDoc = this.createDocument();
        	containerDoc.appendChild(xmlRef); //IE11 buggy
        }
        
        params.transform.fielddefs = params.container.getTableDefDoc();
        result.ready = (this.xStyleSheets[styleName] != undefined);
        if (result.ready) {
            if (($.browser.mozilla || $.browser.opera) && (this.xStyleSheets[styleName].xslRef != null)) {
                var xsltProcessor = new XSLTProcessor();
                xsltProcessor.reset();
                xsltProcessor.importStylesheet(this.xStyleSheets[styleName].xslRef);
                for (var paramName in params.transform) {
                    xsltProcessor.setParameter(null, paramName, params.transform[paramName]);
                }
                try {
                    result.fragment = xsltProcessor.transformToFragment(containerDoc, document);
                } 
                catch (ex) {
                    result.ready = false;
                    result.msg = "Exception in transformation (" + ex.name + ":" + ex.message + ")";
                }
				xsltProcessor.reset();
            }
            else
                if (($.browser.msie) && (this.xStyleSheets[styleName].xsltProcessor != null)) {
                    var objCompiled = new ActiveXObject("MSXML2.XSLTemplate");
                    objCompiled.stylesheet = this.xStyleSheets[styleName].xsltProcessor.documentElement;
                    var objXSLProc = objCompiled.createProcessor();
                    objXSLProc.input = containerDoc;
                    if (params != null) 
                        for (paramName in params.transform) {
                            objXSLProc.addParameter(paramName, params.transform[paramName]);
                        }
                    try {
                        objXSLProc.transform();
                        result.fragmentText = objXSLProc.output;
                    } 
                    catch (ex) {
                        result.ready = false;
                        result.msg = "Exception in transformation: (" + ex.name + ":" + ex.message + ")";
                    }
                }
        }
        return result;
    },
    transform2Table: function(params){
        var pageContent = params.container.actions.getcontent.params.content;
        var count = params.container.actions.getcontent.params.count;
        if ((count == undefined) || (count.value == undefined) || (count.value == 0)) {
            $("#" + params.containerName).find("> treechildren").each(function(index){
                $(this).empty();
            });
            $("#" + params.containerName).find("> tbody").each(function(index){
                $(this).empty();
            });
        }
        else 
            if ((pageContent != undefined) && (pageContent.value != undefined) && (pageContent.value != null)) {
                var items = $('> *', pageContent.value);
                if (items.length > 0) {
                    var result = JComponent.client.transform('table', items[0], params);
                    if (result.ready) {
                        JComponent.client.setContent(result, params.target);
                        if (params.onTransformReady != undefined) 
                            params.onTransformReady(params.containerName, params.target);
                    }
                    else 
                        alert(result.msg);
                }
            }
        
    },
    transform2Editor: function(params){
        var pageContent = params.container.actions.getcontent.params.content;
        if ((pageContent != undefined) && (pageContent.value != undefined) && (pageContent.value != null)) {
            var items = $('> *', pageContent.value);
            if (items.length > 0) 
                var result = JComponent.client.transform('editor', items[0], params);
            if (result.ready) {
                JComponent.client.setContent(result, params.target);
                if (params.onTransformReady != undefined) 
                    params.onTransformReady(params.containerName, params.target);
            }
            else 
                alert(result.msg);
        }
    },
    transform2recordset: function(params){
        var pageContent = params.container.actions.getcontent.params.content;
        var getPageReady = params.container.actions.nextpage.params.ready.value;
        if (getPageReady && (pageContent != undefined) && (pageContent.value != undefined) && (pageContent.value != null)) {
            var items = $('> *', pageContent.value);
            if (items.length > 0) {
                var result = JComponent.client.transform('recordset', items[0], params);
                if (result.ready) {
                    JComponent.client.appendRecordSet(result, params.containerName);
                    if (params.onTransformReady != undefined) 
                        params.onTransformReady(params.containerName, params.containerName);
                }
                else 
                    alert(result.msg);
            }
        }
    },
    tableClick: function(event){
        var tbo = event.target.parentNode.boxObject;
        var row = {}, col = {}, child = {};
        if (tbo.getCellAt != undefined) {
            tbo.getCellAt(event.clientX, event.clientY, row, col, child);
            if (col.value != null) {
                if (col.value.index == 0) 
                    JComponent.client.deleteOne(row.value + 1, event.target.parentNode.id);
                else 
                    if (col.value.index == 1) 
                        JComponent.client.editOne(row.value + 1, event.target.parentNode.id);
            }
        }
    },
    fetchMorePage: function(target){
        JComponent.client.getNextPage(target, '#div' + target);
        JComponent.client.fetchTimed = false;
    },
    onTableScroll: function(event){
        if ((event.attrName == "curpos") && !JComponent.client.fetchTimed) {
            var targetObj = event.target;
            var row = targetObj.treeBoxObject.getLastVisibleRow();
            var visibleRowCount = Math.floor(targetObj.treeBoxObject.height / targetObj.treeBoxObject.rowHeight);
            if ((row > 0) && (row == targetObj.view.rowCount)) {
                var timeds = "JComponent.client.fetchMorePage('" + event.target.id + "')";
                JComponent.client.fetchTimed = true;
                setTimeout(timeds, 150);
            }
        }
    },
    setListener: function(containerId){
        var tree = $(containerId)[0];
        tree.addEventListener("DOMAttrModified", JComponent.client.onTableScroll, false);
    }
}
