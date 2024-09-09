import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Produtiva {
    public static void main(String[] args) {
        List<String> mensagens = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);

        System.out.println("Digite a mensagem para o log ");
        for (int i = 1; i <= 10; i++) {
            String mensagem = scanner.nextLine();
            mensagens.add(mensagem);
        }

        scanner.close();

        System.out.println("\nTodos os Logs:");
        for (String mensagem : mensagens) {
            LOGS.gerarLog(mensagem);
        }
    }
}