package com.sg.superherosightings.controllers;

import com.sg.superherosightings.service.HeroAndOrganizationService;
import com.sg.superherosightings.service.LocationAndSightingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
public class HeroController {
    
    @Autowired
    private HeroAndOrganizationService heroService;
    
    @Autowired
    private LocationAndSightingService locationService;

}
