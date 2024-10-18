import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

public class LeituraDadosTrabalhoRemoto {
    public List<DadosTrabalhoRemoto> extrairDados(String caminhoArquivo) {
        List<DadosTrabalhoRemoto> dadosList = new ArrayList<>();

        try (FileInputStream fis = new FileInputStream(caminhoArquivo);
             XSSFWorkbook workbook = new XSSFWorkbook(fis)) {

            XSSFSheet sheet = workbook.getSheetAt(0); // Obtendo a primeira aba

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // Ignorar cabeçalho

                DadosTrabalhoRemoto dados = new DadosTrabalhoRemoto();
                preencherDados(dados, row);
                dadosList.add(dados);
            }
        } catch (Exception e) {
            System.err.println("Erro ao processar o arquivo: " + e.getMessage());
        }

        return dadosList;
    }

    private void preencherDados(DadosTrabalhoRemoto dados, Row row) {
        for (int i = 0; i < 18; i++) { // Presumindo que você tenha 18 colunas
            Cell cell = row.getCell(i);
            String valor = getCellValue(cell);
            switch (i) {
                case 0 -> dados.setId(valor);
                case 1 -> dados.setAnoNascimento(valor);
                case 2 -> dados.setGenero(valor);
                case 3 -> dados.setSetor(valor);
                case 4 -> dados.setOcupacao(valor);
                case 5 -> dados.setQtdEmpregados(valor);
                case 6 -> dados.setFacilidadePermissao(valor);
                case 7 -> dados.setHorasTrabalhadas(valor);
                case 8 -> dados.setHorasPessoais(valor);
                case 9 -> dados.setProdutividade(valor);
                case 10 -> dados.setComentarioProdutividade(valor);
                case 11 -> dados.setConectividade(valor);
                case 12 -> dados.setGerenciamentoCompromissos(valor);
                case 13 -> dados.setOportunidadesSocializacao(valor);
                case 14 -> dados.setNumeroInteracoes(valor);
                case 15 -> dados.setNumeroProjetos(valor);
                case 16 -> dados.setNumeroHoras(valor);
                case 17 -> dados.setNumeroAnosExperiencia(valor);
            }
        }
    }

    private String getCellValue(Cell cell) {
        if (cell == null) return "";
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                return String.valueOf(cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            default:
                return "";
        }
    }
}
