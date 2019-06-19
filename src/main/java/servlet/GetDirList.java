package servlet;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
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
 * Created by Administrator on 2019/4/20.
 */
@WebServlet(name = "GetDirList")
public class GetDirList extends HttpServlet {

    public JsonArray getDirOjb(FileSystem fs,String path){
        JsonArray arr = new JsonArray();
        FileStatus[] list = new FileStatus[0];
        try {
            list = fs.listStatus(new Path(path));
        } catch (IOException e) {
            e.printStackTrace();
        }
        for (FileStatus f : list) {
            if (f.isDirectory()) {
                JsonObject dir = new JsonObject();
                dir.addProperty("name",f.getPath().getName().toString());
                dir.addProperty("isDir",String.valueOf(f.isDirectory()));
                dir.addProperty("group",f.getGroup());
                dir.addProperty("owner",f.getOwner());
                dir.addProperty("size",f.getBlockSize());
                dir.addProperty("modifyTime",new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(f.getModificationTime()));
                dir.addProperty("permission",f.getPermission().toString());
//                dir.add("sub",getDirOjb(fs, f.getPath().toString()));
                arr.add(dir);
            }
            else{
                JsonObject file = new JsonObject();
                file.addProperty("name",f.getPath().getName().toString());
                file.addProperty("isDir",String.valueOf(f.isDirectory()));
                file.addProperty("group",f.getGroup());
                file.addProperty("owner",f.getOwner());
                file.addProperty("size",f.getLen());
                file.addProperty("modifyTime",new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(f.getModificationTime()));
                file.addProperty("permission",f.getPermission().toString());
                arr.add(file);
            }
        }
        return arr;
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }


    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=utf-8");
        HDFSConnect connect = new HDFSConnect("192.168.156.128","9820");
        FileSystem fs = connect.getFs();
        String dir = request.getParameter("dir");
        JsonArray arr = getDirOjb(fs,dir);
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print(arr.toString());
        fs.close();
    }
}
