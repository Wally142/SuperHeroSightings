
package com.sg.superherosightings.service;


import com.sg.superherosightings.data.LocationDao;
import com.sg.superherosightings.data.SightingDao;
import com.sg.superherosightings.models.Hero;
import com.sg.superherosightings.models.Location;
import com.sg.superherosightings.models.Organization;
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
    
    public void deleteLocation(int logId) {
        location.deleteLocation(logId);
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
}



//==========================SIGHTING METHODS============================
