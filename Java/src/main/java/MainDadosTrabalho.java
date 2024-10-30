
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class MainDadosTrabalho {

    private static final Logger logger = Logger.getLogger(MainDadosTrabalho.class.getName());

    public static void main(String[] args) {
        String caminhoArquivo = "Planilha de Dados.xlsx"; // Altere para o caminho do seu arquivo
        logger.log(Level.INFO, "Iniciando a leitura do arquivo: {0}", caminhoArquivo);

        LeituraDadosTrabalhoRemoto leitura = new LeituraDadosTrabalhoRemoto();
        List<DadosTrabalhoRemoto> dados = leitura.extrairDados(caminhoArquivo);

        if (dados.isEmpty()) {
            logger.log(Level.WARNING, "Nenhum dado foi extraído do arquivo: {0}", caminhoArquivo);
        } else {
            logger.log(Level.INFO, "Dados extraídos com sucesso. Total de registros: {0}", dados.size());
        }

        // Exibir os dados extraídos
        for (DadosTrabalhoRemoto dado : dados) {
            System.out.println("ID: " + dado.getId());
            System.out.println("Ano de Nascimento: " + dado.getAnoNascimento());
            System.out.println("Gênero: " + dado.getGenero());
            System.out.println("Setor: " + dado.getSetor());
            System.out.println("Ocupação: " + dado.getOcupacao());
            System.out.println("Qtd de Empregados: " + dado.getQtdEmpregados());
            System.out.println("Facilidade de Permissão: " + dado.getFacilidadePermissao());
            System.out.println("Horas Trabalhadas: " + dado.getHorasTrabalhadas());
            System.out.println("Horas Pessoais: " + dado.getHorasPessoais());
            System.out.println("Produtividade: " + dado.getProdutividade());
            System.out.println("Comentário sobre Produtividade: " + dado.getComentarioProdutividade());
            System.out.println("Conectividade: " + dado.getConectividade());
            System.out.println("Gerenciamento de Compromissos: " + dado.getGerenciamentoCompromissos());
            System.out.println("Oportunidades de Socialização: " + dado.getOportunidadesSocializacao());
            System.out.println("Nº de Interações: " + dado.getNumeroInteracoes());
            System.out.println("Nº de Projetos: " + dado.getNumeroProjetos());
            System.out.println("Nº de Horas: " + dado.getNumeroHoras());
            System.out.println("Nº de Anos de Experiência: " + dado.getNumeroAnosExperiencia());
            System.out.println("------------------------------------------");
        }
        logger.log(Level.INFO, "Processo de leitura e exibição concluído.");
    }
}
