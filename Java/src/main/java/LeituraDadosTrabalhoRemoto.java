import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class LeituraDadosTrabalhoRemoto extends DadosTrabalhoRemoto {

    public List<DadosTrabalhoRemoto> extrairDados(String caminhoArquivo) {
        List<DadosTrabalhoRemoto> listaDados = new ArrayList<>();

        try (FileInputStream fis = new FileInputStream(caminhoArquivo);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;

                DadosTrabalhoRemoto dados = new DadosTrabalhoRemoto();

                dados.setIdDados((int) getNumericCellValue(row.getCell(0)));
                dados.setAnoNascimento((int) getNumericCellValue(row.getCell(1)));
                dados.setGenero(getStringCellValue(row.getCell(2)));
                dados.setSetor(getStringCellValue(row.getCell(3)));
                dados.setOcupacao(getStringCellValue(row.getCell(4)));
                dados.setTamanhoFamilia(getStringCellValue(row.getCell(5)));
                dados.setColaboracaoComColegasAnoAnterior(getStringCellValue(row.getCell(6)));
                dados.setRecomendacao(getStringCellValue(row.getCell(7)));
                dados.setColaboracaoComColegas3Meses(getStringCellValue(row.getCell(8)));
                dados.setPreferenciaTrabalhoRemoto(getStringCellValue(row.getCell(9)));
                dados.setProdutividade(getStringCellValue(row.getCell(10)));
                dados.setPiorAspectoTrabalhoRemoto(getStringCellValue(row.getCell(11)));
                dados.setPiorAspectoTrabalhoPresencial(getStringCellValue(row.getCell(12)));
                dados.setTempoDedicadoTrabalhoPresencial((int) getNumericCellValue(row.getCell(13)));
                dados.setTempoDedicadoTarefasPresencial((int) getNumericCellValue(row.getCell(14)));
                dados.setTempoDedicadoTrabalhoRemoto((int) getNumericCellValue(row.getCell(15)));
                dados.setTempoDedicadoTarefasRemoto((int) getNumericCellValue(row.getCell(16)));
                dados.setMaiorBarreiraTrabalhoRemoto(getStringCellValue(row.getCell(17)));
                dados.setMenorBarreiraTrabalhoRemoto(getStringCellValue(row.getCell(18)));
                listaDados.add(dados);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return listaDados;
    }

    private String getStringCellValue(Cell cell) {
        if (cell == null) return "NULL";
        return formatarValorParaSQL(cell.getCellType() == CellType.STRING ? cell.getStringCellValue() : cell.toString());
    }

    private double getNumericCellValue(Cell cell) {
        if (cell == null) return 0;
        return cell.getCellType() == CellType.NUMERIC ? cell.getNumericCellValue() : 0;
    }

    private String formatarValorParaSQL(String valor) {
        if (valor == null || valor.isEmpty()) return null;
        return valor.trim();
    }
}
