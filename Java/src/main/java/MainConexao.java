import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class MainConexao {

    private static final Logger logger = Logger.getLogger(MainConexao.class.getName());
    public static void main(String[] args) {
        Conexao conexao = new Conexao();
        JdbcTemplate conectar = conexao.getConexaoDoBanco();

        LeituraDadosTrabalhoRemoto leitura = new LeituraDadosTrabalhoRemoto();
        List<DadosTrabalhoRemoto> dados = leitura.extrairDados("Planilha de Dados.xlsx");
        logger.log(Level.INFO, "Iniciando a leitura do arquivo: {0}", dados);

        if (dados.isEmpty()) {
            logger.log(Level.WARNING, "Nenhum dado foi extraído do arquivo: {0}", dados);
        } else {
            logger.log(Level.INFO, "Dados extraídos com sucesso. Total de registros: {0}", dados.size());
        }

        inserirDadosNoBanco(conectar, dados);
    }

    private static void inserirDadosNoBanco(JdbcTemplate jdbcTemplate, List<DadosTrabalhoRemoto> dadosList) {
        String sql = "INSERT INTO DadosTrabalhoRemoto (id, ano_nascimento, genero, setor, ocupacao, qtd_empregados, facilidade_permissao, horas_trabalhadas, horas_pessoais, produtividade, comentario_produtividade, conectividade, gerenciamento_compromissos, oportunidades_socializacao, numero_interacoes, numero_projetos, numero_horas, numero_anos_experiencia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        for (DadosTrabalhoRemoto dados : dadosList) {
            jdbcTemplate.update(sql,
                    dados.getId(),
                    dados.getAnoNascimento(),
                    dados.getGenero(),
                    dados.getSetor(),
                    dados.getOcupacao(),
                    dados.getQtdEmpregados(),
                    dados.getFacilidadePermissao(),
                    dados.getHorasTrabalhadas(),
                    dados.getHorasPessoais(),
                    dados.getProdutividade(),
                    dados.getComentarioProdutividade(),
                    dados.getConectividade(),
                    dados.getGerenciamentoCompromissos(),
                    dados.getOportunidadesSocializacao(),
                    dados.getNumeroInteracoes(),
                    dados.getNumeroProjetos(),
                    dados.getNumeroHoras(),
                    dados.getNumeroAnosExperiencia()
            );
        }
        logger.log(Level.INFO, "Dados inseridos com sucesso!");
    }
}
