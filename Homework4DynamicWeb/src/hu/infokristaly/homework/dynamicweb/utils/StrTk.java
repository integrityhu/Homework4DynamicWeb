package hu.infokristaly.homework.dynamicweb.utils;

import java.util.Iterator;

public final class StrTk {

	public static boolean isXMLCompliant(char c) {
		int type = Character.getType(c);
		boolean result = Character.isLetterOrDigit(c) || Character.isWhitespace(c) || type == Character.DASH_PUNCTUATION || type == Character.START_PUNCTUATION || type == Character.END_PUNCTUATION || type == Character.CONNECTOR_PUNCTUATION
		        || type == Character.MATH_SYMBOL || type == Character.OTHER_PUNCTUATION;
		return result && (c != '&') && (c != '<');
	}
	
	public static String join(Iterator<String> iter, String delimiter) {
        StringBuffer buffer = new StringBuffer();
        while (iter.hasNext()) {
            buffer.append(iter.next());
            if (iter.hasNext()) {
                buffer.append(delimiter);
            }
        }
        return buffer.toString();
    }
	
	public static String HTMLEnc(String s) {
		StringBuffer buff = new StringBuffer();
		int len = (s == null ? -1 : s.length());
		for (int i = 0; i < len; i++) {
			char c = s.charAt(i);
			if (isXMLCompliant(c))
				buff.append(c);
			else
				buff.append("&#" + (int) c + ";");
		}
		return buff.toString();
	}

}
