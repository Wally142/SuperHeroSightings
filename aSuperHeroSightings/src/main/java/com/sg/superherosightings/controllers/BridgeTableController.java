
package com.sg.superherosightings.controllers;


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
    
    @GetMapping("/sighting")
    public List<HeroSighting> getAllSightings() {
        return service.getAllSightings();
    }
    
    @GetMapping("/power")
    public ResponseEntity<Integer> addHeroPower(@PathVariable int heroId, @PathVariable int sightingId) {

        Result<Integer> result = service.saveHeroPower(heroId, sightingId);
        if (result.isSuccess()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    
    @GetMapping("/hero/{heroId}/{sightingId}")
    public ResponseEntity<Integer> addHero(@PathVariable int heroId, @PathVariable int sightingId) {

        Result<Integer> result = service.saveHeroSighting(heroId, sightingId);
        if (result.isSuccess()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.noContent().build();
        }
    }

}
