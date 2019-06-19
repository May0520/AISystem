package servlet;

import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;

/**
 * Created by win10 on 2019/5/26.
 */
@WebServlet(name = "ChooseCourse")
public class ChooseCourse extends HttpServlet {
    public Boolean addCourse(String course_name,String teacher_name,String student_name) {
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
            String sql = "insert into choose_course_info values(?,?,?)";
            PreparedStatement stmt = con.prepareStatement(sql);
            stmt.setString(1,teacher_name);
            stmt.setString(2,course_name);
            stmt.setString(3,student_name);
            int i = stmt.executeUpdate();            //执行插入数据操作，返回影响的行数
            if (i == 1) {
                flag = true;
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
        return flag;
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String course_name=request.getParameter("course_name");
        String teacher_name=request.getParameter("teacher_name");
        String student_name=request.getParameter("student_name");
        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("UTF-8");
        String flag=addCourse(course_name,teacher_name,student_name).toString();
        response.getWriter().write(flag);
    }
}
