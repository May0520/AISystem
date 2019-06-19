package servlet;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;

/**
 * Created by win10 on 2019/5/23.
 */
@WebServlet(name = "GetHomeworkList")
public class GetHomeworkList extends HttpServlet {
    public JsonArray getHomeworkList(FileSystem fs, String path){
        JsonArray arr = new JsonArray();
        FileStatus[] list = new FileStatus[0];
        try {
            list = fs.listStatus(new Path(path));
        } catch (IOException e) {
            e.printStackTrace();
        }
        for (FileStatus f : list) {
            try(FSDataInputStream in = fs.open(f.getPath())){
                String deadline = in.readLine().trim();
                JsonObject file = new JsonObject();
                file.addProperty("name",f.getPath().getName().toString().replace(".txt",""));
                file.addProperty("modifyTime",new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(f.getModificationTime()));
                file.addProperty("deadline",deadline);
                arr.add(file);
            }catch (IOException e){
                System.out.println(e);
            }
        }
        return arr;
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String dir = request.getParameter("dir");
        response.setContentType("application/json;charset=utf-8");
        HDFSConnect connect = new HDFSConnect("192.168.156.128","9820");
        FileSystem fs = connect.getFs();
        JsonArray arr = getHomeworkList(fs,dir);
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print(arr.toString());
        fs.close();
    }
}
