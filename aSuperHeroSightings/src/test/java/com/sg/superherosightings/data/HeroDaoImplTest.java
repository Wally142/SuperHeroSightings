package com.sg.superherosightings.data;

import com.sg.superherosightings.models.Hero;
import java.util.List;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HeroDaoImplTest {

    @Autowired
    private HeroDao heroDao = new HeroDaoImpl();

//   @Test
//    public void testAddHero() {
//        Hero hero = new Hero();
//        hero.setName("Wonder Woman");
//        hero.setDescription("Powerful Amazon Warrior");
//        hero.setCity("Themyscyra");
//        hero.setVillain(false);
//
//        Hero newHero = heroDao.addHero(hero);
//
//        Hero fromDB = heroDao.getHeroById(newHero.getId());
//       
//        assertEquals(newHero.getName(), fromDB.getName());
//    }

//    @Test
//    public void testEditHero() {
//
//        Hero hero = heroDao.getHeroById(2);
//
//        hero.setName("Batman");
//        hero.setDescription("The Dark Knight, does not like Guns");
//        hero.setCity("Gotham");
//        hero.setVillain(false);
//
//        Hero heroEdit = heroDao.saveHero(hero);
//        Hero db = heroDao.getHeroById(hero.getId());
//
//        assertEquals(db, heroEdit);
//    }
//
//    @Test
//    public void testGetHeroes() {
//
//        List<Hero> heroes = heroDao.getHeroes();
//        assertTrue(heroes.size() > 0);
//    }
//
//    @Test
//    public void testGetHeroById() {
//
//        Hero hero = heroDao.getHeroById(1);
//        assertEquals(hero.getName(), "The Flash");
//    }

//    @Test
//    public void testDeleteHero() {
//
//        heroDao.deleteHero(5);
//
//        Hero hero = heroDao.getHeroById(5);
//        assertNull(hero);
//    }
}
