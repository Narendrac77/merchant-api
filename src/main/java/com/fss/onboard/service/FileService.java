package com.fss.onboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.fss.onboard.config.FileErrors;
import com.fss.onboard.domain.FileModel;
import com.fss.onboard.repository.FileModelRepository;
import com.fss.onboard.web.rest.errors.FileNotFoundException;
import com.fss.onboard.web.rest.errors.FileSaveException;

@Service
public class FileService {

	@Autowired
	FileModelRepository fileRepo;

	public FileModel saveFile(MultipartFile file) {

		String filename = StringUtils.cleanPath(file.getOriginalFilename());

		try {

			if (filename.contains("...")) {
				throw new FileSaveException(FileErrors.INVALID_FILE + filename);
			}

			FileModel model = new FileModel();

			model.setFileName(filename);
			model.setFileType(file.getContentType());
			model.setImageData(file.getBytes());

			return fileRepo.save(model);

		} catch (Exception e) {

			throw new FileSaveException(FileErrors.FILE_NOT_STORED, e);
		}

	}

	public FileModel getFile(Long fileId) {

		return fileRepo.findById(fileId)
				.orElseThrow(() -> new FileNotFoundException(FileErrors.FILE_NOT_FOUND + fileId));
	}

	public List<FileModel> getListOfFiles() {

		return fileRepo.findAll();
	}

}
