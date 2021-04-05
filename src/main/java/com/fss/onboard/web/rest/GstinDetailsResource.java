package com.fss.onboard.web.rest;

import com.fss.onboard.domain.*;
import com.fss.onboard.repository.GstinDetailsRepository;
import com.fss.onboard.repository.GstinverificationRepository;
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
 * REST controller for managing {@link com.fss.onboard.domain.GstinDetails}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GstinDetailsResource {

    private final Logger log = LoggerFactory.getLogger(GstinDetailsResource.class);

    private static final String ENTITY_NAME = "gstinDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GstinDetailsRepository gstinDetailsRepository;

    private final GstinverificationRepository gstinverificationRepository;

    public GstinDetailsResource(GstinDetailsRepository gstinDetailsRepository,GstinverificationRepository gstinverificationRepository) {
        this.gstinDetailsRepository = gstinDetailsRepository;
        this.gstinverificationRepository = gstinverificationRepository;
    }

    /**
     * {@code POST  /gstin-details} : Create a new gstinDetails.
     *
     * @param gstinDetails the gstinDetails to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new gstinDetails, or with status {@code 400 (Bad Request)} if the gstinDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/gstin-details")
    public ResponseEntity<GstinDetails> createGstinDetails(@RequestBody GstinDetails gstinDetails) throws URISyntaxException {
        log.debug("REST request to save GstinDetails : {}", gstinDetails);
        if (StringUtils.isEmpty(gstinDetails.getMid())&&StringUtils.isEmpty(gstinDetails.getGstin())) {
            throw new BadRequestAlertException("A new GstinDetails  must have mandatory details", ENTITY_NAME, "idexists");
        }
        Gstinverification byGstinverificationId = gstinverificationRepository.findByGstinverificationId(Integer.valueOf(gstinDetails.getGstin()));
        if(ObjectUtils.isEmpty(byGstinverificationId)) {
            gstinDetails.setStatus("Declined");
        }else{
            gstinDetails.setStatus("Approved");
        }
        Verification verification = new Verification();
        verification.setMid(gstinDetails.getMid());
        verification.setBankStatus(gstinDetails.getStatus());
        String uri = "http://localhost:8080/api/verifications";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Verification> verificationResponseEntity = restTemplate.postForEntity(uri, verification, Verification.class);
         GstinDetails result =  gstinDetailsRepository.save(gstinDetails);
        return ResponseEntity.created(new URI("/api/gstin-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /gstin-details} : Updates an existing gstinDetails.
     *
     * @param gstinDetails the gstinDetails to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gstinDetails,
     * or with status {@code 400 (Bad Request)} if the gstinDetails is not valid,
     * or with status {@code 500 (Internal Server Error)} if the gstinDetails couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/gstin-details")
    public ResponseEntity<GstinDetails> updateGstinDetails(@RequestBody GstinDetails gstinDetails) throws URISyntaxException {
        if (StringUtils.isEmpty(gstinDetails.getMid())&&StringUtils.isEmpty(gstinDetails.getGstin())) {
            throw new BadRequestAlertException("A new GstinDetails  must have mandatory details", ENTITY_NAME, "idexists");
        }
        Gstinverification byGstinverificationId = gstinverificationRepository.findByGstinverificationId(Integer.valueOf(gstinDetails.getGstin()));
        if(ObjectUtils.isEmpty(byGstinverificationId)) {
            gstinDetails.setStatus("Declined");
        }else{
            gstinDetails.setStatus("Approved");
        }
        Verification verification = new Verification();
        verification.setMid(gstinDetails.getMid());
        verification.setBankStatus(gstinDetails.getStatus());
        String uri = "http://localhost:8080/api/verifications";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Verification> verificationResponseEntity = restTemplate.postForEntity(uri, verification, Verification.class);
        GstinDetails result =  gstinDetailsRepository.save(gstinDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, gstinDetails.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /gstin-details} : get all the gstinDetails.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of gstinDetails in body.
     */
    @GetMapping("/gstin-details")
    public List<GstinDetails> getAllGstinDetails(@RequestParam(required = false) String filter) {
        if ("buisnessinfo-is-null".equals(filter)) {
            log.debug("REST request to get all GstinDetailss where buisnessInfo is null");
            return StreamSupport
                .stream(gstinDetailsRepository.findAll().spliterator(), false)
                .filter(gstinDetails -> gstinDetails.getBuisnessInfo() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all GstinDetails");
        return gstinDetailsRepository.findAll();
    }

    /**
     * {@code GET  /gstin-details/:id} : get the "id" gstinDetails.
     *
     * @param id the id of the gstinDetails to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gstinDetails, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/gstin-details/{id}")
    public ResponseEntity<GstinDetails> getGstinDetails(@PathVariable Long id) {
        log.debug("REST request to get GstinDetails : {}", id);
        Optional<GstinDetails> gstinDetails = gstinDetailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gstinDetails);
    }

    /**
     * {@code DELETE  /gstin-details/:id} : delete the "id" gstinDetails.
     *
     * @param id the id of the gstinDetails to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/gstin-details/{id}")
    public ResponseEntity<Void> deleteGstinDetails(@PathVariable Long id) {
        log.debug("REST request to delete GstinDetails : {}", id);
        gstinDetailsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
