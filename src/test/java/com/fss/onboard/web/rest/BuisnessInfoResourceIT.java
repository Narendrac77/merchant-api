package com.fss.onboard.web.rest;

import com.fss.onboard.MerchantEngineApp;
import com.fss.onboard.domain.BuisnessInfo;
import com.fss.onboard.repository.BuisnessInfoRepository;

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
 * Integration tests for the {@link BuisnessInfoResource} REST controller.
 */
@SpringBootTest(classes = MerchantEngineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BuisnessInfoResourceIT {

    private static final String DEFAULT_DISPLAY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DISPLAY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BUSINESS_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_BUSINESS_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_BUSINESS_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_BUSINESS_CATEGORY = "BBBBBBBBBB";

    private static final String DEFAULT_BUSINESS_SUB_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_BUSINESS_SUB_CATEGORY = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_PINCODE = "AAAAAAAAAA";
    private static final String UPDATED_PINCODE = "BBBBBBBBBB";

    private static final String DEFAULT_ADDLINE_1 = "AAAAAAAAAA";
    private static final String UPDATED_ADDLINE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_ADDLINE_2 = "AAAAAAAAAA";
    private static final String UPDATED_ADDLINE_2 = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_WEBSITE_URL = "AAAAAAAAAA";
    private static final String UPDATED_WEBSITE_URL = "BBBBBBBBBB";

    private static final String DEFAULT_AGE = "AAAAAAAAAA";
    private static final String UPDATED_AGE = "BBBBBBBBBB";

    private static final String DEFAULT_TURN_OVER = "AAAAAAAAAA";
    private static final String UPDATED_TURN_OVER = "BBBBBBBBBB";

    @Autowired
    private BuisnessInfoRepository buisnessInfoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBuisnessInfoMockMvc;

    private BuisnessInfo buisnessInfo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BuisnessInfo createEntity(EntityManager em) {
        BuisnessInfo buisnessInfo = new BuisnessInfo()
            .displayName(DEFAULT_DISPLAY_NAME)
            .businessType(DEFAULT_BUSINESS_TYPE)
            .businessCategory(DEFAULT_BUSINESS_CATEGORY)
            .businessSubCategory(DEFAULT_BUSINESS_SUB_CATEGORY)
            .country(DEFAULT_COUNTRY)
            .pincode(DEFAULT_PINCODE)
            .addline1(DEFAULT_ADDLINE_1)
            .addline2(DEFAULT_ADDLINE_2)
            .contactName(DEFAULT_CONTACT_NAME)
            .email(DEFAULT_EMAIL)
            .mobileNumber(DEFAULT_MOBILE_NUMBER)
            .websiteUrl(DEFAULT_WEBSITE_URL)
            .age(DEFAULT_AGE)
            .turnOver(DEFAULT_TURN_OVER);
        return buisnessInfo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BuisnessInfo createUpdatedEntity(EntityManager em) {
        BuisnessInfo buisnessInfo = new BuisnessInfo()
            .displayName(UPDATED_DISPLAY_NAME)
            .businessType(UPDATED_BUSINESS_TYPE)
            .businessCategory(UPDATED_BUSINESS_CATEGORY)
            .businessSubCategory(UPDATED_BUSINESS_SUB_CATEGORY)
            .country(UPDATED_COUNTRY)
            .pincode(UPDATED_PINCODE)
            .addline1(UPDATED_ADDLINE_1)
            .addline2(UPDATED_ADDLINE_2)
            .contactName(UPDATED_CONTACT_NAME)
            .email(UPDATED_EMAIL)
            .mobileNumber(UPDATED_MOBILE_NUMBER)
            .websiteUrl(UPDATED_WEBSITE_URL)
            .age(UPDATED_AGE)
            .turnOver(UPDATED_TURN_OVER);
        return buisnessInfo;
    }

    @BeforeEach
    public void initTest() {
        buisnessInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createBuisnessInfo() throws Exception {
        int databaseSizeBeforeCreate = buisnessInfoRepository.findAll().size();
        // Create the BuisnessInfo
        restBuisnessInfoMockMvc.perform(post("/api/buisness-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(buisnessInfo)))
            .andExpect(status().isCreated());

        // Validate the BuisnessInfo in the database
        List<BuisnessInfo> buisnessInfoList = buisnessInfoRepository.findAll();
        assertThat(buisnessInfoList).hasSize(databaseSizeBeforeCreate + 1);
        BuisnessInfo testBuisnessInfo = buisnessInfoList.get(buisnessInfoList.size() - 1);
        assertThat(testBuisnessInfo.getDisplayName()).isEqualTo(DEFAULT_DISPLAY_NAME);
        assertThat(testBuisnessInfo.getBusinessType()).isEqualTo(DEFAULT_BUSINESS_TYPE);
        assertThat(testBuisnessInfo.getBusinessCategory()).isEqualTo(DEFAULT_BUSINESS_CATEGORY);
        assertThat(testBuisnessInfo.getBusinessSubCategory()).isEqualTo(DEFAULT_BUSINESS_SUB_CATEGORY);
        assertThat(testBuisnessInfo.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testBuisnessInfo.getPincode()).isEqualTo(DEFAULT_PINCODE);
        assertThat(testBuisnessInfo.getAddline1()).isEqualTo(DEFAULT_ADDLINE_1);
        assertThat(testBuisnessInfo.getAddline2()).isEqualTo(DEFAULT_ADDLINE_2);
        assertThat(testBuisnessInfo.getContactName()).isEqualTo(DEFAULT_CONTACT_NAME);
        assertThat(testBuisnessInfo.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testBuisnessInfo.getMobileNumber()).isEqualTo(DEFAULT_MOBILE_NUMBER);
        assertThat(testBuisnessInfo.getWebsiteUrl()).isEqualTo(DEFAULT_WEBSITE_URL);
        assertThat(testBuisnessInfo.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testBuisnessInfo.getTurnOver()).isEqualTo(DEFAULT_TURN_OVER);
    }

    @Test
    @Transactional
    public void createBuisnessInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = buisnessInfoRepository.findAll().size();

        // Create the BuisnessInfo with an existing ID
        buisnessInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBuisnessInfoMockMvc.perform(post("/api/buisness-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(buisnessInfo)))
            .andExpect(status().isBadRequest());

        // Validate the BuisnessInfo in the database
        List<BuisnessInfo> buisnessInfoList = buisnessInfoRepository.findAll();
        assertThat(buisnessInfoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBuisnessInfos() throws Exception {
        // Initialize the database
        buisnessInfoRepository.saveAndFlush(buisnessInfo);

        // Get all the buisnessInfoList
        restBuisnessInfoMockMvc.perform(get("/api/buisness-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(buisnessInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].displayName").value(hasItem(DEFAULT_DISPLAY_NAME)))
            .andExpect(jsonPath("$.[*].businessType").value(hasItem(DEFAULT_BUSINESS_TYPE)))
            .andExpect(jsonPath("$.[*].businessCategory").value(hasItem(DEFAULT_BUSINESS_CATEGORY)))
            .andExpect(jsonPath("$.[*].businessSubCategory").value(hasItem(DEFAULT_BUSINESS_SUB_CATEGORY)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)))
            .andExpect(jsonPath("$.[*].pincode").value(hasItem(DEFAULT_PINCODE)))
            .andExpect(jsonPath("$.[*].addline1").value(hasItem(DEFAULT_ADDLINE_1)))
            .andExpect(jsonPath("$.[*].addline2").value(hasItem(DEFAULT_ADDLINE_2)))
            .andExpect(jsonPath("$.[*].contactName").value(hasItem(DEFAULT_CONTACT_NAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].mobileNumber").value(hasItem(DEFAULT_MOBILE_NUMBER)))
            .andExpect(jsonPath("$.[*].websiteUrl").value(hasItem(DEFAULT_WEBSITE_URL)))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].turnOver").value(hasItem(DEFAULT_TURN_OVER)));
    }
    
    @Test
    @Transactional
    public void getBuisnessInfo() throws Exception {
        // Initialize the database
        buisnessInfoRepository.saveAndFlush(buisnessInfo);

        // Get the buisnessInfo
        restBuisnessInfoMockMvc.perform(get("/api/buisness-infos/{id}", buisnessInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(buisnessInfo.getId().intValue()))
            .andExpect(jsonPath("$.displayName").value(DEFAULT_DISPLAY_NAME))
            .andExpect(jsonPath("$.businessType").value(DEFAULT_BUSINESS_TYPE))
            .andExpect(jsonPath("$.businessCategory").value(DEFAULT_BUSINESS_CATEGORY))
            .andExpect(jsonPath("$.businessSubCategory").value(DEFAULT_BUSINESS_SUB_CATEGORY))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY))
            .andExpect(jsonPath("$.pincode").value(DEFAULT_PINCODE))
            .andExpect(jsonPath("$.addline1").value(DEFAULT_ADDLINE_1))
            .andExpect(jsonPath("$.addline2").value(DEFAULT_ADDLINE_2))
            .andExpect(jsonPath("$.contactName").value(DEFAULT_CONTACT_NAME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.mobileNumber").value(DEFAULT_MOBILE_NUMBER))
            .andExpect(jsonPath("$.websiteUrl").value(DEFAULT_WEBSITE_URL))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.turnOver").value(DEFAULT_TURN_OVER));
    }
    @Test
    @Transactional
    public void getNonExistingBuisnessInfo() throws Exception {
        // Get the buisnessInfo
        restBuisnessInfoMockMvc.perform(get("/api/buisness-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBuisnessInfo() throws Exception {
        // Initialize the database
        buisnessInfoRepository.saveAndFlush(buisnessInfo);

        int databaseSizeBeforeUpdate = buisnessInfoRepository.findAll().size();

        // Update the buisnessInfo
        BuisnessInfo updatedBuisnessInfo = buisnessInfoRepository.findById(buisnessInfo.getId()).get();
        // Disconnect from session so that the updates on updatedBuisnessInfo are not directly saved in db
        em.detach(updatedBuisnessInfo);
        updatedBuisnessInfo
            .displayName(UPDATED_DISPLAY_NAME)
            .businessType(UPDATED_BUSINESS_TYPE)
            .businessCategory(UPDATED_BUSINESS_CATEGORY)
            .businessSubCategory(UPDATED_BUSINESS_SUB_CATEGORY)
            .country(UPDATED_COUNTRY)
            .pincode(UPDATED_PINCODE)
            .addline1(UPDATED_ADDLINE_1)
            .addline2(UPDATED_ADDLINE_2)
            .contactName(UPDATED_CONTACT_NAME)
            .email(UPDATED_EMAIL)
            .mobileNumber(UPDATED_MOBILE_NUMBER)
            .websiteUrl(UPDATED_WEBSITE_URL)
            .age(UPDATED_AGE)
            .turnOver(UPDATED_TURN_OVER);

        restBuisnessInfoMockMvc.perform(put("/api/buisness-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBuisnessInfo)))
            .andExpect(status().isOk());

        // Validate the BuisnessInfo in the database
        List<BuisnessInfo> buisnessInfoList = buisnessInfoRepository.findAll();
        assertThat(buisnessInfoList).hasSize(databaseSizeBeforeUpdate);
        BuisnessInfo testBuisnessInfo = buisnessInfoList.get(buisnessInfoList.size() - 1);
        assertThat(testBuisnessInfo.getDisplayName()).isEqualTo(UPDATED_DISPLAY_NAME);
        assertThat(testBuisnessInfo.getBusinessType()).isEqualTo(UPDATED_BUSINESS_TYPE);
        assertThat(testBuisnessInfo.getBusinessCategory()).isEqualTo(UPDATED_BUSINESS_CATEGORY);
        assertThat(testBuisnessInfo.getBusinessSubCategory()).isEqualTo(UPDATED_BUSINESS_SUB_CATEGORY);
        assertThat(testBuisnessInfo.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testBuisnessInfo.getPincode()).isEqualTo(UPDATED_PINCODE);
        assertThat(testBuisnessInfo.getAddline1()).isEqualTo(UPDATED_ADDLINE_1);
        assertThat(testBuisnessInfo.getAddline2()).isEqualTo(UPDATED_ADDLINE_2);
        assertThat(testBuisnessInfo.getContactName()).isEqualTo(UPDATED_CONTACT_NAME);
        assertThat(testBuisnessInfo.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testBuisnessInfo.getMobileNumber()).isEqualTo(UPDATED_MOBILE_NUMBER);
        assertThat(testBuisnessInfo.getWebsiteUrl()).isEqualTo(UPDATED_WEBSITE_URL);
        assertThat(testBuisnessInfo.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testBuisnessInfo.getTurnOver()).isEqualTo(UPDATED_TURN_OVER);
    }

    @Test
    @Transactional
    public void updateNonExistingBuisnessInfo() throws Exception {
        int databaseSizeBeforeUpdate = buisnessInfoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBuisnessInfoMockMvc.perform(put("/api/buisness-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(buisnessInfo)))
            .andExpect(status().isBadRequest());

        // Validate the BuisnessInfo in the database
        List<BuisnessInfo> buisnessInfoList = buisnessInfoRepository.findAll();
        assertThat(buisnessInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBuisnessInfo() throws Exception {
        // Initialize the database
        buisnessInfoRepository.saveAndFlush(buisnessInfo);

        int databaseSizeBeforeDelete = buisnessInfoRepository.findAll().size();

        // Delete the buisnessInfo
        restBuisnessInfoMockMvc.perform(delete("/api/buisness-infos/{id}", buisnessInfo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BuisnessInfo> buisnessInfoList = buisnessInfoRepository.findAll();
        assertThat(buisnessInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
