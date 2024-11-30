import org.springframework.jdbc.core.JdbcTemplate;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;

import java.util.List;

public class MainConexao {
    private final Conexao conexao;
    private final S3 s3;
    private final NotificadorSlack notificadorSlack;

    public MainConexao() {
        this.conexao = new Conexao();
        this.notificadorSlack = new NotificadorSlack("https://hooks.slack.com/services/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");
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
        String sql = "INSERT INTO dadosDashboard (" +
                "idDados, anoNascimento, genero, setor, ocupacao, tamanhoFamilia, " +
                "colaboracaoComColegasAnoAnterior, recomendacao, colaboracaoComColegas3Meses, " +
                "preferenciaTrabalhoRemoto, produtividade, piorAspectoTrabalhoRemoto, " +
                "piorAspectoTrabalhoPresencial, tempoDedicadoTrabalhoPresencial, " +
                "tempoDedicadoTarefasPresencial, tempoDedicadoTrabalhoRemoto, " +
                "tempoDedicadoTarefasRemoto, maiorBarreiraTrabalhoRemoto, " +
                "menorBarreiraTrabalhoRemoto" +
                ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

        for (DadosTrabalhoRemoto dados : dadosList) {
            jdbcTemplate.update(sql,
                    dados.getIdDados(),
                    dados.getAnoNascimento(),
                    dados.getGenero(),
                    dados.getSetor(),
                    dados.getOcupacao(),
                    dados.getTamanhoFamilia(),
                    dados.getColaboracaoComColegasAnoAnterior(),
                    dados.getRecomendacao(),
                    dados.getColaboracaoComColegas3Meses(),
                    dados.getPreferenciaTrabalhoRemoto(),
                    dados.getProdutividade(),
                    dados.getPiorAspectoTrabalhoRemoto(),
                    dados.getPiorAspectoTrabalhoPresencial(),
                    dados.getTempoDedicadoTrabalhoPresencial(),
                    dados.getTempoDedicadoTarefasPresencial(),
                    dados.getTempoDedicadoTrabalhoRemoto(),
                    dados.getTempoDedicadoTarefasRemoto(),
                    dados.getMaiorBarreiraTrabalhoRemoto(),
                    dados.getMenorBarreiraTrabalhoRemoto()
            );
        }
    }

    public static void main(String[] args) {
        MainConexao mainConexao = new MainConexao();
        String bucket = System.getenv("BUCKET");
        mainConexao.executar(bucket, "PLANILHA CORRETA.xlsx", "PLANILHA CORRETA.xlsx");
    }
}