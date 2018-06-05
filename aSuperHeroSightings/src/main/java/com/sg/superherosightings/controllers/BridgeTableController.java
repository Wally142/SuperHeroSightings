package com.sg.superherosightings.controllers;

import com.sg.superherosightings.models.HeroOrganization;
import com.sg.superherosightings.models.HeroPower;
import com.sg.superherosightings.models.HeroSighting;
import com.sg.superherosightings.service.BridgeTableService;
import com.sg.superherosightings.service.Result;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bridge")
public class BridgeTableController {

    @Autowired
    private BridgeTableService service;

    @GetMapping("/powers/{heroId}")
    public List<HeroPower> getAllPowers(@PathVariable int heroId) {
        return service.getAllPowers(heroId);
    }
    
    @GetMapping("/organization/{orgId}")
    public List<HeroOrganization> getAllOrganizations(@PathVariable int orgId) {
        return service.getAllOrganizations(orgId);
    }
    
    @GetMapping("/sighting")
    public List<HeroSighting> getAllSightings() {
        return service.getAllSightings();
    }

    @GetMapping("/power/{heroId}/{powerId}")
    public ResponseEntity<Integer> addHeroPower(@PathVariable int heroId, @PathVariable int powerId) {

        Result<Integer> result = service.saveHeroPower(heroId, powerId);
        if (result.isSuccess()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/hero/{heroId}/{sightingId}")
    public ResponseEntity<Integer> addHeroSight(@PathVariable int heroId, @PathVariable int sightingId) {

        Result<Integer> result = service.saveHeroSighting(heroId, sightingId);
        if (result.isSuccess()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/org/{heroId}/{orgId}")
    public ResponseEntity<Integer> addHeroOrg(@PathVariable int heroId, @PathVariable int orgId) {

        Result<Integer> result = service.saveHeroOrg(heroId, orgId);
        if (result.isSuccess()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.noContent().build();
        }
    }
}
