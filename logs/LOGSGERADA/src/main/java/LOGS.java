import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class LOGS {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static void gerarLog(String mensagem) {
        LocalDateTime agora = LocalDateTime.now();
        String dataHoraFormatada = agora.format(FORMATTER);
        System.out.println("[" + dataHoraFormatada + "] " + mensagem);
    }
}