package hu.infokristaly.homework.dynamicweb;

import hu.infokristaly.homework.dynamicweb.utils.StrTk;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Hashtable;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

@WebServlet("/XMLGenerator")
public class XMLGenerator extends HttpServlet {

    private static final long serialVersionUID = -6851012218039126751L;

    public XMLGenerator() {
        super();
    }

    public static DataSource getDataSource() {
        DataSource result = null;
        try {
            Hashtable<String, String> env = new Hashtable<String, String>(11);
            InitialContext ctx = new InitialContext(env);
            Context envContext = (Context) ctx.lookup("java:jboss");
            result = (DataSource) envContext.lookup("datasources/demandDS");
        } catch (NamingException e) {
            e.printStackTrace();
        }
        return result;
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ByteArrayOutputStream ostream = new ByteArrayOutputStream();
        OutputStreamWriter sout = new OutputStreamWriter(ostream, "utf-8");
        sout.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
        if (!"jquery".equals(request.getParameter("xsl"))) {
            sout.write("<?xml-stylesheet href='xsl/table.xsl' type='text/xsl'?>");
            sout.write("<xml>");
        } 
        sout.write("<data>");
        DataSource ds = getDataSource();
        try {
            Statement stmt = ds.getConnection().createStatement();
            if (stmt.execute("select id,name,descriptorXML from ContainerDescriptor")) {
                ResultSet rs = stmt.getResultSet();
                while (rs.next()) {
                    sout.write("<rec>");
                    sout.write("<field name=\"id\">" + rs.getLong(1) + "</field>");
                    sout.write("<field name=\"name\">" + StrTk.HTMLEnc(rs.getString(2)) + "</field>");
                    sout.write("<field name=\"descriptor\">" + StrTk.HTMLEnc(rs.getString(3)) + "</field>");
                    sout.write("</rec>");
                }
                rs.close();
                stmt.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        sout.write("</data>");
        if (!"jquery".equals(request.getParameter("xsl"))) {
            sout.write("</xml>");
        }
        sout.flush();
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/xml");
        ServletOutputStream out = response.getOutputStream();

        ostream.writeTo(out);
        out.flush();
        out.close();
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
    }

}
