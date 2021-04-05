package com.fss.onboard.web.rest;

import com.fss.onboard.domain.FileModel;
import com.fss.onboard.domain.FileResponse;
import com.fss.onboard.repository.FileModelRepository;
import com.fss.onboard.service.FileService;
import com.fss.onboard.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing {@link com.fss.onboard.domain.FileModel}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FileModelResource {

    private final Logger log = LoggerFactory.getLogger(FileModelResource.class);

    private static final String ENTITY_NAME = "fileModel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FileModelRepository fileModelRepository;
    

	@Autowired
	FileService fileService;
	

    public FileModelResource(FileModelRepository fileModelRepository) {
        this.fileModelRepository = fileModelRepository;
    }

    /**
     * {@code POST  /file-models} : Create a new fileModel.
     *
     * @param fileModel the fileModel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fileModel, or with status {@code 400 (Bad Request)} if the fileModel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/file-models")
    public ResponseEntity<FileModel> createFileModel(@RequestBody FileModel fileModel) throws URISyntaxException {
        log.debug("REST request to save FileModel : {}", fileModel);
        if (fileModel.getId() != null) {
            throw new BadRequestAlertException("A new fileModel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FileModel result = fileModelRepository.save(fileModel);
        return ResponseEntity.created(new URI("/api/file-models/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /file-models} : Updates an existing fileModel.
     *
     * @param fileModel the fileModel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fileModel,
     * or with status {@code 400 (Bad Request)} if the fileModel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fileModel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/file-models")
    public ResponseEntity<FileModel> updateFileModel(@RequestBody FileModel fileModel) throws URISyntaxException {
        log.debug("REST request to update FileModel : {}", fileModel);
        if (fileModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FileModel result = fileModelRepository.save(fileModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fileModel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /file-models} : get all the fileModels.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fileModels in body.
     */
    @GetMapping("/file-models")
    public List<FileModel> getAllFileModels() {
        log.debug("REST request to get all FileModels");
        return fileModelRepository.findAll();
    }

    /**
     * {@code GET  /file-models/:id} : get the "id" fileModel.
     *
     * @param id the id of the fileModel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fileModel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/file-models/{id}")
    public ResponseEntity<FileModel> getFileModel(@PathVariable Long id) {
        log.debug("REST request to get FileModel : {}", id);
        Optional<FileModel> fileModel = fileModelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fileModel);
    }

    /**
     * {@code DELETE  /file-models/:id} : delete the "id" fileModel.
     *
     * @param id the id of the fileModel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/file-models/{id}")
    public ResponseEntity<Void> deleteFileModel(@PathVariable Long id) {
        log.debug("REST request to delete FileModel : {}", id);
        fileModelRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
    
    
    
    
    @PostMapping("/Upload")
	public FileResponse uploadFile(@RequestParam("file") MultipartFile file) {

		FileModel model = fileService.saveFile(file);
		String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/download/").path(model.getId().toString())
				.toUriString();
		return new FileResponse(model.getFileName(), model.getFileType(), fileUri, model.getId());
	}

	@PostMapping("/UploadMultipleFiles")
	public List<FileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
		return Arrays.asList(files).stream().map(file -> uploadFile(file)).collect(Collectors.toList());
	}

	@GetMapping("/Allfiles")
	public List<FileModel> getListFiles(Model model) {
		List<FileModel> fileDetails = fileService.getListOfFiles();

		return fileDetails;
	}
	
	
}
