package com.sg.superherosightings.service;

import com.sg.superherosightings.data.LocationDao;
import com.sg.superherosightings.data.SightingDao;
import com.sg.superherosightings.models.Location;
import com.sg.superherosightings.models.Sighting;
import java.util.List;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LocationAndSightingService {

    @Autowired
    private LocationDao location;

    @Autowired
    private SightingDao sighting;

    public List<Location> getAllLocations() {
        return location.getAll();
    }

    public Location getLocationById(int id) {
        return location.getById(id);
    }

    public Result<Location> saveLocation(Location loc) {
        Result<Location> result = validate(loc);
        if (result.isSuccess()) {
            location.saveLocation(loc);
        }
        return result;
    }

    public void deleteLocation(int id) {
        location.deleteLocation(id);
    }

    private Result<Location> validate(Location loc) {

        Result<Location> result = new Result<>();

        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<Location>> errs = validator.validate(loc);
        for (ConstraintViolation<Location> err : errs) {
            result.addMessage(err.getMessage());
        }

        return result;
    }


//==========================SIGHTING METHODS===================================
    
    
    
    public List<Sighting> getAllSightings() {
        return sighting.getAll();
    }

    public Sighting getSightingById(int siteId) {
        return sighting.getById(siteId);
    }

    public Result<Sighting> saveSighting(Sighting sight) {
        Result<Sighting> result = validate(sight);
        if (result.isSuccess()) {
            sighting.saveSight(sight);
        }
        return result;
    }

    public void deleteSighting(int id) {
        sighting.deleteSighting(id);
    }

    private Result<Sighting> validate(Sighting sighting) {

        Result<Sighting> result = new Result<>();

        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<Sighting>> errs = validator.validate(sighting);
        for (ConstraintViolation<Sighting> err : errs) {
            result.addMessage(err.getMessage());
        }

        return result;
    }
}
