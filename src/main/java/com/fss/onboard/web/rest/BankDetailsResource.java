package com.fss.onboard.web.rest;

import com.fss.onboard.domain.BankDetails;
import com.fss.onboard.domain.Bankverification;
import com.fss.onboard.domain.Verification;
import com.fss.onboard.repository.BankDetailsRepository;
import com.fss.onboard.repository.BankverificationRepository;
import com.fss.onboard.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import liquibase.pro.packaged.V;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.fss.onboard.domain.BankDetails}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BankDetailsResource {

    private final Logger log = LoggerFactory.getLogger(BankDetailsResource.class);

    private static final String ENTITY_NAME = "bankDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BankDetailsRepository bankDetailsRepository;

    private final BankverificationRepository bankverificationRepository;

    public BankDetailsResource(BankDetailsRepository bankDetailsRepository,BankverificationRepository bankverificationRepository) {
        this.bankDetailsRepository = bankDetailsRepository;
        this.bankverificationRepository = bankverificationRepository;
    }

    /**
     * {@code POST  /bank-details} : Create a new bankDetails.
     *
     * @param bankDetails the bankDetails to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bankDetails, or with status {@code 400 (Bad Request)} if the bankDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bank-details")
    public ResponseEntity<BankDetails> createBankDetails(@RequestBody BankDetails bankDetails) throws URISyntaxException {
        log.debug("REST request to save BankDetails : {}", bankDetails);
        if (StringUtils.isEmpty(bankDetails.getAccountNumber()) && StringUtils.isEmpty(bankDetails.getMid())) {
            throw new BadRequestAlertException("A new bankDetails must have mandatory details", ENTITY_NAME, "idexists");
        }
        Bankverification byBankverificationId = bankverificationRepository.findByBankverificationId(Integer.valueOf(bankDetails.getAccountNumber()));
        if(ObjectUtils.isEmpty(byBankverificationId)) {
            bankDetails.setStatus("Declined");
        }else{
            bankDetails.setStatus("Approved");
        }
        Verification verification = new Verification();
        verification.setMid(bankDetails.getMid());
        verification.setBankStatus(bankDetails.getStatus());
        String uri = "http://localhost:8080/api/verifications";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Verification> verificationResponseEntity = restTemplate.postForEntity(uri, verification, Verification.class);
        BankDetails result = bankDetailsRepository.save(bankDetails);
        return ResponseEntity.created(new URI("/api/bank-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bank-details} : Updates an existing bankDetails.
     *
     * @param bankDetails the bankDetails to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bankDetails,
     * or with status {@code 400 (Bad Request)} if the bankDetails is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bankDetails couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bank-details")
    public ResponseEntity<BankDetails> updateBankDetails(@RequestBody BankDetails bankDetails) throws URISyntaxException {
        log.debug("REST request to update BankDetails : {}", bankDetails);
        if (StringUtils.isEmpty(bankDetails.getAccountNumber())&&StringUtils.isEmpty(bankDetails.getMid())) {
            throw new BadRequestAlertException("A new bankDetails must have mandatory details", ENTITY_NAME, "idexists");
        }
        Bankverification byBankverificationId = bankverificationRepository.findByBankverificationId(Integer.valueOf(bankDetails.getAccountNumber()));
        if(ObjectUtils.isEmpty(byBankverificationId)) {
            bankDetails.setStatus("Declined");
        }else{
            bankDetails.setStatus("Approved");
        }
        Verification verification = new Verification();
        verification.setMid(bankDetails.getMid());
        verification.setBankStatus(bankDetails.getStatus());
        String uri = "http://localhost:8080/api/verifications";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Verification> verificationResponseEntity = restTemplate.postForEntity(uri, verification, Verification.class);
        BankDetails result = bankDetailsRepository.save(bankDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bankDetails.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bank-details} : get all the bankDetails.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bankDetails in body.
     */
    @GetMapping("/bank-details")
    public List<BankDetails> getAllBankDetails(@RequestParam(required = false) String filter) {
        if ("buisnessinfo-is-null".equals(filter)) {
            log.debug("REST request to get all BankDetailss where buisnessInfo is null");
            return StreamSupport
                .stream(bankDetailsRepository.findAll().spliterator(), false)
                .filter(bankDetails -> bankDetails.getBuisnessInfo() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all BankDetails");
        return bankDetailsRepository.findAll();
    }

    /**
     * {@code GET  /bank-details/:id} : get the "id" bankDetails.
     *
     * @param mid the id of the bankDetails to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bankDetails, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bank-details/{mid}")
    public ResponseEntity<BankDetails> getBankDetails(@PathVariable String mid) {
        log.debug("REST request to get BankDetails : {}", mid);
        BankDetails bankDetails = bankDetailsRepository.findByMid(mid);
        return ObjectUtils.isEmpty(bankDetails)?ResponseEntity.notFound().build():ResponseEntity.ok(bankDetails);
    }

    /**
     * {@code DELETE  /bank-details/:id} : delete the "id" bankDetails.
     *
     * @param id the id of the bankDetails to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bank-details/{id}")
    public ResponseEntity<Void> deleteBankDetails(@PathVariable Long id) {
        log.debug("REST request to delete BankDetails : {}", id);
        bankDetailsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
