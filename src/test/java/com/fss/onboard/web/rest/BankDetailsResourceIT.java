package com.fss.onboard.web.rest;

import com.fss.onboard.MerchantEngineApp;
import com.fss.onboard.domain.BankDetails;
import com.fss.onboard.repository.BankDetailsRepository;

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
 * Integration tests for the {@link BankDetailsResource} REST controller.
 */
@SpringBootTest(classes = MerchantEngineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BankDetailsResourceIT {

    private static final String DEFAULT_ACCOUNT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_I_FSC_CODE = "AAAAAAAAAA";
    private static final String UPDATED_I_FSC_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MID = "AAAAAAAAAA";
    private static final String UPDATED_MID = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    @Autowired
    private BankDetailsRepository bankDetailsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBankDetailsMockMvc;

    private BankDetails bankDetails;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BankDetails createEntity(EntityManager em) {
        BankDetails bankDetails = new BankDetails()
            .accountNumber(DEFAULT_ACCOUNT_NUMBER)
            .iFSCCode(DEFAULT_I_FSC_CODE)
            .name(DEFAULT_NAME)
            .mid(DEFAULT_MID)
            .status(DEFAULT_STATUS);
        return bankDetails;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BankDetails createUpdatedEntity(EntityManager em) {
        BankDetails bankDetails = new BankDetails()
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .iFSCCode(UPDATED_I_FSC_CODE)
            .name(UPDATED_NAME)
            .mid(UPDATED_MID)
            .status(UPDATED_STATUS);
        return bankDetails;
    }

    @BeforeEach
    public void initTest() {
        bankDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createBankDetails() throws Exception {
        int databaseSizeBeforeCreate = bankDetailsRepository.findAll().size();
        // Create the BankDetails
        restBankDetailsMockMvc.perform(post("/api/bank-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bankDetails)))
            .andExpect(status().isCreated());

        // Validate the BankDetails in the database
        List<BankDetails> bankDetailsList = bankDetailsRepository.findAll();
        assertThat(bankDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        BankDetails testBankDetails = bankDetailsList.get(bankDetailsList.size() - 1);
        assertThat(testBankDetails.getAccountNumber()).isEqualTo(DEFAULT_ACCOUNT_NUMBER);
        assertThat(testBankDetails.getiFSCCode()).isEqualTo(DEFAULT_I_FSC_CODE);
        assertThat(testBankDetails.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBankDetails.getMid()).isEqualTo(DEFAULT_MID);
        assertThat(testBankDetails.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createBankDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bankDetailsRepository.findAll().size();

        // Create the BankDetails with an existing ID
        bankDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBankDetailsMockMvc.perform(post("/api/bank-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bankDetails)))
            .andExpect(status().isBadRequest());

        // Validate the BankDetails in the database
        List<BankDetails> bankDetailsList = bankDetailsRepository.findAll();
        assertThat(bankDetailsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBankDetails() throws Exception {
        // Initialize the database
        bankDetailsRepository.saveAndFlush(bankDetails);

        // Get all the bankDetailsList
        restBankDetailsMockMvc.perform(get("/api/bank-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bankDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].accountNumber").value(hasItem(DEFAULT_ACCOUNT_NUMBER)))
            .andExpect(jsonPath("$.[*].iFSCCode").value(hasItem(DEFAULT_I_FSC_CODE)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].mid").value(hasItem(DEFAULT_MID)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }
    
    @Test
    @Transactional
    public void getBankDetails() throws Exception {
        // Initialize the database
        bankDetailsRepository.saveAndFlush(bankDetails);

        // Get the bankDetails
        restBankDetailsMockMvc.perform(get("/api/bank-details/{id}", bankDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bankDetails.getId().intValue()))
            .andExpect(jsonPath("$.accountNumber").value(DEFAULT_ACCOUNT_NUMBER))
            .andExpect(jsonPath("$.iFSCCode").value(DEFAULT_I_FSC_CODE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.mid").value(DEFAULT_MID))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }
    @Test
    @Transactional
    public void getNonExistingBankDetails() throws Exception {
        // Get the bankDetails
        restBankDetailsMockMvc.perform(get("/api/bank-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBankDetails() throws Exception {
        // Initialize the database
        bankDetailsRepository.saveAndFlush(bankDetails);

        int databaseSizeBeforeUpdate = bankDetailsRepository.findAll().size();

        // Update the bankDetails
        BankDetails updatedBankDetails = bankDetailsRepository.findById(bankDetails.getId()).get();
        // Disconnect from session so that the updates on updatedBankDetails are not directly saved in db
        em.detach(updatedBankDetails);
        updatedBankDetails
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .iFSCCode(UPDATED_I_FSC_CODE)
            .name(UPDATED_NAME)
            .mid(UPDATED_MID)
            .status(UPDATED_STATUS);

        restBankDetailsMockMvc.perform(put("/api/bank-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBankDetails)))
            .andExpect(status().isOk());

        // Validate the BankDetails in the database
        List<BankDetails> bankDetailsList = bankDetailsRepository.findAll();
        assertThat(bankDetailsList).hasSize(databaseSizeBeforeUpdate);
        BankDetails testBankDetails = bankDetailsList.get(bankDetailsList.size() - 1);
        assertThat(testBankDetails.getAccountNumber()).isEqualTo(UPDATED_ACCOUNT_NUMBER);
        assertThat(testBankDetails.getiFSCCode()).isEqualTo(UPDATED_I_FSC_CODE);
        assertThat(testBankDetails.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBankDetails.getMid()).isEqualTo(UPDATED_MID);
        assertThat(testBankDetails.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingBankDetails() throws Exception {
        int databaseSizeBeforeUpdate = bankDetailsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBankDetailsMockMvc.perform(put("/api/bank-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bankDetails)))
            .andExpect(status().isBadRequest());

        // Validate the BankDetails in the database
        List<BankDetails> bankDetailsList = bankDetailsRepository.findAll();
        assertThat(bankDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBankDetails() throws Exception {
        // Initialize the database
        bankDetailsRepository.saveAndFlush(bankDetails);

        int databaseSizeBeforeDelete = bankDetailsRepository.findAll().size();

        // Delete the bankDetails
        restBankDetailsMockMvc.perform(delete("/api/bank-details/{id}", bankDetails.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BankDetails> bankDetailsList = bankDetailsRepository.findAll();
        assertThat(bankDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
