package com.fss.onboard.web.rest;

import com.fss.onboard.domain.BuisnessInfo;
import com.fss.onboard.repository.BuisnessInfoRepository;
import com.fss.onboard.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.fss.onboard.domain.BuisnessInfo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BuisnessInfoResource {

    private final Logger log = LoggerFactory.getLogger(BuisnessInfoResource.class);

    private static final String ENTITY_NAME = "buisnessInfo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BuisnessInfoRepository buisnessInfoRepository;

    public BuisnessInfoResource(BuisnessInfoRepository buisnessInfoRepository) {
        this.buisnessInfoRepository = buisnessInfoRepository;
    }

    /**
     * {@code POST  /buisness-infos} : Create a new buisnessInfo.
     *
     * @param buisnessInfo the buisnessInfo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new buisnessInfo, or with status {@code 400 (Bad Request)} if the buisnessInfo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/buisness-infos")
    public ResponseEntity<BuisnessInfo> createBuisnessInfo(@RequestBody BuisnessInfo buisnessInfo) throws URISyntaxException {
        log.debug("REST request to save BuisnessInfo : {}", buisnessInfo);
        if (buisnessInfo.getId() != null) {
            throw new BadRequestAlertException("A new buisnessInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BuisnessInfo result = buisnessInfoRepository.save(buisnessInfo);
        return ResponseEntity.created(new URI("/api/buisness-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /buisness-infos} : Updates an existing buisnessInfo.
     *
     * @param buisnessInfo the buisnessInfo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated buisnessInfo,
     * or with status {@code 400 (Bad Request)} if the buisnessInfo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the buisnessInfo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/buisness-infos")
    public ResponseEntity<BuisnessInfo> updateBuisnessInfo(@RequestBody BuisnessInfo buisnessInfo) throws URISyntaxException {
        log.debug("REST request to update BuisnessInfo : {}", buisnessInfo);
        if (buisnessInfo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BuisnessInfo result = buisnessInfoRepository.save(buisnessInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, buisnessInfo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /buisness-infos} : get all the buisnessInfos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of buisnessInfos in body.
     */
    @GetMapping("/buisness-infos")
    public ResponseEntity<List<BuisnessInfo>> getAllBuisnessInfos(Pageable pageable) {
        log.debug("REST request to get a page of BuisnessInfos");
        Page<BuisnessInfo> page = buisnessInfoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /buisness-infos/:id} : get the "id" buisnessInfo.
     *
     * @param id the id of the buisnessInfo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the buisnessInfo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/buisness-infos/{id}")
    public ResponseEntity<BuisnessInfo> getBuisnessInfo(@PathVariable Long id) {
        log.debug("REST request to get BuisnessInfo : {}", id);
        Optional<BuisnessInfo> buisnessInfo = buisnessInfoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(buisnessInfo);
    }

    /**
     * {@code DELETE  /buisness-infos/:id} : delete the "id" buisnessInfo.
     *
     * @param id the id of the buisnessInfo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/buisness-infos/{id}")
    public ResponseEntity<Void> deleteBuisnessInfo(@PathVariable Long id) {
        log.debug("REST request to delete BuisnessInfo : {}", id);
        buisnessInfoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
