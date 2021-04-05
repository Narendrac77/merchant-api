package com.fss.onboard.web.rest;

import com.fss.onboard.domain.BusinessBankAcc;
import com.fss.onboard.repository.BusinessBankAccRepository;
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
 * REST controller for managing {@link com.fss.onboard.domain.BusinessBankAcc}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BusinessBankAccResource {

    private final Logger log = LoggerFactory.getLogger(BusinessBankAccResource.class);

    private static final String ENTITY_NAME = "businessBankAcc";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BusinessBankAccRepository businessBankAccRepository;

    public BusinessBankAccResource(BusinessBankAccRepository businessBankAccRepository) {
        this.businessBankAccRepository = businessBankAccRepository;
    }

    /**
     * {@code POST  /business-bank-accs} : Create a new businessBankAcc.
     *
     * @param businessBankAcc the businessBankAcc to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new businessBankAcc, or with status {@code 400 (Bad Request)} if the businessBankAcc has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/business-bank-accs")
    public ResponseEntity<BusinessBankAcc> createBusinessBankAcc(@RequestBody BusinessBankAcc businessBankAcc) throws URISyntaxException {
        log.debug("REST request to save BusinessBankAcc : {}", businessBankAcc);
        if (businessBankAcc.getId() != null) {
            throw new BadRequestAlertException("A new businessBankAcc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BusinessBankAcc result = businessBankAccRepository.save(businessBankAcc);
        return ResponseEntity.created(new URI("/api/business-bank-accs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /business-bank-accs} : Updates an existing businessBankAcc.
     *
     * @param businessBankAcc the businessBankAcc to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated businessBankAcc,
     * or with status {@code 400 (Bad Request)} if the businessBankAcc is not valid,
     * or with status {@code 500 (Internal Server Error)} if the businessBankAcc couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/business-bank-accs")
    public ResponseEntity<BusinessBankAcc> updateBusinessBankAcc(@RequestBody BusinessBankAcc businessBankAcc) throws URISyntaxException {
        log.debug("REST request to update BusinessBankAcc : {}", businessBankAcc);
        if (businessBankAcc.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BusinessBankAcc result = businessBankAccRepository.save(businessBankAcc);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, businessBankAcc.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /business-bank-accs} : get all the businessBankAccs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of businessBankAccs in body.
     */
    @GetMapping("/business-bank-accs")
    public List<BusinessBankAcc> getAllBusinessBankAccs() {
        log.debug("REST request to get all BusinessBankAccs");
        return businessBankAccRepository.findAll();
    }

    /**
     * {@code GET  /business-bank-accs/:id} : get the "id" businessBankAcc.
     *
     * @param id the id of the businessBankAcc to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the businessBankAcc, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/business-bank-accs/{id}")
    public ResponseEntity<BusinessBankAcc> getBusinessBankAcc(@PathVariable Long id) {
        log.debug("REST request to get BusinessBankAcc : {}", id);
        Optional<BusinessBankAcc> businessBankAcc = businessBankAccRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(businessBankAcc);
    }

    /**
     * {@code DELETE  /business-bank-accs/:id} : delete the "id" businessBankAcc.
     *
     * @param id the id of the businessBankAcc to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/business-bank-accs/{id}")
    public ResponseEntity<Void> deleteBusinessBankAcc(@PathVariable Long id) {
        log.debug("REST request to delete BusinessBankAcc : {}", id);
        businessBankAccRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
