
package com.sg.superherosightings.controllers;


import com.sg.superherosightings.service.BridgeTableService;
import com.sg.superherosightings.service.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    
    @PostMapping("/hero/{heroId}/{sightingId}")
    public ResponseEntity<Integer> addHero(@PathVariable int hero, @PathVariable int sighting) {

        Result<Integer> result = service.saveHeroSighting(hero, sighting);
        if (result.isSuccess()) {
            return ResponseEntity.ok(hero);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

}
