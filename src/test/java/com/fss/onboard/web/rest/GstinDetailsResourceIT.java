package com.fss.onboard.web.rest;

import com.fss.onboard.MerchantEngineApp;
import com.fss.onboard.domain.GstinDetails;
import com.fss.onboard.repository.GstinDetailsRepository;

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
 * Integration tests for the {@link GstinDetailsResource} REST controller.
 */
@SpringBootTest(classes = MerchantEngineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class GstinDetailsResourceIT {

    private static final String DEFAULT_GSTIN = "AAAAAAAAAA";
    private static final String UPDATED_GSTIN = "BBBBBBBBBB";

    private static final String DEFAULT_CONSENT = "AAAAAAAAAA";
    private static final String UPDATED_CONSENT = "BBBBBBBBBB";

    private static final String DEFAULT_MID = "AAAAAAAAAA";
    private static final String UPDATED_MID = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    @Autowired
    private GstinDetailsRepository gstinDetailsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGstinDetailsMockMvc;

    private GstinDetails gstinDetails;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GstinDetails createEntity(EntityManager em) {
        GstinDetails gstinDetails = new GstinDetails()
            .gstin(DEFAULT_GSTIN)
            .consent(DEFAULT_CONSENT)
            .mid(DEFAULT_MID)
            .status(DEFAULT_STATUS);
        return gstinDetails;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GstinDetails createUpdatedEntity(EntityManager em) {
        GstinDetails gstinDetails = new GstinDetails()
            .gstin(UPDATED_GSTIN)
            .consent(UPDATED_CONSENT)
            .mid(UPDATED_MID)
            .status(UPDATED_STATUS);
        return gstinDetails;
    }

    @BeforeEach
    public void initTest() {
        gstinDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createGstinDetails() throws Exception {
        int databaseSizeBeforeCreate = gstinDetailsRepository.findAll().size();
        // Create the GstinDetails
        restGstinDetailsMockMvc.perform(post("/api/gstin-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gstinDetails)))
            .andExpect(status().isCreated());

        // Validate the GstinDetails in the database
        List<GstinDetails> gstinDetailsList = gstinDetailsRepository.findAll();
        assertThat(gstinDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        GstinDetails testGstinDetails = gstinDetailsList.get(gstinDetailsList.size() - 1);
        assertThat(testGstinDetails.getGstin()).isEqualTo(DEFAULT_GSTIN);
        assertThat(testGstinDetails.getConsent()).isEqualTo(DEFAULT_CONSENT);
        assertThat(testGstinDetails.getMid()).isEqualTo(DEFAULT_MID);
        assertThat(testGstinDetails.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createGstinDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gstinDetailsRepository.findAll().size();

        // Create the GstinDetails with an existing ID
        gstinDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGstinDetailsMockMvc.perform(post("/api/gstin-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gstinDetails)))
            .andExpect(status().isBadRequest());

        // Validate the GstinDetails in the database
        List<GstinDetails> gstinDetailsList = gstinDetailsRepository.findAll();
        assertThat(gstinDetailsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGstinDetails() throws Exception {
        // Initialize the database
        gstinDetailsRepository.saveAndFlush(gstinDetails);

        // Get all the gstinDetailsList
        restGstinDetailsMockMvc.perform(get("/api/gstin-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gstinDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].gstin").value(hasItem(DEFAULT_GSTIN)))
            .andExpect(jsonPath("$.[*].consent").value(hasItem(DEFAULT_CONSENT)))
            .andExpect(jsonPath("$.[*].mid").value(hasItem(DEFAULT_MID)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }
    
    @Test
    @Transactional
    public void getGstinDetails() throws Exception {
        // Initialize the database
        gstinDetailsRepository.saveAndFlush(gstinDetails);

        // Get the gstinDetails
        restGstinDetailsMockMvc.perform(get("/api/gstin-details/{id}", gstinDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(gstinDetails.getId().intValue()))
            .andExpect(jsonPath("$.gstin").value(DEFAULT_GSTIN))
            .andExpect(jsonPath("$.consent").value(DEFAULT_CONSENT))
            .andExpect(jsonPath("$.mid").value(DEFAULT_MID))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }
    @Test
    @Transactional
    public void getNonExistingGstinDetails() throws Exception {
        // Get the gstinDetails
        restGstinDetailsMockMvc.perform(get("/api/gstin-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGstinDetails() throws Exception {
        // Initialize the database
        gstinDetailsRepository.saveAndFlush(gstinDetails);

        int databaseSizeBeforeUpdate = gstinDetailsRepository.findAll().size();

        // Update the gstinDetails
        GstinDetails updatedGstinDetails = gstinDetailsRepository.findById(gstinDetails.getId()).get();
        // Disconnect from session so that the updates on updatedGstinDetails are not directly saved in db
        em.detach(updatedGstinDetails);
        updatedGstinDetails
            .gstin(UPDATED_GSTIN)
            .consent(UPDATED_CONSENT)
            .mid(UPDATED_MID)
            .status(UPDATED_STATUS);

        restGstinDetailsMockMvc.perform(put("/api/gstin-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGstinDetails)))
            .andExpect(status().isOk());

        // Validate the GstinDetails in the database
        List<GstinDetails> gstinDetailsList = gstinDetailsRepository.findAll();
        assertThat(gstinDetailsList).hasSize(databaseSizeBeforeUpdate);
        GstinDetails testGstinDetails = gstinDetailsList.get(gstinDetailsList.size() - 1);
        assertThat(testGstinDetails.getGstin()).isEqualTo(UPDATED_GSTIN);
        assertThat(testGstinDetails.getConsent()).isEqualTo(UPDATED_CONSENT);
        assertThat(testGstinDetails.getMid()).isEqualTo(UPDATED_MID);
        assertThat(testGstinDetails.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingGstinDetails() throws Exception {
        int databaseSizeBeforeUpdate = gstinDetailsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGstinDetailsMockMvc.perform(put("/api/gstin-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gstinDetails)))
            .andExpect(status().isBadRequest());

        // Validate the GstinDetails in the database
        List<GstinDetails> gstinDetailsList = gstinDetailsRepository.findAll();
        assertThat(gstinDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGstinDetails() throws Exception {
        // Initialize the database
        gstinDetailsRepository.saveAndFlush(gstinDetails);

        int databaseSizeBeforeDelete = gstinDetailsRepository.findAll().size();

        // Delete the gstinDetails
        restGstinDetailsMockMvc.perform(delete("/api/gstin-details/{id}", gstinDetails.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GstinDetails> gstinDetailsList = gstinDetailsRepository.findAll();
        assertThat(gstinDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
