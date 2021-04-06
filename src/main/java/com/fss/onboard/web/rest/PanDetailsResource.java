package com.fss.onboard.web.rest;

import com.fss.onboard.domain.PanDetails;
import com.fss.onboard.domain.Panverification;
import com.fss.onboard.domain.Verification;
import com.fss.onboard.repository.PanDetailsRepository;
import com.fss.onboard.repository.PanverificationRepository;
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
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.fss.onboard.domain.PanDetails}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PanDetailsResource {

    private final Logger log = LoggerFactory.getLogger(PanDetailsResource.class);

    private static final String ENTITY_NAME = "panDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PanDetailsRepository panDetailsRepository;

    private final PanverificationRepository panverificationRepository;

    public PanDetailsResource(PanDetailsRepository panDetailsRepository,PanverificationRepository panverificationRepository) {
        this.panDetailsRepository = panDetailsRepository;
        this.panverificationRepository = panverificationRepository;
    }

    /**
     * {@code POST  /pan-details} : Create a new panDetails.
     *
     * @param panDetails the panDetails to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new panDetails, or with status {@code 400 (Bad Request)} if the panDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pan-details")
    public ResponseEntity<PanDetails> createPanDetails(@RequestBody PanDetails panDetails) throws URISyntaxException {
        log.debug("REST request to save PanDetails : {}", panDetails);
        if (StringUtils.isEmpty(panDetails.getMid())&&StringUtils.isEmpty(panDetails.getPanNumber())) {
            throw new BadRequestAlertException("A new panDetails  must have mandatory details", ENTITY_NAME, "idexists");
        }
        Panverification byPanverificationId = panverificationRepository.findByPanverificationId(Integer.valueOf(panDetails.getPanNumber()));
        if(ObjectUtils.isEmpty(byPanverificationId)) {
            panDetails.setStatus("Declined");
        }else{
            panDetails.setStatus("Approved");
        }
        Verification verification = new Verification();
        verification.setMid(panDetails.getMid());
        verification.setBankStatus(panDetails.getStatus());
        String uri = "http://localhost:8080/api/verifications";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Verification> verificationResponseEntity = restTemplate.postForEntity(uri, verification, Verification.class);
        PanDetails result = panDetailsRepository.save(panDetails);
        return ResponseEntity.created(new URI("/api/pan-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pan-details} : Updates an existing panDetails.
     *
     * @param panDetails the panDetails to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated panDetails,
     * or with status {@code 400 (Bad Request)} if the panDetails is not valid,
     * or with status {@code 500 (Internal Server Error)} if the panDetails couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pan-details")
    public ResponseEntity<PanDetails> updatePanDetails(@RequestBody PanDetails panDetails) throws URISyntaxException {
        log.debug("REST request to update PanDetails : {}", panDetails);
        if (StringUtils.isEmpty(panDetails.getMid())&&StringUtils.isEmpty(panDetails.getPanNumber())) {
            throw new BadRequestAlertException("A new panDetails  must have mandatory details", ENTITY_NAME, "idexists");
        }
        Panverification byPanverificationId = panverificationRepository.findByPanverificationId(Integer.valueOf(panDetails.getPanNumber()));
        if(ObjectUtils.isEmpty(byPanverificationId)) {
            panDetails.setStatus("Declined");
        }else{
            panDetails.setStatus("Approved");
        }
        Verification verification = new Verification();
        verification.setMid(panDetails.getMid());
        verification.setBankStatus(panDetails.getStatus());
        String uri = "http://localhost:8080/api/verifications";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Verification> verificationResponseEntity = restTemplate.postForEntity(uri, verification, Verification.class);
        PanDetails result = panDetailsRepository.save(panDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, panDetails.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pan-details} : get all the panDetails.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of panDetails in body.
     */
    @GetMapping("/pan-details")
    public List<PanDetails> getAllPanDetails(@RequestParam(required = false) String filter) {
        if ("buisnessinfo-is-null".equals(filter)) {
            log.debug("REST request to get all PanDetailss where buisnessInfo is null");
            return StreamSupport
                .stream(panDetailsRepository.findAll().spliterator(), false)
                .filter(panDetails -> panDetails.getBuisnessInfo() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all PanDetails");
        return panDetailsRepository.findAll();
    }

    /**
     * {@code GET  /pan-details/:id} : get the "id" panDetails.
     *
     * @param mid the id of the panDetails to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the panDetails, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pan-details/{mid}")
    public ResponseEntity<PanDetails> getPanDetails(@PathVariable String mid) {
        log.debug("REST request to get PanDetails : {}", mid);
        PanDetails panDetails = panDetailsRepository.findByMid(mid);
        return ObjectUtils.isEmpty(panDetails)?ResponseEntity.notFound().build():ResponseEntity.ok(panDetails);

    }

    /**
     * {@code DELETE  /pan-details/:id} : delete the "id" panDetails.
     *
     * @param id the id of the panDetails to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pan-details/{id}")
    public ResponseEntity<Void> deletePanDetails(@PathVariable Long id) {
        log.debug("REST request to delete PanDetails : {}", id);
        panDetailsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
