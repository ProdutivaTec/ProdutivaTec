import org.springframework.jdbc.core.JdbcTemplate;
import org.apache.commons.dbcp2.BasicDataSource;

public class Conexao {
    private final JdbcTemplate jdbcTemplate;

    public Conexao() {
        BasicDataSource dataSource = new BasicDataSource();

        String url = System.getenv("SENHA_URL");
        String usuario = System.getenv("SENHA_USUARIO");
        String senha = System.getenv("SENHA_BD");

        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl(url);
        dataSource.setUsername(usuario);
        dataSource.setPassword(senha);
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public JdbcTemplate getConexaoDoBanco() {
        return jdbcTemplate;
    }
}
