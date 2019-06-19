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
 * Created by Administrator on 2019/4/20.
 */
@WebServlet(name = "SignUp")
public class SignUp extends HttpServlet {
    public Boolean register(String username,String password,String usertype) {
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
            String check = "select * from user_info where user_name=?";
            PreparedStatement stmt0 = con.prepareStatement(check);
            stmt0.setString(1,username);
            ResultSet rs = stmt0.executeQuery();
            if(rs.getRow()>0){
                flag = false;
                return flag;
            }
            String sql = "insert into user_info values(?,?,?)";
            PreparedStatement stmt = con.prepareStatement(sql);
            stmt.setString(1,username);
            stmt.setString(2,password);
            stmt.setString(3,usertype);
            int i = stmt.executeUpdate();            //执行插入数据操作，返回影响的行数
            if (i == 1) {
                flag = true;
                HDFSConnect connect = new HDFSConnect("192.168.156.128", "9820");
                FileSystem fs = connect.getFs();
                fs.mkdirs(new Path("/user/aiSystemUser/"+username));
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
        response.setContentType("application/text;charset=utf-8");
        response.setCharacterEncoding("UTF-8");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String usertype = request.getParameter("usertype");
        String flag=register(username,password,usertype).toString();
        response.getWriter().write(flag);
    }
}
