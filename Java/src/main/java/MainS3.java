import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.exception.SdkException;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

public class MainS3 {
    private static final Logger logger = Logger.getLogger(MainS3.class.getName());
    private static final String BUCKET_NAME = "produtiva";
    private static final S3Client s3Client = new S3().getS3Client(); // Instanciando o cliente S3

    public static void main(String[] args) {
        listarObjetos(BUCKET_NAME);
        File tempFile = criarArquivoTemporario();
        if (tempFile != null) {
            fazerUpload(BUCKET_NAME, tempFile.getPath());
            fazerDownload(BUCKET_NAME);
            deletarObjeto(BUCKET_NAME, tempFile.getName());
        }
    }

    private static File criarArquivoTemporario() {
        try {
            File tempFile = File.createTempFile("teste-upload-", ".txt");
            Files.writeString(tempFile.toPath(), "Este é um teste de upload para o S3."); // Adiciona um conteúdo de teste
            return tempFile;
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Erro ao criar arquivo temporário: {0}", e.getMessage());
            return null;
        }
    }
    // Listar objetos de um bucket
    private static void listarObjetos(String nomeBucket) {
        try {
            ListObjectsRequest listObjects = ListObjectsRequest.builder()
                    .bucket(nomeBucket)
                    .build();
            List<S3Object> objects = s3Client.listObjects(listObjects).contents();
            logger.log(Level.INFO, "Objetos no bucket {0}:", nomeBucket);
            for (S3Object object : objects) {
                logger.log(Level.INFO, "- {0}", object.key());
            }
        } catch (S3Exception e) {
            logger.log(Level.SEVERE, "Erro ao listar objetos no bucket: {0}", e.getMessage());
        }
    }

    // Fazer upload de um arquivo
    private static void fazerUpload(String nomeBucket, String caminhoArquivo) {
        try {
            String uniqueFileName = UUID.randomUUID().toString(); // Nome único para o arquivo
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(nomeBucket)
                    .key(uniqueFileName)
                    .build();

            File file = new File(caminhoArquivo);
            s3Client.putObject(putObjectRequest, RequestBody.fromFile(file));

            logger.log(Level.INFO, "Arquivo '{0}' enviado com sucesso com o nome: {1}", new Object[]{file.getName(), uniqueFileName});
        } catch (SdkException e) {
            logger.log(Level.SEVERE, "Erro ao fazer upload do arquivo: {0}", e.getMessage());
        }
    }

    // Fazer download de arquivos
    private static void fazerDownload(String nomeBucket) {
        try {
            List<S3Object> objects = s3Client.listObjects(ListObjectsRequest.builder().bucket(nomeBucket).build()).contents();
            for (S3Object object : objects) {
                GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                        .bucket(nomeBucket)
                        .key(object.key())
                        .build();

                InputStream inputStream = s3Client.getObject(getObjectRequest, ResponseTransformer.toInputStream());
                Files.copy(inputStream, new File(object.key()).toPath());
                logger.log(Level.INFO, "Arquivo baixado: {0}", object.key());
            }
        } catch (IOException | S3Exception e) {
            logger.log(Level.SEVERE, "Erro ao fazer download dos arquivos: {0}", e.getMessage());
        }
    }

    // Deletar um objeto de um bucket
    private static void deletarObjeto(String nomeBucket, String objectKey) {
        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(nomeBucket)
                    .key(objectKey)
                    .build();
            s3Client.deleteObject(deleteObjectRequest);

            logger.log(Level.INFO, "Objeto deletado com sucesso: {0}", objectKey);
        } catch (S3Exception e) {
            logger.log(Level.SEVERE, "Erro ao deletar objeto: {0}", e.getMessage());
        }
    }
}
