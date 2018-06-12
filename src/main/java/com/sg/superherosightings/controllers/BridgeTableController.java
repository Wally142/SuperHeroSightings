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
import org.springframework.web.bind.annotation.PutMapping;
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
    
    @GetMapping("/orgmembers/{orgId}")
    public List<HeroOrganization> getAllMembers(@PathVariable int orgId) {
        return service.getAllMembers(orgId);
    }
    
    @GetMapping("/sighting")
    public List<HeroSighting> getAllSightings() {
        return service.getAllSightings();
    }

    @PostMapping("/power/{heroId}")
    public ResponseEntity<Integer> addHeroPower(@PathVariable int heroId, @RequestBody HeroPower pow) {

        Result<Integer> result = service.saveHeroPower(heroId, pow);
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

    @PostMapping("/org/{heroId}")
    public ResponseEntity<Integer> addHeroOrg(@PathVariable int heroId, @RequestBody HeroOrganization orgId) {

        Result<Integer> result = service.saveHeroOrg(heroId, orgId);
        if (result.isSuccess()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    
    @PutMapping("/power/edit/{heroId}")
    public ResponseEntity<Integer> editHeroPower(@PathVariable int heroId, @RequestBody HeroPower pow) {

        Result<Integer> result = service.editHeroPower(heroId, pow);
        if (result.isSuccess()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    
     @PutMapping("/org/edit/{heroId}")
    public ResponseEntity<Integer> editHeroOrg(@PathVariable int heroId, @RequestBody HeroOrganization orgId) {

        Result<Integer> result = service.editHeroOrg(heroId, orgId);
        if (result.isSuccess()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.noContent().build();
        }
    }
}
