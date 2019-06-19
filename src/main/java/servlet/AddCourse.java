package servlet;

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
@WebServlet(name = "AddCourse")
public class AddCourse extends HttpServlet {
    public Boolean addCourse(String course_name,String course_teacher,String course_type,String course_time,String course_place,String course_total_time,String course_point) {
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
            String check = "select * from course_info where course_name=? and course_teacher=?";
            PreparedStatement stmt0 = con.prepareStatement(check);
            stmt0.setString(1,course_name);
            stmt0.setString(2,course_teacher);
            ResultSet rs = stmt0.executeQuery();
            if(rs.getRow()>0){
                flag = false;
                return flag;
            }
            String sql = "insert into course_info values(?,?,?,?,?,?,?)";
            PreparedStatement stmt = con.prepareStatement(sql);
            stmt.setString(1,course_name);
            stmt.setString(2,course_teacher);
            stmt.setString(3,course_type);
            stmt.setString(4,course_time);
            stmt.setString(5,course_place);
            stmt.setString(6,course_total_time);
            stmt.setString(7,course_point);
            int i = stmt.executeUpdate();            //执行插入数据操作，返回影响的行数
            if (i == 1) {
                flag = true;
                HDFSConnect connect = new HDFSConnect("192.168.156.128", "9820");
                FileSystem fs = connect.getFs();
                fs.mkdirs(new Path("/user/aiSystemUser/"+course_teacher+"/course/"+course_name));
                fs.mkdirs(new Path("/user/aiSystemUser/"+course_teacher+"/homework/"+course_name));
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
        String course_teacher=request.getParameter("course_teacher");
        String course_type=request.getParameter("course_type");
        String course_time=request.getParameter("course_time");
        String course_place=request.getParameter("course_place");
        String course_total_time=request.getParameter("course_total_time");
        String course_point=request.getParameter("course_point");
        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("UTF-8");
        String flag=addCourse(course_name,course_teacher,course_type,course_time,course_place,course_total_time,course_point).toString();
        response.getWriter().write(flag);
    }
}
