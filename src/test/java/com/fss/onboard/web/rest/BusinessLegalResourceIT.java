package com.fss.onboard.web.rest;

import com.fss.onboard.MerchantEngineApp;
import com.fss.onboard.domain.BusinessLegal;
import com.fss.onboard.repository.BusinessLegalRepository;

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
 * Integration tests for the {@link BusinessLegalResource} REST controller.
 */
@SpringBootTest(classes = MerchantEngineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BusinessLegalResourceIT {

    private static final String DEFAULT_LEGAL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LEGAL_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_REG_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_REG_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_INCORPORATION = "AAAAAAAAAA";
    private static final String UPDATED_INCORPORATION = "BBBBBBBBBB";

    private static final String DEFAULT_PAN_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PAN_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_GST_IN_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_GST_IN_NUMBER = "BBBBBBBBBB";

    @Autowired
    private BusinessLegalRepository businessLegalRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBusinessLegalMockMvc;

    private BusinessLegal businessLegal;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BusinessLegal createEntity(EntityManager em) {
        BusinessLegal businessLegal = new BusinessLegal()
            .legalName(DEFAULT_LEGAL_NAME)
            .regAddress(DEFAULT_REG_ADDRESS)
            .incorporation(DEFAULT_INCORPORATION)
            .panNumber(DEFAULT_PAN_NUMBER)
            .gstInNumber(DEFAULT_GST_IN_NUMBER);
        return businessLegal;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BusinessLegal createUpdatedEntity(EntityManager em) {
        BusinessLegal businessLegal = new BusinessLegal()
            .legalName(UPDATED_LEGAL_NAME)
            .regAddress(UPDATED_REG_ADDRESS)
            .incorporation(UPDATED_INCORPORATION)
            .panNumber(UPDATED_PAN_NUMBER)
            .gstInNumber(UPDATED_GST_IN_NUMBER);
        return businessLegal;
    }

    @BeforeEach
    public void initTest() {
        businessLegal = createEntity(em);
    }

    @Test
    @Transactional
    public void createBusinessLegal() throws Exception {
        int databaseSizeBeforeCreate = businessLegalRepository.findAll().size();
        // Create the BusinessLegal
        restBusinessLegalMockMvc.perform(post("/api/business-legals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(businessLegal)))
            .andExpect(status().isCreated());

        // Validate the BusinessLegal in the database
        List<BusinessLegal> businessLegalList = businessLegalRepository.findAll();
        assertThat(businessLegalList).hasSize(databaseSizeBeforeCreate + 1);
        BusinessLegal testBusinessLegal = businessLegalList.get(businessLegalList.size() - 1);
        assertThat(testBusinessLegal.getLegalName()).isEqualTo(DEFAULT_LEGAL_NAME);
        assertThat(testBusinessLegal.getRegAddress()).isEqualTo(DEFAULT_REG_ADDRESS);
        assertThat(testBusinessLegal.getIncorporation()).isEqualTo(DEFAULT_INCORPORATION);
        assertThat(testBusinessLegal.getPanNumber()).isEqualTo(DEFAULT_PAN_NUMBER);
        assertThat(testBusinessLegal.getGstInNumber()).isEqualTo(DEFAULT_GST_IN_NUMBER);
    }

    @Test
    @Transactional
    public void createBusinessLegalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = businessLegalRepository.findAll().size();

        // Create the BusinessLegal with an existing ID
        businessLegal.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBusinessLegalMockMvc.perform(post("/api/business-legals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(businessLegal)))
            .andExpect(status().isBadRequest());

        // Validate the BusinessLegal in the database
        List<BusinessLegal> businessLegalList = businessLegalRepository.findAll();
        assertThat(businessLegalList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBusinessLegals() throws Exception {
        // Initialize the database
        businessLegalRepository.saveAndFlush(businessLegal);

        // Get all the businessLegalList
        restBusinessLegalMockMvc.perform(get("/api/business-legals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(businessLegal.getId().intValue())))
            .andExpect(jsonPath("$.[*].legalName").value(hasItem(DEFAULT_LEGAL_NAME)))
            .andExpect(jsonPath("$.[*].regAddress").value(hasItem(DEFAULT_REG_ADDRESS)))
            .andExpect(jsonPath("$.[*].incorporation").value(hasItem(DEFAULT_INCORPORATION)))
            .andExpect(jsonPath("$.[*].panNumber").value(hasItem(DEFAULT_PAN_NUMBER)))
            .andExpect(jsonPath("$.[*].gstInNumber").value(hasItem(DEFAULT_GST_IN_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getBusinessLegal() throws Exception {
        // Initialize the database
        businessLegalRepository.saveAndFlush(businessLegal);

        // Get the businessLegal
        restBusinessLegalMockMvc.perform(get("/api/business-legals/{id}", businessLegal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(businessLegal.getId().intValue()))
            .andExpect(jsonPath("$.legalName").value(DEFAULT_LEGAL_NAME))
            .andExpect(jsonPath("$.regAddress").value(DEFAULT_REG_ADDRESS))
            .andExpect(jsonPath("$.incorporation").value(DEFAULT_INCORPORATION))
            .andExpect(jsonPath("$.panNumber").value(DEFAULT_PAN_NUMBER))
            .andExpect(jsonPath("$.gstInNumber").value(DEFAULT_GST_IN_NUMBER));
    }
    @Test
    @Transactional
    public void getNonExistingBusinessLegal() throws Exception {
        // Get the businessLegal
        restBusinessLegalMockMvc.perform(get("/api/business-legals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBusinessLegal() throws Exception {
        // Initialize the database
        businessLegalRepository.saveAndFlush(businessLegal);

        int databaseSizeBeforeUpdate = businessLegalRepository.findAll().size();

        // Update the businessLegal
        BusinessLegal updatedBusinessLegal = businessLegalRepository.findById(businessLegal.getId()).get();
        // Disconnect from session so that the updates on updatedBusinessLegal are not directly saved in db
        em.detach(updatedBusinessLegal);
        updatedBusinessLegal
            .legalName(UPDATED_LEGAL_NAME)
            .regAddress(UPDATED_REG_ADDRESS)
            .incorporation(UPDATED_INCORPORATION)
            .panNumber(UPDATED_PAN_NUMBER)
            .gstInNumber(UPDATED_GST_IN_NUMBER);

        restBusinessLegalMockMvc.perform(put("/api/business-legals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBusinessLegal)))
            .andExpect(status().isOk());

        // Validate the BusinessLegal in the database
        List<BusinessLegal> businessLegalList = businessLegalRepository.findAll();
        assertThat(businessLegalList).hasSize(databaseSizeBeforeUpdate);
        BusinessLegal testBusinessLegal = businessLegalList.get(businessLegalList.size() - 1);
        assertThat(testBusinessLegal.getLegalName()).isEqualTo(UPDATED_LEGAL_NAME);
        assertThat(testBusinessLegal.getRegAddress()).isEqualTo(UPDATED_REG_ADDRESS);
        assertThat(testBusinessLegal.getIncorporation()).isEqualTo(UPDATED_INCORPORATION);
        assertThat(testBusinessLegal.getPanNumber()).isEqualTo(UPDATED_PAN_NUMBER);
        assertThat(testBusinessLegal.getGstInNumber()).isEqualTo(UPDATED_GST_IN_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingBusinessLegal() throws Exception {
        int databaseSizeBeforeUpdate = businessLegalRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBusinessLegalMockMvc.perform(put("/api/business-legals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(businessLegal)))
            .andExpect(status().isBadRequest());

        // Validate the BusinessLegal in the database
        List<BusinessLegal> businessLegalList = businessLegalRepository.findAll();
        assertThat(businessLegalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBusinessLegal() throws Exception {
        // Initialize the database
        businessLegalRepository.saveAndFlush(businessLegal);

        int databaseSizeBeforeDelete = businessLegalRepository.findAll().size();

        // Delete the businessLegal
        restBusinessLegalMockMvc.perform(delete("/api/business-legals/{id}", businessLegal.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BusinessLegal> businessLegalList = businessLegalRepository.findAll();
        assertThat(businessLegalList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
