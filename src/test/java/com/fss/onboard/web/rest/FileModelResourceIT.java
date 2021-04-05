package com.fss.onboard.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import javax.persistence.EntityManager;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import com.fss.onboard.MerchantEngineApp;
import com.fss.onboard.domain.FileModel;
import com.fss.onboard.repository.FileModelRepository;

/**
 * Integration tests for the {@link FileModelResource} REST controller.
 */
@SpringBootTest(classes = MerchantEngineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class FileModelResourceIT {

    private static final String DEFAULT_FILE_ID = "AAAAAAAAAA";
    private static final String UPDATED_FILE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_FILE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FILE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_FILE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_FILE_TYPE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE_DATA = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE_DATA = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_DATA_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_DATA_CONTENT_TYPE = "image/png";

    @Autowired
    private FileModelRepository fileModelRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFileModelMockMvc;

    private FileModel fileModel;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FileModel createEntity(EntityManager em) {
        FileModel fileModel = new FileModel(null, null)
            .fileName(DEFAULT_FILE_NAME)
            .fileType(DEFAULT_FILE_TYPE)
            .imageData(DEFAULT_IMAGE_DATA)
            .imageDataContentType(DEFAULT_IMAGE_DATA_CONTENT_TYPE);
        return fileModel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FileModel createUpdatedEntity(EntityManager em) {
        FileModel fileModel = new FileModel(null, null, null)
            .fileName(UPDATED_FILE_NAME)
            .fileType(UPDATED_FILE_TYPE)
            .imageData(UPDATED_IMAGE_DATA)
            .imageDataContentType(UPDATED_IMAGE_DATA_CONTENT_TYPE);
        return fileModel;
    }

    @BeforeEach
    public void initTest() {
        fileModel = createEntity(em);
    }

    @Test
    @Transactional
    public void createFileModel() throws Exception {
        int databaseSizeBeforeCreate = fileModelRepository.findAll().size();
        // Create the FileModel
        restFileModelMockMvc.perform(post("/api/file-models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fileModel)))
            .andExpect(status().isCreated());

        // Validate the FileModel in the database
        List<FileModel> fileModelList = fileModelRepository.findAll();
        assertThat(fileModelList).hasSize(databaseSizeBeforeCreate + 1);
        FileModel testFileModel = fileModelList.get(fileModelList.size() - 1);
        assertThat(testFileModel.getFileName()).isEqualTo(DEFAULT_FILE_NAME);
        assertThat(testFileModel.getFileType()).isEqualTo(DEFAULT_FILE_TYPE);
        assertThat(testFileModel.getImageData()).isEqualTo(DEFAULT_IMAGE_DATA);
        assertThat(testFileModel.getImageDataContentType()).isEqualTo(DEFAULT_IMAGE_DATA_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createFileModelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fileModelRepository.findAll().size();

        // Create the FileModel with an existing ID
        fileModel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFileModelMockMvc.perform(post("/api/file-models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fileModel)))
            .andExpect(status().isBadRequest());

        // Validate the FileModel in the database
        List<FileModel> fileModelList = fileModelRepository.findAll();
        assertThat(fileModelList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFileModels() throws Exception {
        // Initialize the database
        fileModelRepository.saveAndFlush(fileModel);

        // Get all the fileModelList
        restFileModelMockMvc.perform(get("/api/file-models?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fileModel.getId().intValue())))
            .andExpect(jsonPath("$.[*].fileId").value(hasItem(DEFAULT_FILE_ID)))
            .andExpect(jsonPath("$.[*].fileName").value(hasItem(DEFAULT_FILE_NAME)))
            .andExpect(jsonPath("$.[*].fileType").value(hasItem(DEFAULT_FILE_TYPE)))
            .andExpect(jsonPath("$.[*].imageDataContentType").value(hasItem(DEFAULT_IMAGE_DATA_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imageData").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE_DATA))));
    }
    
    @Test
    @Transactional
    public void getFileModel() throws Exception {
        // Initialize the database
        fileModelRepository.saveAndFlush(fileModel);

        // Get the fileModel
        restFileModelMockMvc.perform(get("/api/file-models/{id}", fileModel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fileModel.getId().intValue()))
            .andExpect(jsonPath("$.fileId").value(DEFAULT_FILE_ID))
            .andExpect(jsonPath("$.fileName").value(DEFAULT_FILE_NAME))
            .andExpect(jsonPath("$.fileType").value(DEFAULT_FILE_TYPE))
            .andExpect(jsonPath("$.imageDataContentType").value(DEFAULT_IMAGE_DATA_CONTENT_TYPE))
            .andExpect(jsonPath("$.imageData").value(Base64Utils.encodeToString(DEFAULT_IMAGE_DATA)));
    }
    @Test
    @Transactional
    public void getNonExistingFileModel() throws Exception {
        // Get the fileModel
        restFileModelMockMvc.perform(get("/api/file-models/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFileModel() throws Exception {
        // Initialize the database
        fileModelRepository.saveAndFlush(fileModel);

        int databaseSizeBeforeUpdate = fileModelRepository.findAll().size();

        // Update the fileModel
        FileModel updatedFileModel = fileModelRepository.findById(fileModel.getId()).get();
        // Disconnect from session so that the updates on updatedFileModel are not directly saved in db
        em.detach(updatedFileModel);
        updatedFileModel
            .fileName(UPDATED_FILE_NAME)
            .fileType(UPDATED_FILE_TYPE)
            .imageData(UPDATED_IMAGE_DATA)
            .imageDataContentType(UPDATED_IMAGE_DATA_CONTENT_TYPE);

        restFileModelMockMvc.perform(put("/api/file-models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFileModel)))
            .andExpect(status().isOk());

        // Validate the FileModel in the database
        List<FileModel> fileModelList = fileModelRepository.findAll();
        assertThat(fileModelList).hasSize(databaseSizeBeforeUpdate);
        FileModel testFileModel = fileModelList.get(fileModelList.size() - 1);
        assertThat(testFileModel.getFileName()).isEqualTo(UPDATED_FILE_NAME);
        assertThat(testFileModel.getFileType()).isEqualTo(UPDATED_FILE_TYPE);
        assertThat(testFileModel.getImageData()).isEqualTo(UPDATED_IMAGE_DATA);
        assertThat(testFileModel.getImageDataContentType()).isEqualTo(UPDATED_IMAGE_DATA_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingFileModel() throws Exception {
        int databaseSizeBeforeUpdate = fileModelRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFileModelMockMvc.perform(put("/api/file-models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fileModel)))
            .andExpect(status().isBadRequest());

        // Validate the FileModel in the database
        List<FileModel> fileModelList = fileModelRepository.findAll();
        assertThat(fileModelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFileModel() throws Exception {
        // Initialize the database
        fileModelRepository.saveAndFlush(fileModel);

        int databaseSizeBeforeDelete = fileModelRepository.findAll().size();

        // Delete the fileModel
        restFileModelMockMvc.perform(delete("/api/file-models/{id}", fileModel.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FileModel> fileModelList = fileModelRepository.findAll();
        assertThat(fileModelList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
