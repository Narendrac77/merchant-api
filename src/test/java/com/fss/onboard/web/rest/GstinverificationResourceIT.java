package com.fss.onboard.web.rest;

import com.fss.onboard.MerchantEngineApp;
import com.fss.onboard.domain.Gstinverification;
import com.fss.onboard.repository.GstinverificationRepository;

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
 * Integration tests for the {@link GstinverificationResource} REST controller.
 */
@SpringBootTest(classes = MerchantEngineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class GstinverificationResourceIT {

    private static final Integer DEFAULT_GSTINVERIFICATION_ID = 1;
    private static final Integer UPDATED_GSTINVERIFICATION_ID = 2;

    @Autowired
    private GstinverificationRepository gstinverificationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGstinverificationMockMvc;

    private Gstinverification gstinverification;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Gstinverification createEntity(EntityManager em) {
        Gstinverification gstinverification = new Gstinverification()
            .gstinverificationId(DEFAULT_GSTINVERIFICATION_ID);
        return gstinverification;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Gstinverification createUpdatedEntity(EntityManager em) {
        Gstinverification gstinverification = new Gstinverification()
            .gstinverificationId(UPDATED_GSTINVERIFICATION_ID);
        return gstinverification;
    }

    @BeforeEach
    public void initTest() {
        gstinverification = createEntity(em);
    }

    @Test
    @Transactional
    public void createGstinverification() throws Exception {
        int databaseSizeBeforeCreate = gstinverificationRepository.findAll().size();
        // Create the Gstinverification
        restGstinverificationMockMvc.perform(post("/api/gstinverifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gstinverification)))
            .andExpect(status().isCreated());

        // Validate the Gstinverification in the database
        List<Gstinverification> gstinverificationList = gstinverificationRepository.findAll();
        assertThat(gstinverificationList).hasSize(databaseSizeBeforeCreate + 1);
        Gstinverification testGstinverification = gstinverificationList.get(gstinverificationList.size() - 1);
        assertThat(testGstinverification.getGstinverificationId()).isEqualTo(DEFAULT_GSTINVERIFICATION_ID);
    }

    @Test
    @Transactional
    public void createGstinverificationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gstinverificationRepository.findAll().size();

        // Create the Gstinverification with an existing ID
        gstinverification.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGstinverificationMockMvc.perform(post("/api/gstinverifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gstinverification)))
            .andExpect(status().isBadRequest());

        // Validate the Gstinverification in the database
        List<Gstinverification> gstinverificationList = gstinverificationRepository.findAll();
        assertThat(gstinverificationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGstinverifications() throws Exception {
        // Initialize the database
        gstinverificationRepository.saveAndFlush(gstinverification);

        // Get all the gstinverificationList
        restGstinverificationMockMvc.perform(get("/api/gstinverifications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gstinverification.getId().intValue())))
            .andExpect(jsonPath("$.[*].gstinverificationId").value(hasItem(DEFAULT_GSTINVERIFICATION_ID)));
    }
    
    @Test
    @Transactional
    public void getGstinverification() throws Exception {
        // Initialize the database
        gstinverificationRepository.saveAndFlush(gstinverification);

        // Get the gstinverification
        restGstinverificationMockMvc.perform(get("/api/gstinverifications/{id}", gstinverification.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(gstinverification.getId().intValue()))
            .andExpect(jsonPath("$.gstinverificationId").value(DEFAULT_GSTINVERIFICATION_ID));
    }
    @Test
    @Transactional
    public void getNonExistingGstinverification() throws Exception {
        // Get the gstinverification
        restGstinverificationMockMvc.perform(get("/api/gstinverifications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGstinverification() throws Exception {
        // Initialize the database
        gstinverificationRepository.saveAndFlush(gstinverification);

        int databaseSizeBeforeUpdate = gstinverificationRepository.findAll().size();

        // Update the gstinverification
        Gstinverification updatedGstinverification = gstinverificationRepository.findById(gstinverification.getId()).get();
        // Disconnect from session so that the updates on updatedGstinverification are not directly saved in db
        em.detach(updatedGstinverification);
        updatedGstinverification
            .gstinverificationId(UPDATED_GSTINVERIFICATION_ID);

        restGstinverificationMockMvc.perform(put("/api/gstinverifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGstinverification)))
            .andExpect(status().isOk());

        // Validate the Gstinverification in the database
        List<Gstinverification> gstinverificationList = gstinverificationRepository.findAll();
        assertThat(gstinverificationList).hasSize(databaseSizeBeforeUpdate);
        Gstinverification testGstinverification = gstinverificationList.get(gstinverificationList.size() - 1);
        assertThat(testGstinverification.getGstinverificationId()).isEqualTo(UPDATED_GSTINVERIFICATION_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingGstinverification() throws Exception {
        int databaseSizeBeforeUpdate = gstinverificationRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGstinverificationMockMvc.perform(put("/api/gstinverifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gstinverification)))
            .andExpect(status().isBadRequest());

        // Validate the Gstinverification in the database
        List<Gstinverification> gstinverificationList = gstinverificationRepository.findAll();
        assertThat(gstinverificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGstinverification() throws Exception {
        // Initialize the database
        gstinverificationRepository.saveAndFlush(gstinverification);

        int databaseSizeBeforeDelete = gstinverificationRepository.findAll().size();

        // Delete the gstinverification
        restGstinverificationMockMvc.perform(delete("/api/gstinverifications/{id}", gstinverification.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Gstinverification> gstinverificationList = gstinverificationRepository.findAll();
        assertThat(gstinverificationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
