
package com.sg.superherosightings.service;


import com.sg.superherosightings.data.LocationDao;
import com.sg.superherosightings.data.SightingDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class LocationAndSightingService {
    
    @Autowired
    private LocationDao location;
    
    @Autowired
    private SightingDao sighting;

}
