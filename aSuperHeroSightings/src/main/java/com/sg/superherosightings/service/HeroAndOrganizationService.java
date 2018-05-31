package com.sg.superherosightings.service;

import com.sg.superherosightings.data.HeroDao;
import com.sg.superherosightings.data.OrganizationDao;
import com.sg.superherosightings.models.Hero;
import com.sg.superherosightings.models.Organization;
import java.util.List;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class HeroAndOrganizationService {

    @Autowired
    private HeroDao heroDao;

    @Autowired
    private OrganizationDao orgDao;

    public List<Hero> getAllHeroes() {
        return heroDao.getHeroes();
    }

    public Hero getHeroById(int id) {
        return heroDao.getHeroById(id);
    }

    public void deleteHero(int id) {
        heroDao.deleteHero(id);
    }

    public Result<Hero> saveHero(Hero hero) {
        Result<Hero> result = validate(hero);
        if (result.isSuccess()) {
            heroDao.saveHero(hero);
        }
        return result;
    }

    
    private Result<Hero> validate(Hero hero) {

        Result<Hero> result = new Result<>();

        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<Hero>> errs = validator.validate(hero);
        for (ConstraintViolation<Hero> err : errs) {
            result.addMessage(err.getMessage());
        }

       return result;
    }
    
    


//==========================ORGANIZATION METHODS============================

    
    public List<Organization> getOrganizations() {
        return orgDao.getAll();
    }

    public Organization getOrgById(int orgId) {
        return orgDao.getById(orgId);
    }

    public Result<Organization> saveOrg(Organization org) {
         Result<Organization> result = validate(org);
        if (result.isSuccess()) {
            orgDao.saveOrg(org);
        }
        return result;
    }
    
public void deleteOrg(int orgId) {
        orgDao.deleteOrganization(orgId);
    }
    
    private Result<Organization> validate(Organization org) {

        Result<Organization> result = new Result<>();

        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<Organization>> errs = validator.validate(org);
        for (ConstraintViolation<Organization> err : errs) {
            result.addMessage(err.getMessage());
        }

       return result;
    }
}
