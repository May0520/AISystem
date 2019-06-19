package servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Created by Administrator on 2019/4/23.
 */
@WebServlet(name = "ExecuteHql")
public class ExecuteHql extends HttpServlet {
    public Boolean executeHql(String hql){
        Boolean flag = false;
        String driver="org.apache.hive.jdbc.HiveDriver";
        String url = "jdbc:hive2://192.168.156.128:10000/ai_system";
        String user = "hadoop";
        String password="123456";

        Connection conn = null;
        Statement stmt = null;
        try {
            Class.forName(driver);
            conn = DriverManager.getConnection(url, user, password);
            stmt = conn.createStatement();
            System.out.println("Running: " + hql);
            flag = stmt.execute(hql);
            conn.close();
            flag = true;
        } catch(ClassNotFoundException e){
            System.out.println(e);
        } catch(SQLException e){
            System.out.println(e);
        }
        return flag;
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String sql = request.getParameter("sql");
        response.getWriter().write(executeHql(sql).toString());
    }
}
