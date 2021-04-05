package com.fss.onboard.web.rest;

import com.fss.onboard.MerchantEngineApp;
import com.fss.onboard.domain.Verification;
import com.fss.onboard.repository.VerificationRepository;

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
 * Integration tests for the {@link VerificationResource} REST controller.
 */
@SpringBootTest(classes = MerchantEngineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class VerificationResourceIT {

    private static final String DEFAULT_MID = "AAAAAAAAAA";
    private static final String UPDATED_MID = "BBBBBBBBBB";

    private static final String DEFAULT_PAN_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_PAN_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_BANK_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_BANK_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_GSTIN_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_GSTIN_STATUS = "BBBBBBBBBB";

    @Autowired
    private VerificationRepository verificationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVerificationMockMvc;

    private Verification verification;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Verification createEntity(EntityManager em) {
        Verification verification = new Verification()
            .mid(DEFAULT_MID)
            .panStatus(DEFAULT_PAN_STATUS)
            .bankStatus(DEFAULT_BANK_STATUS)
            .gstinStatus(DEFAULT_GSTIN_STATUS);
        return verification;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Verification createUpdatedEntity(EntityManager em) {
        Verification verification = new Verification()
            .mid(UPDATED_MID)
            .panStatus(UPDATED_PAN_STATUS)
            .bankStatus(UPDATED_BANK_STATUS)
            .gstinStatus(UPDATED_GSTIN_STATUS);
        return verification;
    }

    @BeforeEach
    public void initTest() {
        verification = createEntity(em);
    }

    @Test
    @Transactional
    public void createVerification() throws Exception {
        int databaseSizeBeforeCreate = verificationRepository.findAll().size();
        // Create the Verification
        restVerificationMockMvc.perform(post("/api/verifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(verification)))
            .andExpect(status().isCreated());

        // Validate the Verification in the database
        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeCreate + 1);
        Verification testVerification = verificationList.get(verificationList.size() - 1);
        assertThat(testVerification.getMid()).isEqualTo(DEFAULT_MID);
        assertThat(testVerification.getPanStatus()).isEqualTo(DEFAULT_PAN_STATUS);
        assertThat(testVerification.getBankStatus()).isEqualTo(DEFAULT_BANK_STATUS);
        assertThat(testVerification.getGstinStatus()).isEqualTo(DEFAULT_GSTIN_STATUS);
    }

    @Test
    @Transactional
    public void createVerificationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = verificationRepository.findAll().size();

        // Create the Verification with an existing ID
        verification.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVerificationMockMvc.perform(post("/api/verifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(verification)))
            .andExpect(status().isBadRequest());

        // Validate the Verification in the database
        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllVerifications() throws Exception {
        // Initialize the database
        verificationRepository.saveAndFlush(verification);

        // Get all the verificationList
        restVerificationMockMvc.perform(get("/api/verifications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(verification.getId().intValue())))
            .andExpect(jsonPath("$.[*].mid").value(hasItem(DEFAULT_MID)))
            .andExpect(jsonPath("$.[*].panStatus").value(hasItem(DEFAULT_PAN_STATUS)))
            .andExpect(jsonPath("$.[*].bankStatus").value(hasItem(DEFAULT_BANK_STATUS)))
            .andExpect(jsonPath("$.[*].gstinStatus").value(hasItem(DEFAULT_GSTIN_STATUS)));
    }
    
    @Test
    @Transactional
    public void getVerification() throws Exception {
        // Initialize the database
        verificationRepository.saveAndFlush(verification);

        // Get the verification
        restVerificationMockMvc.perform(get("/api/verifications/{id}", verification.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(verification.getId().intValue()))
            .andExpect(jsonPath("$.mid").value(DEFAULT_MID))
            .andExpect(jsonPath("$.panStatus").value(DEFAULT_PAN_STATUS))
            .andExpect(jsonPath("$.bankStatus").value(DEFAULT_BANK_STATUS))
            .andExpect(jsonPath("$.gstinStatus").value(DEFAULT_GSTIN_STATUS));
    }
    @Test
    @Transactional
    public void getNonExistingVerification() throws Exception {
        // Get the verification
        restVerificationMockMvc.perform(get("/api/verifications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVerification() throws Exception {
        // Initialize the database
        verificationRepository.saveAndFlush(verification);

        int databaseSizeBeforeUpdate = verificationRepository.findAll().size();

        // Update the verification
        Verification updatedVerification = verificationRepository.findById(verification.getId()).get();
        // Disconnect from session so that the updates on updatedVerification are not directly saved in db
        em.detach(updatedVerification);
        updatedVerification
            .mid(UPDATED_MID)
            .panStatus(UPDATED_PAN_STATUS)
            .bankStatus(UPDATED_BANK_STATUS)
            .gstinStatus(UPDATED_GSTIN_STATUS);

        restVerificationMockMvc.perform(put("/api/verifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedVerification)))
            .andExpect(status().isOk());

        // Validate the Verification in the database
        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeUpdate);
        Verification testVerification = verificationList.get(verificationList.size() - 1);
        assertThat(testVerification.getMid()).isEqualTo(UPDATED_MID);
        assertThat(testVerification.getPanStatus()).isEqualTo(UPDATED_PAN_STATUS);
        assertThat(testVerification.getBankStatus()).isEqualTo(UPDATED_BANK_STATUS);
        assertThat(testVerification.getGstinStatus()).isEqualTo(UPDATED_GSTIN_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingVerification() throws Exception {
        int databaseSizeBeforeUpdate = verificationRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVerificationMockMvc.perform(put("/api/verifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(verification)))
            .andExpect(status().isBadRequest());

        // Validate the Verification in the database
        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVerification() throws Exception {
        // Initialize the database
        verificationRepository.saveAndFlush(verification);

        int databaseSizeBeforeDelete = verificationRepository.findAll().size();

        // Delete the verification
        restVerificationMockMvc.perform(delete("/api/verifications/{id}", verification.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
