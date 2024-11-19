import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;

public class NotificadorSlack extends Notificador {
    private final String webhookUrl;

    public NotificadorSlack(String webhookUrl) {
        this.webhookUrl = webhookUrl;
    }

    @Override
    public void enviar(String mensagem) {
        try {
            URL url = new URL(webhookUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");

            String payload = "{\"text\":\"" + mensagem + "\"}";
            try (OutputStream os = conn.getOutputStream()) {
                os.write(payload.getBytes());
                os.flush();
            }

            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Falha ao enviar notificação Slack. Código: " + conn.getResponseCode());
            }

            logMensagem("Notificação enviada ao Slack: " + mensagem);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao enviar notificação ao Slack: " + e.getMessage());
        }
    }
}
