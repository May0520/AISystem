package servlet;

import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * Created by Administrator on 2019/4/20.
 */
@WebServlet(name = "Upload")
public class Upload extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=utf-8");
        HDFSConnect connect = new HDFSConnect("192.168.156.128","9820");
        FileSystem fs = connect.getFs();
        String dst = request.getParameter("dst");
        String src = request.getParameter("src");
        try (FSDataOutputStream out = fs.create(new Path(dst));
             BufferedInputStream in = new BufferedInputStream(
                     new FileInputStream(src));) {
            IOUtils.copyBytes(in, out, 4096, true);
            out.flush();
            out.close();
            response.getWriter().print("true");
        }
        fs.close();
    }
}
