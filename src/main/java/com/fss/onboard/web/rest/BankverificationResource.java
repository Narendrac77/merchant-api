package com.fss.onboard.web.rest;

import com.fss.onboard.domain.Bankverification;
import com.fss.onboard.repository.BankverificationRepository;
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
 * REST controller for managing {@link com.fss.onboard.domain.Bankverification}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BankverificationResource {

    private final Logger log = LoggerFactory.getLogger(BankverificationResource.class);

    private static final String ENTITY_NAME = "bankverification";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BankverificationRepository bankverificationRepository;

    public BankverificationResource(BankverificationRepository bankverificationRepository) {
        this.bankverificationRepository = bankverificationRepository;
    }

    /**
     * {@code POST  /bankverifications} : Create a new bankverification.
     *
     * @param bankverification the bankverification to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bankverification, or with status {@code 400 (Bad Request)} if the bankverification has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bankverifications")
    public ResponseEntity<Bankverification> createBankverification(@RequestBody Bankverification bankverification) throws URISyntaxException {
        log.debug("REST request to save Bankverification : {}", bankverification);
        if (bankverification.getId() != null) {
            throw new BadRequestAlertException("A new bankverification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bankverification result = bankverificationRepository.save(bankverification);
        return ResponseEntity.created(new URI("/api/bankverifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bankverifications} : Updates an existing bankverification.
     *
     * @param bankverification the bankverification to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bankverification,
     * or with status {@code 400 (Bad Request)} if the bankverification is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bankverification couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bankverifications")
    public ResponseEntity<Bankverification> updateBankverification(@RequestBody Bankverification bankverification) throws URISyntaxException {
        log.debug("REST request to update Bankverification : {}", bankverification);
        if (bankverification.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Bankverification result = bankverificationRepository.save(bankverification);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bankverification.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bankverifications} : get all the bankverifications.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bankverifications in body.
     */
    @GetMapping("/bankverifications")
    public List<Bankverification> getAllBankverifications() {
        log.debug("REST request to get all Bankverifications");
        return bankverificationRepository.findAll();
    }

    /**
     * {@code GET  /bankverifications/:id} : get the "id" bankverification.
     *
     * @param id the id of the bankverification to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bankverification, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bankverifications/{id}")
    public ResponseEntity<Bankverification> getBankverification(@PathVariable Long id) {
        log.debug("REST request to get Bankverification : {}", id);
        Optional<Bankverification> bankverification = bankverificationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bankverification);
    }

    /**
     * {@code DELETE  /bankverifications/:id} : delete the "id" bankverification.
     *
     * @param id the id of the bankverification to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bankverifications/{id}")
    public ResponseEntity<Void> deleteBankverification(@PathVariable Long id) {
        log.debug("REST request to delete Bankverification : {}", id);
        bankverificationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
