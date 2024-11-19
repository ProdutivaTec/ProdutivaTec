import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import java.nio.file.Paths;

public class S3 {
    public void fazerDownload(String bucket, String chaveArquivo, String caminhoLocal) {
        try (S3Client s3Client = getS3Client()) {
            GetObjectRequest request = GetObjectRequest.builder()
                    .bucket(bucket)
                    .key(chaveArquivo)
                    .build();
            s3Client.getObject(request, Paths.get(caminhoLocal));
            System.out.println("Arquivo baixado: " + chaveArquivo);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao baixar arquivo do S3: " + e.getMessage());
        }
    }
    private S3Client getS3Client() {
        return S3Client.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(() -> AwsSessionCredentials.create(
                        System.getenv("AWS_ACCESS_KEY_ID"),
                        System.getenv("AWS_SECRET_ACCESS_KEY"),
                        System.getenv("AWS_SESSION_TOKEN")
                )).build();
    }
}