
package com.sg.superherosightings.service;

import com.sg.superherosightings.data.BridgeDao;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BridgeTableService {
    
    @Autowired
    private BridgeDao dao;

    public Result<Integer> saveHeroSighting(int hero, int sighting) {
        Result<Integer> result = validate(hero, sighting);
        if (result.isSuccess()) {
            dao.heroSighting(hero, sighting);
        }
        return result;
    }

    private Result<Integer> validate(int hero, int sighting) {

        Result<Integer> result = new Result<>();

        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<Integer>> errs = validator.validate(hero);
        for (ConstraintViolation<Integer> err : errs) {
            result.addMessage(err.getMessage());
        }

       return result;
    }
    
}
