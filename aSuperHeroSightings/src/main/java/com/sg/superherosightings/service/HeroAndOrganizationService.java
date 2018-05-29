
package com.sg.superherosightings.service;

import com.sg.superherosightings.data.HeroDao;
import com.sg.superherosightings.data.OrganizationDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class HeroAndOrganizationService {
    
    @Autowired
    private HeroDao hero;

    @Autowired
    private OrganizationDao organization;
}
