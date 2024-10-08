import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

public class Conexao {

    private JdbcTemplate conexaoDoBanco;

    public Conexao(){
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://44.208.161.72:3306/teste");
        dataSource.setUsername("root");
        dataSource.setPassword("produtiva");

        conexaoDoBanco = new JdbcTemplate(dataSource);
    }

    public JdbcTemplate getConexaoDoBanco(){
        return conexaoDoBanco;
    }
}
