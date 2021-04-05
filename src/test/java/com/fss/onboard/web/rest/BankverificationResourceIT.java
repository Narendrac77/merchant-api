package com.fss.onboard.web.rest;

import com.fss.onboard.MerchantEngineApp;
import com.fss.onboard.domain.Bankverification;
import com.fss.onboard.repository.BankverificationRepository;

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
 * Integration tests for the {@link BankverificationResource} REST controller.
 */
@SpringBootTest(classes = MerchantEngineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BankverificationResourceIT {

    private static final Integer DEFAULT_BANKVERIFICATION_ID = 1;
    private static final Integer UPDATED_BANKVERIFICATION_ID = 2;

    @Autowired
    private BankverificationRepository bankverificationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBankverificationMockMvc;

    private Bankverification bankverification;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bankverification createEntity(EntityManager em) {
        Bankverification bankverification = new Bankverification()
            .bankverificationId(DEFAULT_BANKVERIFICATION_ID);
        return bankverification;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bankverification createUpdatedEntity(EntityManager em) {
        Bankverification bankverification = new Bankverification()
            .bankverificationId(UPDATED_BANKVERIFICATION_ID);
        return bankverification;
    }

    @BeforeEach
    public void initTest() {
        bankverification = createEntity(em);
    }

    @Test
    @Transactional
    public void createBankverification() throws Exception {
        int databaseSizeBeforeCreate = bankverificationRepository.findAll().size();
        // Create the Bankverification
        restBankverificationMockMvc.perform(post("/api/bankverifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bankverification)))
            .andExpect(status().isCreated());

        // Validate the Bankverification in the database
        List<Bankverification> bankverificationList = bankverificationRepository.findAll();
        assertThat(bankverificationList).hasSize(databaseSizeBeforeCreate + 1);
        Bankverification testBankverification = bankverificationList.get(bankverificationList.size() - 1);
        assertThat(testBankverification.getBankverificationId()).isEqualTo(DEFAULT_BANKVERIFICATION_ID);
    }

    @Test
    @Transactional
    public void createBankverificationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bankverificationRepository.findAll().size();

        // Create the Bankverification with an existing ID
        bankverification.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBankverificationMockMvc.perform(post("/api/bankverifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bankverification)))
            .andExpect(status().isBadRequest());

        // Validate the Bankverification in the database
        List<Bankverification> bankverificationList = bankverificationRepository.findAll();
        assertThat(bankverificationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBankverifications() throws Exception {
        // Initialize the database
        bankverificationRepository.saveAndFlush(bankverification);

        // Get all the bankverificationList
        restBankverificationMockMvc.perform(get("/api/bankverifications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bankverification.getId().intValue())))
            .andExpect(jsonPath("$.[*].bankverificationId").value(hasItem(DEFAULT_BANKVERIFICATION_ID)));
    }
    
    @Test
    @Transactional
    public void getBankverification() throws Exception {
        // Initialize the database
        bankverificationRepository.saveAndFlush(bankverification);

        // Get the bankverification
        restBankverificationMockMvc.perform(get("/api/bankverifications/{id}", bankverification.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bankverification.getId().intValue()))
            .andExpect(jsonPath("$.bankverificationId").value(DEFAULT_BANKVERIFICATION_ID));
    }
    @Test
    @Transactional
    public void getNonExistingBankverification() throws Exception {
        // Get the bankverification
        restBankverificationMockMvc.perform(get("/api/bankverifications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBankverification() throws Exception {
        // Initialize the database
        bankverificationRepository.saveAndFlush(bankverification);

        int databaseSizeBeforeUpdate = bankverificationRepository.findAll().size();

        // Update the bankverification
        Bankverification updatedBankverification = bankverificationRepository.findById(bankverification.getId()).get();
        // Disconnect from session so that the updates on updatedBankverification are not directly saved in db
        em.detach(updatedBankverification);
        updatedBankverification
            .bankverificationId(UPDATED_BANKVERIFICATION_ID);

        restBankverificationMockMvc.perform(put("/api/bankverifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBankverification)))
            .andExpect(status().isOk());

        // Validate the Bankverification in the database
        List<Bankverification> bankverificationList = bankverificationRepository.findAll();
        assertThat(bankverificationList).hasSize(databaseSizeBeforeUpdate);
        Bankverification testBankverification = bankverificationList.get(bankverificationList.size() - 1);
        assertThat(testBankverification.getBankverificationId()).isEqualTo(UPDATED_BANKVERIFICATION_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingBankverification() throws Exception {
        int databaseSizeBeforeUpdate = bankverificationRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBankverificationMockMvc.perform(put("/api/bankverifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bankverification)))
            .andExpect(status().isBadRequest());

        // Validate the Bankverification in the database
        List<Bankverification> bankverificationList = bankverificationRepository.findAll();
        assertThat(bankverificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBankverification() throws Exception {
        // Initialize the database
        bankverificationRepository.saveAndFlush(bankverification);

        int databaseSizeBeforeDelete = bankverificationRepository.findAll().size();

        // Delete the bankverification
        restBankverificationMockMvc.perform(delete("/api/bankverifications/{id}", bankverification.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Bankverification> bankverificationList = bankverificationRepository.findAll();
        assertThat(bankverificationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
