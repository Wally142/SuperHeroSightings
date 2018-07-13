package com.sg.superherosightings.data;

import com.sg.superherosightings.models.Hero;
import com.sg.superherosightings.models.Power;
import java.util.List;


public interface HeroDao {
    
    public List<Hero> getHeroes();
    
    public List<Hero> getAll();
    
    public List<Hero> getVillains();
    
    public Hero getHeroById (int hero);
    
    public Hero addHero(Hero hero);
    
    public boolean editHero(Hero hero);
    
    public boolean deleteHero(int id);
    
    public Hero saveHero(Hero hero);
    
    public List<Power> getPowers();
    
    }
