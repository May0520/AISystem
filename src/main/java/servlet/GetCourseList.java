package servlet;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.apache.hadoop.fs.FileSystem;

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
@WebServlet(name = "GetCourseList")
public class GetCourseList extends HttpServlet {
    public JsonArray getCourseList(String teacher_name) {
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
            String sql = "select * from course_info where course_teacher=?";
            PreparedStatement stmt0 = con.prepareStatement(sql);
            stmt0.setString(1,teacher_name);
            ResultSet rs = stmt0.executeQuery();
            while (rs.next()){
                JsonObject obj = new JsonObject();
                obj.addProperty("course_name",rs.getString("course_name"));
                obj.addProperty("course_type",rs.getString("course_type"));
                obj.addProperty("course_time",rs.getString("course_time"));
                obj.addProperty("course_place",rs.getString("course_place"));
                obj.addProperty("course_total_time",rs.getString("course_total_time"));
                obj.addProperty("course_point",rs.getString("course_point"));
                arr.add(obj);
            }
            con.close();
        } catch (ClassNotFoundException e) {
            System.out.println("Sorry,can`t find the Driver!");
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return arr;
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String teacher_name = request.getParameter("teacher_name");
        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print(getCourseList(teacher_name).toString());

    }
}
