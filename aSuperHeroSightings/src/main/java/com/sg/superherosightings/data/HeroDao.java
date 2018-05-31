package com.sg.superherosightings.data;

import com.sg.superherosightings.models.Hero;
import com.sg.superherosightings.service.Result;
import java.util.List;


public interface HeroDao {
    
    public List<Hero> getHeroes();
    
    public Hero getHeroById (int hero);
    
    public Hero addHero(Hero hero);
    
    public boolean editHero(Hero hero);
    
    public boolean deleteHero(int id);
    
    public Hero saveHero(Hero hero);
    
}
