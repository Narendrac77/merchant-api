package com.fss.onboard.web.rest;

import com.fss.onboard.MerchantEngineApp;
import com.fss.onboard.domain.PanDetails;
import com.fss.onboard.repository.PanDetailsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PanDetailsResource} REST controller.
 */
@SpringBootTest(classes = MerchantEngineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PanDetailsResourceIT {

    private static final String DEFAULT_PAN_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PAN_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_CONSENT = "AAAAAAAAAA";
    private static final String UPDATED_CONSENT = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MID = "AAAAAAAAAA";
    private static final String UPDATED_MID = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    @Autowired
    private PanDetailsRepository panDetailsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPanDetailsMockMvc;

    private PanDetails panDetails;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PanDetails createEntity(EntityManager em) {
        PanDetails panDetails = new PanDetails()
            .panNumber(DEFAULT_PAN_NUMBER)
            .consent(DEFAULT_CONSENT)
            .name(DEFAULT_NAME)
            .mid(DEFAULT_MID)
            .status(DEFAULT_STATUS);
        return panDetails;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PanDetails createUpdatedEntity(EntityManager em) {
        PanDetails panDetails = new PanDetails()
            .panNumber(UPDATED_PAN_NUMBER)
            .consent(UPDATED_CONSENT)
            .name(UPDATED_NAME)
            .mid(UPDATED_MID)
            .status(UPDATED_STATUS);
        return panDetails;
    }

    @BeforeEach
    public void initTest() {
        panDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createPanDetails() throws Exception {
        int databaseSizeBeforeCreate = panDetailsRepository.findAll().size();
        // Create the PanDetails
        restPanDetailsMockMvc.perform(post("/api/pan-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(panDetails)))
            .andExpect(status().isCreated());

        // Validate the PanDetails in the database
        List<PanDetails> panDetailsList = panDetailsRepository.findAll();
        assertThat(panDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        PanDetails testPanDetails = panDetailsList.get(panDetailsList.size() - 1);
        assertThat(testPanDetails.getPanNumber()).isEqualTo(DEFAULT_PAN_NUMBER);
        assertThat(testPanDetails.getConsent()).isEqualTo(DEFAULT_CONSENT);
        assertThat(testPanDetails.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPanDetails.getMid()).isEqualTo(DEFAULT_MID);
        assertThat(testPanDetails.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createPanDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = panDetailsRepository.findAll().size();

        // Create the PanDetails with an existing ID
        panDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPanDetailsMockMvc.perform(post("/api/pan-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(panDetails)))
            .andExpect(status().isBadRequest());

        // Validate the PanDetails in the database
        List<PanDetails> panDetailsList = panDetailsRepository.findAll();
        assertThat(panDetailsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPanDetails() throws Exception {
        // Initialize the database
        panDetailsRepository.saveAndFlush(panDetails);

        // Get all the panDetailsList
        restPanDetailsMockMvc.perform(get("/api/pan-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(panDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].panNumber").value(hasItem(DEFAULT_PAN_NUMBER)))
            .andExpect(jsonPath("$.[*].consent").value(hasItem(DEFAULT_CONSENT)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].mid").value(hasItem(DEFAULT_MID)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }
    
    @Test
    @Transactional
    public void getPanDetails() throws Exception {
        // Initialize the database
        panDetailsRepository.saveAndFlush(panDetails);

        // Get the panDetails
        restPanDetailsMockMvc.perform(get("/api/pan-details/{id}", panDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(panDetails.getId().intValue()))
            .andExpect(jsonPath("$.panNumber").value(DEFAULT_PAN_NUMBER))
            .andExpect(jsonPath("$.consent").value(DEFAULT_CONSENT))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.mid").value(DEFAULT_MID))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }
    @Test
    @Transactional
    public void getNonExistingPanDetails() throws Exception {
        // Get the panDetails
        restPanDetailsMockMvc.perform(get("/api/pan-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePanDetails() throws Exception {
        // Initialize the database
        panDetailsRepository.saveAndFlush(panDetails);

        int databaseSizeBeforeUpdate = panDetailsRepository.findAll().size();

        // Update the panDetails
        PanDetails updatedPanDetails = panDetailsRepository.findById(panDetails.getId()).get();
        // Disconnect from session so that the updates on updatedPanDetails are not directly saved in db
        em.detach(updatedPanDetails);
        updatedPanDetails
            .panNumber(UPDATED_PAN_NUMBER)
            .consent(UPDATED_CONSENT)
            .name(UPDATED_NAME)
            .mid(UPDATED_MID)
            .status(UPDATED_STATUS);

        restPanDetailsMockMvc.perform(put("/api/pan-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPanDetails)))
            .andExpect(status().isOk());

        // Validate the PanDetails in the database
        List<PanDetails> panDetailsList = panDetailsRepository.findAll();
        assertThat(panDetailsList).hasSize(databaseSizeBeforeUpdate);
        PanDetails testPanDetails = panDetailsList.get(panDetailsList.size() - 1);
        assertThat(testPanDetails.getPanNumber()).isEqualTo(UPDATED_PAN_NUMBER);
        assertThat(testPanDetails.getConsent()).isEqualTo(UPDATED_CONSENT);
        assertThat(testPanDetails.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPanDetails.getMid()).isEqualTo(UPDATED_MID);
        assertThat(testPanDetails.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingPanDetails() throws Exception {
        int databaseSizeBeforeUpdate = panDetailsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPanDetailsMockMvc.perform(put("/api/pan-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(panDetails)))
            .andExpect(status().isBadRequest());

        // Validate the PanDetails in the database
        List<PanDetails> panDetailsList = panDetailsRepository.findAll();
        assertThat(panDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePanDetails() throws Exception {
        // Initialize the database
        panDetailsRepository.saveAndFlush(panDetails);

        int databaseSizeBeforeDelete = panDetailsRepository.findAll().size();

        // Delete the panDetails
        restPanDetailsMockMvc.perform(delete("/api/pan-details/{id}", panDetails.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PanDetails> panDetailsList = panDetailsRepository.findAll();
        assertThat(panDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
