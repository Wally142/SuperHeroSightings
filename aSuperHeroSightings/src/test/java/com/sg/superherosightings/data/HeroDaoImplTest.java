package com.sg.superherosightings.data;

import com.sg.superherosightings.models.Hero;
import java.util.List;
import org.junit.Test;
import static org.junit.Assert.*;

public class HeroDaoImplTest {

    private HeroDao heroDao = new HeroDaoImpl();

    @Test
    public void testGetHeroes() {

        List<Hero> heroes = heroDao.getHeroes();
        assertTrue(heroes.size() > 0);
    }

    @Test
    public void testGetHeroById() {
        
        Hero hero = heroDao.getHeroById(1);
        assertEquals(hero.getName(), "Batman" );
    }

    @Test
    public void testAddHero() {
        Hero hero = new Hero();
        hero.setName("Wonder Woman");
        hero.setDescription("Powerful Amazon Warrior");
        hero.setCity("Themyscyra");
        hero.setVillain(false);
        
        Hero addedHero = heroDao.addHero(hero);
        Hero fromDB = heroDao.getHeroById(addedHero.getId());
        
        assertEquals(addedHero, fromDB);
    }

    
    @Test
    public void testEditHero() {
        Hero hero = heroDao.getHeroById(4);
        hero.setDescription("Known as the fastest man alive and a founding member of the Justice League");
        
        Hero heroEdit = heroDao.save(hero);
        hero = heroDao.getHeroById(4);
        
        assertEquals(hero, heroEdit);
        
        
    }

    @Test
    public void testDeleteHero() {
        Hero hero = heroDao.getHeroById(5);
        
        heroDao.deleteHero(5);
        
        assertNull(hero);
    }

 }
