
package com.sg.superherosightings.controllers;

import com.sg.superherosightings.models.Sighting;
import com.sg.superherosightings.service.LocationAndSightingService;
import com.sg.superherosightings.service.Result;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sighting")
public class SightingController {
    
    @Autowired
    private LocationAndSightingService sightingService;
    
    @GetMapping("/all")
    public List<Sighting> getSightings() {
        return sightingService.getAllSightings();
    }

    @GetMapping("/{id}")
    public Sighting getSightingById(@PathVariable int id) {
        return sightingService.getSightingById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<Sighting> addSighting(@RequestBody Sighting sighting) {

        Result<Sighting> result = sightingService.saveSighting(sighting);
        if (result.isSuccess()) {
            return ResponseEntity.ok(sighting);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateSighting(@PathVariable int id, @RequestBody Sighting sighting) {

        if (sighting.getId() <= 0 || id <= 0 || id != sighting.getId()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Result<Sighting> result = sightingService.saveSighting(sighting);
        if (result.isSuccess()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSighting(@PathVariable int id) {

        sightingService.deleteSighting(id);
        return ResponseEntity.ok().build();
    }

}
