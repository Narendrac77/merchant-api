package com.fss.onboard.web.rest;

import com.fss.onboard.domain.Verification;
import com.fss.onboard.repository.VerificationRepository;
import com.fss.onboard.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.fss.onboard.domain.Verification}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VerificationResource {

    private final Logger log = LoggerFactory.getLogger(VerificationResource.class);

    private static final String ENTITY_NAME = "verification";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VerificationRepository verificationRepository;

    public VerificationResource(VerificationRepository verificationRepository) {
        this.verificationRepository = verificationRepository;
    }

    /**
     * {@code POST  /verifications} : Create a new verification.
     *
     * @param verification the verification to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new verification, or with status {@code 400 (Bad Request)} if the verification has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/verifications")
    public ResponseEntity<Verification> createVerification(@RequestBody Verification verification) throws URISyntaxException {
        log.debug("REST request to save Verification : {}", verification);
        if (verification.getMid() != null) {
            throw new BadRequestAlertException("A new verification must have MID", ENTITY_NAME, "idexists");
        }
        Verification result;
        Verification byMid = verificationRepository.findByMid(verification.getMid());
        if(!ObjectUtils.isEmpty(byMid))
        {
            if ((StringUtils.isEmpty(byMid.getBankStatus())||byMid.getBankStatus()==null)&&!StringUtils.isEmpty(verification.getBankStatus())) {
                byMid.setBankStatus(verification.getBankStatus());
            }
            if ((StringUtils.isEmpty(byMid.getPanStatus())||byMid.getPanStatus()== null)&&!StringUtils.isEmpty(verification.getPanStatus())) {
                byMid.setBankStatus(verification.getPanStatus());
            }
            if((StringUtils.isEmpty(byMid.getGstinStatus())||byMid.getGstinStatus()==null)&&!StringUtils.isEmpty(verification.getGstinStatus())) {
                byMid.setBankStatus(verification.getGstinStatus());
            }
            result   = verificationRepository.save(byMid);
        }
        else {
            result = verificationRepository.save(verification);
        }
        return ResponseEntity.created(new URI("/api/verifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /verifications} : Updates an existing verification.
     *
     * @param verification the verification to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated verification,
     * or with status {@code 400 (Bad Request)} if the verification is not valid,
     * or with status {@code 500 (Internal Server Error)} if the verification couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/verifications")
    public ResponseEntity<Verification> updateVerification(@RequestBody Verification verification) throws URISyntaxException {
        log.debug("REST request to update Verification : {}", verification);
        if (verification.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Verification result = verificationRepository.save(verification);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, verification.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /verifications} : get all the verifications.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of verifications in body.
     */
    @GetMapping("/verifications")
    public List<Verification> getAllVerifications() {
        log.debug("REST request to get all Verifications");
        return verificationRepository.findAll();
    }

    /**
     * {@code GET  /verifications/:id} : get the "id" verification.
     *
     * @param mid the id of the verification to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the verification, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/verifications/{mid}")
    public Verification getVerification(@PathVariable String mid) {
        log.debug("REST request to get Verification : {}", mid);
        Verification verification = verificationRepository.findByMid(mid);
        return verification;
    }

    /**
     * {@code DELETE  /verifications/:id} : delete the "id" verification.
     *
     * @param id the id of the verification to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/verifications/{id}")
    public ResponseEntity<Void> deleteVerification(@PathVariable Long id) {
        log.debug("REST request to delete Verification : {}", id);
        verificationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
