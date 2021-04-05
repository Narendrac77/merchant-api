package com.fss.onboard.web.rest;

import com.fss.onboard.MerchantEngineApp;
import com.fss.onboard.domain.BusinessLegalContact;
import com.fss.onboard.repository.BusinessLegalContactRepository;

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
 * Integration tests for the {@link BusinessLegalContactResource} REST controller.
 */
@SpringBootTest(classes = MerchantEngineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BusinessLegalContactResourceIT {

    private static final String DEFAULT_CONTACT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_MOBILE = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_MOBILE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_AADHAR_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_AADHAR_NUMBER = "BBBBBBBBBB";

    @Autowired
    private BusinessLegalContactRepository businessLegalContactRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBusinessLegalContactMockMvc;

    private BusinessLegalContact businessLegalContact;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BusinessLegalContact createEntity(EntityManager em) {
        BusinessLegalContact businessLegalContact = new BusinessLegalContact()
            .contactName(DEFAULT_CONTACT_NAME)
            .contactMobile(DEFAULT_CONTACT_MOBILE)
            .contactEmail(DEFAULT_CONTACT_EMAIL)
            .aadharNumber(DEFAULT_AADHAR_NUMBER);
        return businessLegalContact;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BusinessLegalContact createUpdatedEntity(EntityManager em) {
        BusinessLegalContact businessLegalContact = new BusinessLegalContact()
            .contactName(UPDATED_CONTACT_NAME)
            .contactMobile(UPDATED_CONTACT_MOBILE)
            .contactEmail(UPDATED_CONTACT_EMAIL)
            .aadharNumber(UPDATED_AADHAR_NUMBER);
        return businessLegalContact;
    }

    @BeforeEach
    public void initTest() {
        businessLegalContact = createEntity(em);
    }

    @Test
    @Transactional
    public void createBusinessLegalContact() throws Exception {
        int databaseSizeBeforeCreate = businessLegalContactRepository.findAll().size();
        // Create the BusinessLegalContact
        restBusinessLegalContactMockMvc.perform(post("/api/business-legal-contacts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(businessLegalContact)))
            .andExpect(status().isCreated());

        // Validate the BusinessLegalContact in the database
        List<BusinessLegalContact> businessLegalContactList = businessLegalContactRepository.findAll();
        assertThat(businessLegalContactList).hasSize(databaseSizeBeforeCreate + 1);
        BusinessLegalContact testBusinessLegalContact = businessLegalContactList.get(businessLegalContactList.size() - 1);
        assertThat(testBusinessLegalContact.getContactName()).isEqualTo(DEFAULT_CONTACT_NAME);
        assertThat(testBusinessLegalContact.getContactMobile()).isEqualTo(DEFAULT_CONTACT_MOBILE);
        assertThat(testBusinessLegalContact.getContactEmail()).isEqualTo(DEFAULT_CONTACT_EMAIL);
        assertThat(testBusinessLegalContact.getAadharNumber()).isEqualTo(DEFAULT_AADHAR_NUMBER);
    }

    @Test
    @Transactional
    public void createBusinessLegalContactWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = businessLegalContactRepository.findAll().size();

        // Create the BusinessLegalContact with an existing ID
        businessLegalContact.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBusinessLegalContactMockMvc.perform(post("/api/business-legal-contacts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(businessLegalContact)))
            .andExpect(status().isBadRequest());

        // Validate the BusinessLegalContact in the database
        List<BusinessLegalContact> businessLegalContactList = businessLegalContactRepository.findAll();
        assertThat(businessLegalContactList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBusinessLegalContacts() throws Exception {
        // Initialize the database
        businessLegalContactRepository.saveAndFlush(businessLegalContact);

        // Get all the businessLegalContactList
        restBusinessLegalContactMockMvc.perform(get("/api/business-legal-contacts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(businessLegalContact.getId().intValue())))
            .andExpect(jsonPath("$.[*].contactName").value(hasItem(DEFAULT_CONTACT_NAME)))
            .andExpect(jsonPath("$.[*].contactMobile").value(hasItem(DEFAULT_CONTACT_MOBILE)))
            .andExpect(jsonPath("$.[*].contactEmail").value(hasItem(DEFAULT_CONTACT_EMAIL)))
            .andExpect(jsonPath("$.[*].aadharNumber").value(hasItem(DEFAULT_AADHAR_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getBusinessLegalContact() throws Exception {
        // Initialize the database
        businessLegalContactRepository.saveAndFlush(businessLegalContact);

        // Get the businessLegalContact
        restBusinessLegalContactMockMvc.perform(get("/api/business-legal-contacts/{id}", businessLegalContact.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(businessLegalContact.getId().intValue()))
            .andExpect(jsonPath("$.contactName").value(DEFAULT_CONTACT_NAME))
            .andExpect(jsonPath("$.contactMobile").value(DEFAULT_CONTACT_MOBILE))
            .andExpect(jsonPath("$.contactEmail").value(DEFAULT_CONTACT_EMAIL))
            .andExpect(jsonPath("$.aadharNumber").value(DEFAULT_AADHAR_NUMBER));
    }
    @Test
    @Transactional
    public void getNonExistingBusinessLegalContact() throws Exception {
        // Get the businessLegalContact
        restBusinessLegalContactMockMvc.perform(get("/api/business-legal-contacts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBusinessLegalContact() throws Exception {
        // Initialize the database
        businessLegalContactRepository.saveAndFlush(businessLegalContact);

        int databaseSizeBeforeUpdate = businessLegalContactRepository.findAll().size();

        // Update the businessLegalContact
        BusinessLegalContact updatedBusinessLegalContact = businessLegalContactRepository.findById(businessLegalContact.getId()).get();
        // Disconnect from session so that the updates on updatedBusinessLegalContact are not directly saved in db
        em.detach(updatedBusinessLegalContact);
        updatedBusinessLegalContact
            .contactName(UPDATED_CONTACT_NAME)
            .contactMobile(UPDATED_CONTACT_MOBILE)
            .contactEmail(UPDATED_CONTACT_EMAIL)
            .aadharNumber(UPDATED_AADHAR_NUMBER);

        restBusinessLegalContactMockMvc.perform(put("/api/business-legal-contacts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBusinessLegalContact)))
            .andExpect(status().isOk());

        // Validate the BusinessLegalContact in the database
        List<BusinessLegalContact> businessLegalContactList = businessLegalContactRepository.findAll();
        assertThat(businessLegalContactList).hasSize(databaseSizeBeforeUpdate);
        BusinessLegalContact testBusinessLegalContact = businessLegalContactList.get(businessLegalContactList.size() - 1);
        assertThat(testBusinessLegalContact.getContactName()).isEqualTo(UPDATED_CONTACT_NAME);
        assertThat(testBusinessLegalContact.getContactMobile()).isEqualTo(UPDATED_CONTACT_MOBILE);
        assertThat(testBusinessLegalContact.getContactEmail()).isEqualTo(UPDATED_CONTACT_EMAIL);
        assertThat(testBusinessLegalContact.getAadharNumber()).isEqualTo(UPDATED_AADHAR_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingBusinessLegalContact() throws Exception {
        int databaseSizeBeforeUpdate = businessLegalContactRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBusinessLegalContactMockMvc.perform(put("/api/business-legal-contacts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(businessLegalContact)))
            .andExpect(status().isBadRequest());

        // Validate the BusinessLegalContact in the database
        List<BusinessLegalContact> businessLegalContactList = businessLegalContactRepository.findAll();
        assertThat(businessLegalContactList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBusinessLegalContact() throws Exception {
        // Initialize the database
        businessLegalContactRepository.saveAndFlush(businessLegalContact);

        int databaseSizeBeforeDelete = businessLegalContactRepository.findAll().size();

        // Delete the businessLegalContact
        restBusinessLegalContactMockMvc.perform(delete("/api/business-legal-contacts/{id}", businessLegalContact.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BusinessLegalContact> businessLegalContactList = businessLegalContactRepository.findAll();
        assertThat(businessLegalContactList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
