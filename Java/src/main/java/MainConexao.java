import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class MainConexao {
    public static void main(String[] args) {
        Conexao conexao = new Conexao();
        JdbcTemplate conectar = conexao.getConexaoDoBanco();
    }
}
