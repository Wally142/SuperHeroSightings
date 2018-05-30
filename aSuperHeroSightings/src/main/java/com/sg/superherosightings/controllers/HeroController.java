package com.sg.superherosightings.controllers;

import com.sg.superherosightings.models.Hero;
import com.sg.superherosightings.service.HeroAndOrganizationService;
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
@RequestMapping("/api")
public class HeroController {

    @Autowired
    private HeroAndOrganizationService heroService;

    @Autowired
    private LocationAndSightingService locationService;

    @GetMapping("/heroes")
    public List<Hero> getAllHeroes() {
        return heroService.getAllHeroes();
    }

    @GetMapping("/hero/{heroId}")
    public Hero getHeroById(@PathVariable int heroId) {
        return heroService.getHeroById(heroId);

    }

    @PostMapping("/hero")
    public ResponseEntity<Hero> addHero(@RequestBody Hero hero) {

        heroService.save(hero);

        return ResponseEntity.ok(hero);
    }

    @PutMapping("/hero/{heroId}")
    public ResponseEntity<Void> updateHero(@PathVariable int heroId, @RequestBody Hero hero) {
        if (hero.getId() <= 0 || heroId <= 0 || heroId != hero.getId()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Result<Hero> result = heroService.save(hero);
        if (result.isSuccess()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/hero/{heroId}")
    public ResponseEntity<Void> deleteHero(@PathVariable int heroId) {
        
        heroService.deleteHero(heroId);
        
        return ResponseEntity.ok().build();
        
    }
}
