package servlet;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

/**
 * Created by win10 on 2019/5/26.
 */
@WebServlet(name = "DeleteCourse")
public class DeleteCourse extends HttpServlet {
    public Boolean deleteCourse(String course_name,String teacher_name) {
        JsonArray arr = new JsonArray();
        Connection con;
        Boolean flag = false;
        String driver = "com.mysql.cj.jdbc.Driver";
        String jdbc_url = "jdbc:mysql://192.168.156.128:3306/ai_system";
        String user = "root";
        String pwd = "123456";
        try {
            Class.forName(driver);
            con = DriverManager.getConnection(jdbc_url, user, pwd);
            if (!con.isClosed())
                System.out.println("Succeeded connecting to the Database!");
            Statement statement = con.createStatement();
            String delete = "delete from course_info where course_name=? and course_teacher=?";
            PreparedStatement stmt0 = con.prepareStatement(delete);
            stmt0.setString(1,course_name);
            stmt0.setString(2,teacher_name);
            int result =  stmt0.executeUpdate();
            System.out.print("result:"+result);
            if(result==1){
                System.out.print("begin to delete dir");
                HDFSConnect connect = new HDFSConnect("192.168.156.128","9820");
                FileSystem fs = connect.getFs();
                fs.delete(new Path("/user/aiSystemUser/"+teacher_name+"/course/"+course_name),true);
            }
            con.close();
            return true;
        } catch (ClassNotFoundException e) {
            System.out.println("Sorry,can`t find the Driver!");
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String course_name = request.getParameter("course_name").trim();
        String teacher_name = request.getParameter("teacher_name").trim();
        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print(String.valueOf(deleteCourse(course_name,teacher_name)));

    }
}
