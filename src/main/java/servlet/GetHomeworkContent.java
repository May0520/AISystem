package servlet;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by win10 on 2019/5/24.
 */
@WebServlet(name = "GetHomeworkContent")
public class GetHomeworkContent extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String path = request.getParameter("path");
        response.setContentType("application/text;charset=utf-8");
        ServletOutputStream out = response.getOutputStream();
        response.setCharacterEncoding("UTF-8");
        HDFSConnect connect = new HDFSConnect("192.168.156.128","9820");
        FileSystem fs = connect.getFs();
        try(FSDataInputStream in = fs.open(new Path(path))){
            String deadline = in.readLine().trim();
            IOUtils.copyBytes(in,out,4096,true);
            out.flush();
            fs.close();
        }catch(IOException e){
            out.print("false");
        }


    }
}
