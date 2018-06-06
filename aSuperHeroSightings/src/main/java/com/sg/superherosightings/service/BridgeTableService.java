package com.sg.superherosightings.service;

import com.sg.superherosightings.data.BridgeDao;
import com.sg.superherosightings.models.HeroOrganization;
import com.sg.superherosightings.models.HeroPower;
import com.sg.superherosightings.models.HeroSighting;
import java.util.List;
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
    
    public List<HeroSighting> getAllSightings() {
        return dao.showRecentSightings();
    }
    
    public List<HeroPower> getAllPowers(int heroId) {
        return dao.allHeroPowers(heroId);
    }

    public List<HeroOrganization> getAllOrganizations(int orgId) {
        return dao.allHeroOrganizations(orgId);
    }
    
    public List<HeroOrganization> getAllMembers(int orgId) {
        return dao.AllOrganizationMembers(orgId);
    }
    
     public Result<Integer> saveHeroPower(int heroId, int powers) {
         Result<Integer> result = validate(heroId, powers);
        if (result.isSuccess()) {
            dao.heroPowers(heroId, powers);
        }
        return result;
        
    }

    public Result<Integer> saveHeroSighting(int hero, int sighting) {
        Result<Integer> result = validate(hero, sighting);
        if (result.isSuccess()) {
            dao.heroSighting(hero, sighting);
        }
        return result;
    }
    
     public Result<Integer> saveHeroOrg(int heroId, int orgId) {
        Result<Integer> result = validate(heroId, orgId);
        if (result.isSuccess()) {
            dao.heroOrganization(heroId, orgId);
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
