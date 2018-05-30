package com.sg.superherosightings.service;

import com.sg.superherosightings.data.HeroDao;
import com.sg.superherosightings.data.OrganizationDao;
import com.sg.superherosightings.models.Hero;
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
    private OrganizationDao organizationDao;

    public List<Hero> getAllHeroes() {
        return heroDao.getHeroes();
    }

    public Hero getHeroById(int id) {
        return heroDao.getHeroById(id);
    }

    public void deleteHero(int id) {
        heroDao.deleteHero(id);
    }

    public Result<Hero> save(Hero hero) {
        Result<Hero> result = validate(hero);
        if (result.isSuccess()) {
            heroDao.save(hero);
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
}
