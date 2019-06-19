package servlet;

import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by win10 on 2019/5/24.
 */
@WebServlet(name = "ChangeCourseDetail")
public class ChangeCourseDetail extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String dir = request.getParameter("dir").trim();
        String old_title = request.getParameter("old_title").trim();
        String new_title = request.getParameter("new_title").trim();
        String content = request.getParameter("content");
        response.setContentType("application/json;charset=utf-8");
        HDFSConnect connect = new HDFSConnect("192.168.156.128","9820");
        FileSystem fs = connect.getFs();
        response.setCharacterEncoding("UTF-8");
        PrintWriter o = response.getWriter();
        if(fs.delete(new Path(dir+old_title+".txt"),true)==true){
            try(FSDataOutputStream out = fs.create(new Path(dir+new_title+".txt"))){
                int bufferSize = 50000;
                int i =0;
                int sum = 0;
                while(i < content.length()){
                    int endIdx = java.lang.Math.min(content.length(),i+bufferSize);
                    String jsosPart = content.substring(i,endIdx);
                    out.writeUTF(jsosPart);
                    sum += jsosPart.length();
                    i += bufferSize;
                }
                out.flush();
                o.print("true");
            }catch(IOException e){
                System.out.println(e);
                o.print("false");
            }
        }else
            o.print("false");
    }
}
