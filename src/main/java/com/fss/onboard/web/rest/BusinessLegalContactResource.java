package com.fss.onboard.web.rest;

import com.fss.onboard.domain.BusinessLegalContact;
import com.fss.onboard.repository.BusinessLegalContactRepository;
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
 * REST controller for managing {@link com.fss.onboard.domain.BusinessLegalContact}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BusinessLegalContactResource {

    private final Logger log = LoggerFactory.getLogger(BusinessLegalContactResource.class);

    private static final String ENTITY_NAME = "businessLegalContact";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BusinessLegalContactRepository businessLegalContactRepository;

    public BusinessLegalContactResource(BusinessLegalContactRepository businessLegalContactRepository) {
        this.businessLegalContactRepository = businessLegalContactRepository;
    }

    /**
     * {@code POST  /business-legal-contacts} : Create a new businessLegalContact.
     *
     * @param businessLegalContact the businessLegalContact to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new businessLegalContact, or with status {@code 400 (Bad Request)} if the businessLegalContact has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/business-legal-contacts")
    public ResponseEntity<BusinessLegalContact> createBusinessLegalContact(@RequestBody BusinessLegalContact businessLegalContact) throws URISyntaxException {
        log.debug("REST request to save BusinessLegalContact : {}", businessLegalContact);
        if (businessLegalContact.getId() != null) {
            throw new BadRequestAlertException("A new businessLegalContact cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BusinessLegalContact result = businessLegalContactRepository.save(businessLegalContact);
        return ResponseEntity.created(new URI("/api/business-legal-contacts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /business-legal-contacts} : Updates an existing businessLegalContact.
     *
     * @param businessLegalContact the businessLegalContact to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated businessLegalContact,
     * or with status {@code 400 (Bad Request)} if the businessLegalContact is not valid,
     * or with status {@code 500 (Internal Server Error)} if the businessLegalContact couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/business-legal-contacts")
    public ResponseEntity<BusinessLegalContact> updateBusinessLegalContact(@RequestBody BusinessLegalContact businessLegalContact) throws URISyntaxException {
        log.debug("REST request to update BusinessLegalContact : {}", businessLegalContact);
        if (businessLegalContact.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BusinessLegalContact result = businessLegalContactRepository.save(businessLegalContact);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, businessLegalContact.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /business-legal-contacts} : get all the businessLegalContacts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of businessLegalContacts in body.
     */
    @GetMapping("/business-legal-contacts")
    public List<BusinessLegalContact> getAllBusinessLegalContacts() {
        log.debug("REST request to get all BusinessLegalContacts");
        return businessLegalContactRepository.findAll();
    }

    /**
     * {@code GET  /business-legal-contacts/:id} : get the "id" businessLegalContact.
     *
     * @param id the id of the businessLegalContact to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the businessLegalContact, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/business-legal-contacts/{id}")
    public ResponseEntity<BusinessLegalContact> getBusinessLegalContact(@PathVariable Long id) {
        log.debug("REST request to get BusinessLegalContact : {}", id);
        Optional<BusinessLegalContact> businessLegalContact = businessLegalContactRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(businessLegalContact);
    }

    /**
     * {@code DELETE  /business-legal-contacts/:id} : delete the "id" businessLegalContact.
     *
     * @param id the id of the businessLegalContact to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/business-legal-contacts/{id}")
    public ResponseEntity<Void> deleteBusinessLegalContact(@PathVariable Long id) {
        log.debug("REST request to delete BusinessLegalContact : {}", id);
        businessLegalContactRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
