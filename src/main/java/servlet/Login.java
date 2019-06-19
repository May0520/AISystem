package servlet;

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
@WebServlet(name = "Login")
public class Login extends HttpServlet {
    public String checkPwd(String username,String password) {
        Connection con;
        String flag = "false";
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
            String sql = "select * from user_info";
            ResultSet rs = statement.executeQuery(sql);
            while(rs.next()){
                if(username.equals(rs.getString("user_name")) && password.equals(rs.getString("user_password"))) {
                    flag = rs.getString("user_type");
                    break;
                }
            }
            rs.close();
            con.close();
        }catch(ClassNotFoundException e) {
            System.out.println("Sorry,can`t find the Driver!");
            e.printStackTrace();
        } catch(SQLException e) {
            e.printStackTrace();
        }catch (Exception e) {
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
        String flag=checkPwd(username,password);
        System.out.println(flag);
        response.getWriter().write(flag);
    }
}
