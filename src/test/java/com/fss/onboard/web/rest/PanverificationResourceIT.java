package com.fss.onboard.web.rest;

import com.fss.onboard.MerchantEngineApp;
import com.fss.onboard.domain.Panverification;
import com.fss.onboard.repository.PanverificationRepository;

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
 * Integration tests for the {@link PanverificationResource} REST controller.
 */
@SpringBootTest(classes = MerchantEngineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PanverificationResourceIT {

    private static final Integer DEFAULT_PANVERIFICATION_ID = 1;
    private static final Integer UPDATED_PANVERIFICATION_ID = 2;

    @Autowired
    private PanverificationRepository panverificationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPanverificationMockMvc;

    private Panverification panverification;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Panverification createEntity(EntityManager em) {
        Panverification panverification = new Panverification()
            .panverificationId(DEFAULT_PANVERIFICATION_ID);
        return panverification;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Panverification createUpdatedEntity(EntityManager em) {
        Panverification panverification = new Panverification()
            .panverificationId(UPDATED_PANVERIFICATION_ID);
        return panverification;
    }

    @BeforeEach
    public void initTest() {
        panverification = createEntity(em);
    }

    @Test
    @Transactional
    public void createPanverification() throws Exception {
        int databaseSizeBeforeCreate = panverificationRepository.findAll().size();
        // Create the Panverification
        restPanverificationMockMvc.perform(post("/api/panverifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(panverification)))
            .andExpect(status().isCreated());

        // Validate the Panverification in the database
        List<Panverification> panverificationList = panverificationRepository.findAll();
        assertThat(panverificationList).hasSize(databaseSizeBeforeCreate + 1);
        Panverification testPanverification = panverificationList.get(panverificationList.size() - 1);
        assertThat(testPanverification.getPanverificationId()).isEqualTo(DEFAULT_PANVERIFICATION_ID);
    }

    @Test
    @Transactional
    public void createPanverificationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = panverificationRepository.findAll().size();

        // Create the Panverification with an existing ID
        panverification.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPanverificationMockMvc.perform(post("/api/panverifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(panverification)))
            .andExpect(status().isBadRequest());

        // Validate the Panverification in the database
        List<Panverification> panverificationList = panverificationRepository.findAll();
        assertThat(panverificationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPanverifications() throws Exception {
        // Initialize the database
        panverificationRepository.saveAndFlush(panverification);

        // Get all the panverificationList
        restPanverificationMockMvc.perform(get("/api/panverifications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(panverification.getId().intValue())))
            .andExpect(jsonPath("$.[*].panverificationId").value(hasItem(DEFAULT_PANVERIFICATION_ID)));
    }
    
    @Test
    @Transactional
    public void getPanverification() throws Exception {
        // Initialize the database
        panverificationRepository.saveAndFlush(panverification);

        // Get the panverification
        restPanverificationMockMvc.perform(get("/api/panverifications/{id}", panverification.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(panverification.getId().intValue()))
            .andExpect(jsonPath("$.panverificationId").value(DEFAULT_PANVERIFICATION_ID));
    }
    @Test
    @Transactional
    public void getNonExistingPanverification() throws Exception {
        // Get the panverification
        restPanverificationMockMvc.perform(get("/api/panverifications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePanverification() throws Exception {
        // Initialize the database
        panverificationRepository.saveAndFlush(panverification);

        int databaseSizeBeforeUpdate = panverificationRepository.findAll().size();

        // Update the panverification
        Panverification updatedPanverification = panverificationRepository.findById(panverification.getId()).get();
        // Disconnect from session so that the updates on updatedPanverification are not directly saved in db
        em.detach(updatedPanverification);
        updatedPanverification
            .panverificationId(UPDATED_PANVERIFICATION_ID);

        restPanverificationMockMvc.perform(put("/api/panverifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPanverification)))
            .andExpect(status().isOk());

        // Validate the Panverification in the database
        List<Panverification> panverificationList = panverificationRepository.findAll();
        assertThat(panverificationList).hasSize(databaseSizeBeforeUpdate);
        Panverification testPanverification = panverificationList.get(panverificationList.size() - 1);
        assertThat(testPanverification.getPanverificationId()).isEqualTo(UPDATED_PANVERIFICATION_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingPanverification() throws Exception {
        int databaseSizeBeforeUpdate = panverificationRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPanverificationMockMvc.perform(put("/api/panverifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(panverification)))
            .andExpect(status().isBadRequest());

        // Validate the Panverification in the database
        List<Panverification> panverificationList = panverificationRepository.findAll();
        assertThat(panverificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePanverification() throws Exception {
        // Initialize the database
        panverificationRepository.saveAndFlush(panverification);

        int databaseSizeBeforeDelete = panverificationRepository.findAll().size();

        // Delete the panverification
        restPanverificationMockMvc.perform(delete("/api/panverifications/{id}", panverification.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Panverification> panverificationList = panverificationRepository.findAll();
        assertThat(panverificationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
