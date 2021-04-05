package com.fss.onboard.web.rest;

import com.fss.onboard.domain.Panverification;
import com.fss.onboard.repository.PanverificationRepository;
import com.fss.onboard.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.fss.onboard.domain.Panverification}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PanverificationResource {

    private final Logger log = LoggerFactory.getLogger(PanverificationResource.class);

    private static final String ENTITY_NAME = "panverification";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PanverificationRepository panverificationRepository;

    public PanverificationResource(PanverificationRepository panverificationRepository) {
        this.panverificationRepository = panverificationRepository;
    }

    /**
     * {@code POST  /panverifications} : Create a new panverification.
     *
     * @param panverification the panverification to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new panverification, or with status {@code 400 (Bad Request)} if the panverification has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/panverifications")
    public ResponseEntity<Panverification> createPanverification(@RequestBody Panverification panverification) throws URISyntaxException {
        log.debug("REST request to save Panverification : {}", panverification);
        if (panverification.getId() != null) {
            throw new BadRequestAlertException("A new panverification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Panverification result = panverificationRepository.save(panverification);
        return ResponseEntity.created(new URI("/api/panverifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /panverifications} : Updates an existing panverification.
     *
     * @param panverification the panverification to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated panverification,
     * or with status {@code 400 (Bad Request)} if the panverification is not valid,
     * or with status {@code 500 (Internal Server Error)} if the panverification couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/panverifications")
    public ResponseEntity<Panverification> updatePanverification(@RequestBody Panverification panverification) throws URISyntaxException {
        log.debug("REST request to update Panverification : {}", panverification);
        if (panverification.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Panverification result = panverificationRepository.save(panverification);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, panverification.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /panverifications} : get all the panverifications.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of panverifications in body.
     */
    @GetMapping("/panverifications")
    public List<Panverification> getAllPanverifications() {
        log.debug("REST request to get all Panverifications");
        return panverificationRepository.findAll();
    }

    /**
     * {@code GET  /panverifications/:id} : get the "id" panverification.
     *
     * @param id the id of the panverification to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the panverification, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/panverifications/{id}")
    public ResponseEntity<Panverification> getPanverification(@PathVariable Long id) {
        log.debug("REST request to get Panverification : {}", id);
        Optional<Panverification> panverification = panverificationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(panverification);
    }

    /**
     * {@code DELETE  /panverifications/:id} : delete the "id" panverification.
     *
     * @param id the id of the panverification to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/panverifications/{id}")
    public ResponseEntity<Void> deletePanverification(@PathVariable Long id) {
        log.debug("REST request to delete Panverification : {}", id);
        panverificationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
