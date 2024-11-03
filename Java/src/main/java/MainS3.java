import org.apache.poi.openxml4j.util.ZipSecureFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import java.nio.file.Paths;

public class MainS3 {
    static {
        ZipSecureFile.setMinInflateRatio(0.0);
    }

    private static final String BUCKET_NAME = "produtiva";
    private static final String FILE_KEY = "base-de-dados.xlsx";

    public static void main(String[] args) {
        S3 s3 = new S3();
        try (S3Client s3Client = s3.getS3Client()) {
            fazerDownload(s3Client, BUCKET_NAME, FILE_KEY);
        } catch (Exception e) {
            System.err.println("Erro ao criar o cliente S3: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static void fazerDownload(S3Client s3Client, String nomeBucket, String chaveArquivo) {
        try {
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(nomeBucket)
                    .key(chaveArquivo)
                    .build();

            s3Client.getObject(getObjectRequest, ResponseTransformer.toFile(Paths.get(chaveArquivo)));
            System.out.println("Arquivo baixado com sucesso: " + chaveArquivo);
        } catch (S3Exception e) {
            System.err.println("Erro ao fazer download do arquivo: " + e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            System.err.println("Erro inesperado: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
