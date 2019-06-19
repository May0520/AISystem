package servlet;

import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created by Administrator on 2019/4/20.
 */
@WebServlet(name = "Download")
public class Download extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=utf-8");
        System.out.println("START");
        HDFSConnect connect = new HDFSConnect("192.168.156.128","9820");
        FileSystem fs = connect.getFs();
        String filename = request.getParameter("filename");
        String dst = "/Users/zty/Downloads/"+filename;
        String src = request.getParameter("path");
        try (FSDataInputStream in = fs.open(new Path(src));
             BufferedOutputStream out = new BufferedOutputStream(
                     new FileOutputStream(dst));) {
            IOUtils.copyBytes(in, out, 4096, true);
            out.flush();
            out.close();
            System.out.println("success");
        }
        fs.close();
    }
}
