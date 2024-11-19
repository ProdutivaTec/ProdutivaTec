import org.springframework.jdbc.core.JdbcTemplate;
import org.apache.commons.dbcp2.BasicDataSource;

public class Conexao {
    private final JdbcTemplate jdbcTemplate;

    public Conexao() {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("SENHA_URL");
        dataSource.setUsername("SENHA_USUARIO");
        dataSource.setPassword("SENHA_BD");
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public JdbcTemplate getConexaoDoBanco() {
        return jdbcTemplate;
    }
}
