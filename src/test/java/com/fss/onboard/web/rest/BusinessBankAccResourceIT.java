package com.fss.onboard.web.rest;

import com.fss.onboard.MerchantEngineApp;
import com.fss.onboard.domain.BusinessBankAcc;
import com.fss.onboard.repository.BusinessBankAccRepository;

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
 * Integration tests for the {@link BusinessBankAccResource} REST controller.
 */
@SpringBootTest(classes = MerchantEngineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BusinessBankAccResourceIT {

    private static final String DEFAULT_ACCOUNT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_IFSC_CODE = "AAAAAAAAAA";
    private static final String UPDATED_IFSC_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_ACCOUNT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_NAME = "BBBBBBBBBB";

    @Autowired
    private BusinessBankAccRepository businessBankAccRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBusinessBankAccMockMvc;

    private BusinessBankAcc businessBankAcc;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BusinessBankAcc createEntity(EntityManager em) {
        BusinessBankAcc businessBankAcc = new BusinessBankAcc()
            .accountNumber(DEFAULT_ACCOUNT_NUMBER)
            .ifscCode(DEFAULT_IFSC_CODE)
            .accountName(DEFAULT_ACCOUNT_NAME);
        return businessBankAcc;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BusinessBankAcc createUpdatedEntity(EntityManager em) {
        BusinessBankAcc businessBankAcc = new BusinessBankAcc()
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .ifscCode(UPDATED_IFSC_CODE)
            .accountName(UPDATED_ACCOUNT_NAME);
        return businessBankAcc;
    }

    @BeforeEach
    public void initTest() {
        businessBankAcc = createEntity(em);
    }

    @Test
    @Transactional
    public void createBusinessBankAcc() throws Exception {
        int databaseSizeBeforeCreate = businessBankAccRepository.findAll().size();
        // Create the BusinessBankAcc
        restBusinessBankAccMockMvc.perform(post("/api/business-bank-accs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(businessBankAcc)))
            .andExpect(status().isCreated());

        // Validate the BusinessBankAcc in the database
        List<BusinessBankAcc> businessBankAccList = businessBankAccRepository.findAll();
        assertThat(businessBankAccList).hasSize(databaseSizeBeforeCreate + 1);
        BusinessBankAcc testBusinessBankAcc = businessBankAccList.get(businessBankAccList.size() - 1);
        assertThat(testBusinessBankAcc.getAccountNumber()).isEqualTo(DEFAULT_ACCOUNT_NUMBER);
        assertThat(testBusinessBankAcc.getIfscCode()).isEqualTo(DEFAULT_IFSC_CODE);
        assertThat(testBusinessBankAcc.getAccountName()).isEqualTo(DEFAULT_ACCOUNT_NAME);
    }

    @Test
    @Transactional
    public void createBusinessBankAccWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = businessBankAccRepository.findAll().size();

        // Create the BusinessBankAcc with an existing ID
        businessBankAcc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBusinessBankAccMockMvc.perform(post("/api/business-bank-accs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(businessBankAcc)))
            .andExpect(status().isBadRequest());

        // Validate the BusinessBankAcc in the database
        List<BusinessBankAcc> businessBankAccList = businessBankAccRepository.findAll();
        assertThat(businessBankAccList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBusinessBankAccs() throws Exception {
        // Initialize the database
        businessBankAccRepository.saveAndFlush(businessBankAcc);

        // Get all the businessBankAccList
        restBusinessBankAccMockMvc.perform(get("/api/business-bank-accs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(businessBankAcc.getId().intValue())))
            .andExpect(jsonPath("$.[*].accountNumber").value(hasItem(DEFAULT_ACCOUNT_NUMBER)))
            .andExpect(jsonPath("$.[*].ifscCode").value(hasItem(DEFAULT_IFSC_CODE)))
            .andExpect(jsonPath("$.[*].accountName").value(hasItem(DEFAULT_ACCOUNT_NAME)));
    }
    
    @Test
    @Transactional
    public void getBusinessBankAcc() throws Exception {
        // Initialize the database
        businessBankAccRepository.saveAndFlush(businessBankAcc);

        // Get the businessBankAcc
        restBusinessBankAccMockMvc.perform(get("/api/business-bank-accs/{id}", businessBankAcc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(businessBankAcc.getId().intValue()))
            .andExpect(jsonPath("$.accountNumber").value(DEFAULT_ACCOUNT_NUMBER))
            .andExpect(jsonPath("$.ifscCode").value(DEFAULT_IFSC_CODE))
            .andExpect(jsonPath("$.accountName").value(DEFAULT_ACCOUNT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingBusinessBankAcc() throws Exception {
        // Get the businessBankAcc
        restBusinessBankAccMockMvc.perform(get("/api/business-bank-accs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBusinessBankAcc() throws Exception {
        // Initialize the database
        businessBankAccRepository.saveAndFlush(businessBankAcc);

        int databaseSizeBeforeUpdate = businessBankAccRepository.findAll().size();

        // Update the businessBankAcc
        BusinessBankAcc updatedBusinessBankAcc = businessBankAccRepository.findById(businessBankAcc.getId()).get();
        // Disconnect from session so that the updates on updatedBusinessBankAcc are not directly saved in db
        em.detach(updatedBusinessBankAcc);
        updatedBusinessBankAcc
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .ifscCode(UPDATED_IFSC_CODE)
            .accountName(UPDATED_ACCOUNT_NAME);

        restBusinessBankAccMockMvc.perform(put("/api/business-bank-accs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBusinessBankAcc)))
            .andExpect(status().isOk());

        // Validate the BusinessBankAcc in the database
        List<BusinessBankAcc> businessBankAccList = businessBankAccRepository.findAll();
        assertThat(businessBankAccList).hasSize(databaseSizeBeforeUpdate);
        BusinessBankAcc testBusinessBankAcc = businessBankAccList.get(businessBankAccList.size() - 1);
        assertThat(testBusinessBankAcc.getAccountNumber()).isEqualTo(UPDATED_ACCOUNT_NUMBER);
        assertThat(testBusinessBankAcc.getIfscCode()).isEqualTo(UPDATED_IFSC_CODE);
        assertThat(testBusinessBankAcc.getAccountName()).isEqualTo(UPDATED_ACCOUNT_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingBusinessBankAcc() throws Exception {
        int databaseSizeBeforeUpdate = businessBankAccRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBusinessBankAccMockMvc.perform(put("/api/business-bank-accs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(businessBankAcc)))
            .andExpect(status().isBadRequest());

        // Validate the BusinessBankAcc in the database
        List<BusinessBankAcc> businessBankAccList = businessBankAccRepository.findAll();
        assertThat(businessBankAccList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBusinessBankAcc() throws Exception {
        // Initialize the database
        businessBankAccRepository.saveAndFlush(businessBankAcc);

        int databaseSizeBeforeDelete = businessBankAccRepository.findAll().size();

        // Delete the businessBankAcc
        restBusinessBankAccMockMvc.perform(delete("/api/business-bank-accs/{id}", businessBankAcc.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BusinessBankAcc> businessBankAccList = businessBankAccRepository.findAll();
        assertThat(businessBankAccList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
