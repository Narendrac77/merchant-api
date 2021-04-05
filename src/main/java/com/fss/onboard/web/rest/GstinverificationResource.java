package com.fss.onboard.web.rest;

import com.fss.onboard.domain.Gstinverification;
import com.fss.onboard.repository.GstinverificationRepository;
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
 * REST controller for managing {@link com.fss.onboard.domain.Gstinverification}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GstinverificationResource {

    private final Logger log = LoggerFactory.getLogger(GstinverificationResource.class);

    private static final String ENTITY_NAME = "gstinverification";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GstinverificationRepository gstinverificationRepository;

    public GstinverificationResource(GstinverificationRepository gstinverificationRepository) {
        this.gstinverificationRepository = gstinverificationRepository;
    }

    /**
     * {@code POST  /gstinverifications} : Create a new gstinverification.
     *
     * @param gstinverification the gstinverification to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new gstinverification, or with status {@code 400 (Bad Request)} if the gstinverification has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/gstinverifications")
    public ResponseEntity<Gstinverification> createGstinverification(@RequestBody Gstinverification gstinverification) throws URISyntaxException {
        log.debug("REST request to save Gstinverification : {}", gstinverification);
        if (gstinverification.getId() != null) {
            throw new BadRequestAlertException("A new gstinverification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Gstinverification result = gstinverificationRepository.save(gstinverification);
        return ResponseEntity.created(new URI("/api/gstinverifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /gstinverifications} : Updates an existing gstinverification.
     *
     * @param gstinverification the gstinverification to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gstinverification,
     * or with status {@code 400 (Bad Request)} if the gstinverification is not valid,
     * or with status {@code 500 (Internal Server Error)} if the gstinverification couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/gstinverifications")
    public ResponseEntity<Gstinverification> updateGstinverification(@RequestBody Gstinverification gstinverification) throws URISyntaxException {
        log.debug("REST request to update Gstinverification : {}", gstinverification);
        if (gstinverification.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Gstinverification result = gstinverificationRepository.save(gstinverification);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, gstinverification.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /gstinverifications} : get all the gstinverifications.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of gstinverifications in body.
     */
    @GetMapping("/gstinverifications")
    public List<Gstinverification> getAllGstinverifications() {
        log.debug("REST request to get all Gstinverifications");
        return gstinverificationRepository.findAll();
    }

    /**
     * {@code GET  /gstinverifications/:id} : get the "id" gstinverification.
     *
     * @param id the id of the gstinverification to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gstinverification, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/gstinverifications/{id}")
    public ResponseEntity<Gstinverification> getGstinverification(@PathVariable Long id) {
        log.debug("REST request to get Gstinverification : {}", id);
        Optional<Gstinverification> gstinverification = gstinverificationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gstinverification);
    }

    /**
     * {@code DELETE  /gstinverifications/:id} : delete the "id" gstinverification.
     *
     * @param id the id of the gstinverification to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/gstinverifications/{id}")
    public ResponseEntity<Void> deleteGstinverification(@PathVariable Long id) {
        log.debug("REST request to delete Gstinverification : {}", id);
        gstinverificationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
