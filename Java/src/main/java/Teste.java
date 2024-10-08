import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class Teste {

    public static void main(String[] args) {
        Conexao conexao = new Conexao();

        JdbcTemplate jdbcTemplate = conexao.getConexaoDoBanco();

        try {
            String selectQuery = "SELECT * FROM usuarios";
            jdbcTemplate.query(selectQuery, (rs, rowNum) -> {
                String nome = rs.getString("nome");
                String email = rs.getString("email");
                System.out.println("Nome: " + nome + ", Email: " + email);
                return null;
            });
        } catch (Exception e) {
            System.out.println("Erro ao realizar SELECT: " + e.getMessage());
        }
    }
}
