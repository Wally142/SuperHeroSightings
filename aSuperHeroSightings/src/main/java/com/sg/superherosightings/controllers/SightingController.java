//
//package com.sg.superherosightings.controllers;
//
//import com.sg.superherosightings.models.Location;
//import com.sg.superherosightings.service.LocationAndSightingService;
//import com.sg.superherosightings.service.Result;
//import java.util.List;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/site")
//public class SightingController {
//    
//    @Autowired
//    private LocationAndSightingService sighting;
//    
//    @GetMapping("/all")
//    public List<Location> getLocations() {
//        return sightingService.getAllLocations();
//    }
//
//    @GetMapping("/{locId}")
//    public Location getLocationById(@PathVariable int locId) {
//        return sightingService.getLocationById(locId);
//    }
//
//    @PostMapping("/add")
//    public ResponseEntity<Location> addLocation(@RequestBody Location loc) {
//
//        Result<Location> result = sightingService.saveLocation(loc);
//        if (result.isSuccess()) {
//            return ResponseEntity.ok(loc);
//        } else {
//            return ResponseEntity.noContent().build();
//        }
//    }
//
//    @PutMapping("/{locId}")
//    public ResponseEntity<Void> updateOrg(@PathVariable int locId, @RequestBody Location loc) {
//
//        if (loc.getId() <= 0 || locId <= 0 || locId != loc.getId()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//
//        Result<Location> result = sightingService.saveLocation(loc);
//        if (result.isSuccess()) {
//            return ResponseEntity.ok().build();
//        } else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//
//    @DeleteMapping("/{locId}")
//    public ResponseEntity<Void> deleteOrg(@PathVariable int locId) {
//
//        sightingService.deleteLocation(locId);
//        return ResponseEntity.ok().build();
//    }
//
//}
