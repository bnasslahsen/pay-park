package com.pay.park.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pay.park.domain.Pricing;
import com.pay.park.repository.PricingRepository;
import com.pay.park.web.rest.errors.BadRequestAlertException;
import com.pay.park.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Pricing.
 */
@RestController
@RequestMapping("/api")
public class PricingResource {

    private final Logger log = LoggerFactory.getLogger(PricingResource.class);

    private static final String ENTITY_NAME = "pricing";

    private final PricingRepository pricingRepository;

    public PricingResource(PricingRepository pricingRepository) {
        this.pricingRepository = pricingRepository;
    }

    /**
     * POST  /pricings : Create a new pricing.
     *
     * @param pricing the pricing to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pricing, or with status 400 (Bad Request) if the pricing has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pricings")
    @Timed
    public ResponseEntity<Pricing> createPricing(@RequestBody Pricing pricing) throws URISyntaxException {
        log.debug("REST request to save Pricing : {}", pricing);
        if (pricing.getId() != null) {
            throw new BadRequestAlertException("A new pricing cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pricing result = pricingRepository.save(pricing);
        return ResponseEntity.created(new URI("/api/pricings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pricings : Updates an existing pricing.
     *
     * @param pricing the pricing to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pricing,
     * or with status 400 (Bad Request) if the pricing is not valid,
     * or with status 500 (Internal Server Error) if the pricing couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pricings")
    @Timed
    public ResponseEntity<Pricing> updatePricing(@RequestBody Pricing pricing) throws URISyntaxException {
        log.debug("REST request to update Pricing : {}", pricing);
        if (pricing.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Pricing result = pricingRepository.save(pricing);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pricing.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pricings : get all the pricings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pricings in body
     */
    @GetMapping("/pricings")
    @Timed
    public List<Pricing> getAllPricings() {
        log.debug("REST request to get all Pricings");
        return pricingRepository.findAll();
    }

    /**
     * GET  /pricings/:id : get the "id" pricing.
     *
     * @param id the id of the pricing to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pricing, or with status 404 (Not Found)
     */
    @GetMapping("/pricings/{id}")
    @Timed
    public ResponseEntity<Pricing> getPricing(@PathVariable Long id) {
        log.debug("REST request to get Pricing : {}", id);
        Optional<Pricing> pricing = pricingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pricing);
    }

    /**
     * DELETE  /pricings/:id : delete the "id" pricing.
     *
     * @param id the id of the pricing to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pricings/{id}")
    @Timed
    public ResponseEntity<Void> deletePricing(@PathVariable Long id) {
        log.debug("REST request to delete Pricing : {}", id);

        pricingRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
