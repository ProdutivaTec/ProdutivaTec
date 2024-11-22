import org.springframework.jdbc.core.JdbcTemplate;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;

import java.util.List;

public class MainConexao {
    private final Conexao conexao;
    private final S3 s3;
    private final NotificadorSlack notificadorSlack;

    public MainConexao() {
        this.conexao = new Conexao();
        this.notificadorSlack = new NotificadorSlack("https://hooks.slack.com/services/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 ");
        AwsSessionCredentials credentials = AwsSessionCredentials.create(
                System.getenv("AWS_ACCESS_KEY_ID"),
                System.getenv("AWS_SECRET_ACCESS_KEY"),
                System.getenv("AWS_SESSION_TOKEN")
        );

        this.s3 = new S3(credentials);
    }


    public void executar(String bucket, String chaveArquivo, String caminhoLocal) {
        JdbcTemplate jdbcTemplate = conexao.getConexaoDoBanco();

        try {
            s3.fazerDownload(bucket, chaveArquivo, caminhoLocal);

            LeituraDadosTrabalhoRemoto leitura = new LeituraDadosTrabalhoRemoto();
            List<DadosTrabalhoRemoto> dados = leitura.extrairDados(caminhoLocal);

            if (dados.isEmpty()) {
                notificadorSlack.enviar("Nenhum dado válido encontrado no arquivo: " + chaveArquivo);
            } else {
                inserirDadosNoBanco(jdbcTemplate, dados);
                notificadorSlack.enviar("Dados inseridos com sucesso! Total: " + dados.size());
            }
        } catch (Exception e) {
            notificadorSlack.enviar("Erro no processo: " + e.getMessage());
        }
    }

    private void inserirDadosNoBanco(JdbcTemplate jdbcTemplate, List<DadosTrabalhoRemoto> dadosList) {
        String sql = "INSERT INTO DadosTrabalhoRemoto (\n" +
                "    response_id, ano_nascimento, genero, setor, ocupacao, tipo_familia, \n" +
                "    facilidade_colaboracao_passado, recomendacao_trabalho_remoto_passado, \n" +
                "    facilidade_colaboracao_3_meses, recomendacao_trabalho_remoto_3_meses, \n" +
                "    preferencia_tempo_remoto, produtividade, horas_trabalhadas, \n" +
                "    barreira_mais_significativa, barreira_menos_significativa, \n" +
                "    pior_aspecto_trabalho_remoto, melhor_aspecto_trabalho_remoto\n" +
                ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);\n";

        for (DadosTrabalhoRemoto dados : dadosList) {
            jdbcTemplate.update(sql,
                    dados.getResponseId(),
                    dados.getAnoNascimento(),
                    dados.getGenero(),
                    dados.getSetor(),
                    dados.getOcupacao(),
                    dados.getTipoFamilia(),
                    dados.getFacilidadeColaboracaoPassado(),
                    dados.getRecomendacaoTrabalhoRemotoPassado(),
                    dados.getFacilidadeColaboracao3Meses(),
                    dados.getRecomendacaoTrabalhoRemoto3Meses(),
                    dados.getPreferenciaTempoRemoto(),
                    dados.getProdutividade(),
                    dados.getHorasTrabalhadas(),
                    dados.getBarreiraMaisSignificativa(),
                    dados.getBarreiraMenosSignificativa(),
                    dados.getPiorAspectoTrabalhoRemoto(),
                    dados.getMelhorAspectoTrabalhoRemoto()
            );
        }
    }

    public static void main(String[] args) {
        MainConexao mainConexao = new MainConexao();
        String bucket = System.getenv("BUCKET");
        mainConexao.executar(bucket, "base-tratada-kip.xlsx", "base-tratada-kip.xlsx");
    }
}