package com.fss.onboard.web.rest;

import com.fss.onboard.domain.BusinessLegal;
import com.fss.onboard.repository.BusinessLegalRepository;
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
 * REST controller for managing {@link com.fss.onboard.domain.BusinessLegal}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BusinessLegalResource {

    private final Logger log = LoggerFactory.getLogger(BusinessLegalResource.class);

    private static final String ENTITY_NAME = "businessLegal";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BusinessLegalRepository businessLegalRepository;

    public BusinessLegalResource(BusinessLegalRepository businessLegalRepository) {
        this.businessLegalRepository = businessLegalRepository;
    }

    /**
     * {@code POST  /business-legals} : Create a new businessLegal.
     *
     * @param businessLegal the businessLegal to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new businessLegal, or with status {@code 400 (Bad Request)} if the businessLegal has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/business-legals")
    public ResponseEntity<BusinessLegal> createBusinessLegal(@RequestBody BusinessLegal businessLegal) throws URISyntaxException {
        log.debug("REST request to save BusinessLegal : {}", businessLegal);
        if (businessLegal.getId() != null) {
            throw new BadRequestAlertException("A new businessLegal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BusinessLegal result = businessLegalRepository.save(businessLegal);
        return ResponseEntity.created(new URI("/api/business-legals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /business-legals} : Updates an existing businessLegal.
     *
     * @param businessLegal the businessLegal to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated businessLegal,
     * or with status {@code 400 (Bad Request)} if the businessLegal is not valid,
     * or with status {@code 500 (Internal Server Error)} if the businessLegal couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/business-legals")
    public ResponseEntity<BusinessLegal> updateBusinessLegal(@RequestBody BusinessLegal businessLegal) throws URISyntaxException {
        log.debug("REST request to update BusinessLegal : {}", businessLegal);
        if (businessLegal.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BusinessLegal result = businessLegalRepository.save(businessLegal);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, businessLegal.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /business-legals} : get all the businessLegals.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of businessLegals in body.
     */
    @GetMapping("/business-legals")
    public List<BusinessLegal> getAllBusinessLegals() {
        log.debug("REST request to get all BusinessLegals");
        return businessLegalRepository.findAll();
    }

    /**
     * {@code GET  /business-legals/:id} : get the "id" businessLegal.
     *
     * @param id the id of the businessLegal to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the businessLegal, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/business-legals/{id}")
    public ResponseEntity<BusinessLegal> getBusinessLegal(@PathVariable Long id) {
        log.debug("REST request to get BusinessLegal : {}", id);
        Optional<BusinessLegal> businessLegal = businessLegalRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(businessLegal);
    }

    /**
     * {@code DELETE  /business-legals/:id} : delete the "id" businessLegal.
     *
     * @param id the id of the businessLegal to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/business-legals/{id}")
    public ResponseEntity<Void> deleteBusinessLegal(@PathVariable Long id) {
        log.debug("REST request to delete BusinessLegal : {}", id);
        businessLegalRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
