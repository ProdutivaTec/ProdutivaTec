public abstract class Notificador {
    public abstract void enviar(String mensagem);

    protected void logMensagem(String mensagem) {
        System.out.println("Log de notificação: " + mensagem);
    }
}
