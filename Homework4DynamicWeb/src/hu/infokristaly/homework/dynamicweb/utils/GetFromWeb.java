package hu.infokristaly.homework.dynamicweb.utils;

import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.HttpClient;

public final class GetFromWeb {
  public static final String getFromUrl(String url){
	  String result="";
	  HttpClient httpclient = new HttpClient();
      GetMethod httpget = new GetMethod(url);
      try {
        httpclient.executeMethod(httpget);
        result = httpget.getResponseBodyAsString();
      } catch(Exception ex) {
    	if (httpget!=null)
    	  result = httpget.getStatusText();
      } finally {
        httpget.releaseConnection();
      }
	  return result;
  }
}
