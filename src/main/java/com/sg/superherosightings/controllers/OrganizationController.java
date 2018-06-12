package com.sg.superherosightings.controllers;

import com.sg.superherosightings.models.Hero;
import com.sg.superherosightings.models.Organization;
import com.sg.superherosightings.service.HeroAndOrganizationService;
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
@RequestMapping("/api/org")
public class OrganizationController {

    @Autowired
    private HeroAndOrganizationService heroService;

    @GetMapping("/all")
    public List<Organization> getOrganizations() {
        return heroService.getOrganizations();
    }

    @GetMapping("/{orgId}")
    public Organization getOrgById(@PathVariable int orgId) {
        return heroService.getOrgById(orgId);
    }

    @PostMapping("/add")
    public ResponseEntity<Organization> addOrg(@RequestBody Organization org) {

        Result<Organization> result = heroService.saveOrg(org);
        if (result.isSuccess()) {
            return ResponseEntity.ok(org);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @PutMapping("/{orgId}")
    public ResponseEntity<Void> updateOrg(@PathVariable int orgId, @RequestBody Organization org) {

        if (org.getId() <= 0 || orgId <= 0 || orgId != org.getId()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Result<Organization> result = heroService.saveOrg(org);
        if (result.isSuccess()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{orgId}")
    public ResponseEntity<Void> deleteOrg(@PathVariable int orgId) {

        heroService.deleteOrg(orgId);
        return ResponseEntity.ok().build();
    }

}
