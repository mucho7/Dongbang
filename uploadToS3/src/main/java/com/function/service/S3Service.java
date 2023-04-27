package com.function.service;

import java.io.IOException;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class S3Service {

	private final AmazonS3 s3Client;

	@Value("${cloud.aws.s3.bucket}")
	private String bucketName;

	private final Function<MultipartFile, String> generateFileName =
		file -> "videos/" + file.getOriginalFilename();

	public String uploadFileToS3(MultipartFile file) throws IOException {
		String fileName = generateFileName.apply(file);
		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentType("video/webm");
		s3Client.putObject(bucketName, fileName, file.getInputStream(), objectMetadata);
		return fileName;
	}

	// public Resource readImageFromS3(String fiQlePath) {
	// 	try (S3Object s3Object = s3Client.getObject(bucketName, filePath)) {
	// 		// S3에서 가 져온 객체(파일)를 ByteArrayResource로 변환
	// 		return new ByteArrayResource(s3Object.getObjectContent().readAllBytes());
	// 	} catch (IOException e) {
	// 		e.printStackTrace();
	// 		return null;
	// 	}
	// }

}