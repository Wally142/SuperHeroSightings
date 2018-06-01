package com.sg.superherosightings.data;

import com.sg.superherosightings.models.Hero;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Component
public class HeroDaoImpl implements HeroDao {

    @Autowired
    private JdbcTemplate jt;

    @Override
    public List<Hero> getHeroes() {
        return jt.query("SELECT * FROM hero where villain = FALSE;", new HeroMapper());
    }
    
    @Override
    public List<Hero> getVillains() {
        return jt.query("SELECT * FROM hero where villain = True;", new HeroMapper());
    }

    @Override
    public Hero getHeroById(int id) {
        return jt.queryForObject(
                "SELECT * FROM hero WHERE id = ?",
                new HeroMapper(), id);
    }

    @Override
    public Hero addHero(Hero hero) {
        jt.update(
                "INSERT INTO hero (name, description, city, villain) VALUES (?, ?, ?, ?);",
                hero.getName(),
                hero.getDescription(),
                hero.getCity(),
                hero.isVillain()
        );

        int id = jt.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);

        hero.setId(id);
        return hero;
    }

    @Override
    public boolean editHero(Hero hero) {

        String sql = "UPDATE hero SET"
                + " name = ?,"
                + " description = ?,"
                + " city = ?,"
                + " villain = ?"
                + " WHERE id = ?;";

        return jt.update(sql,
                hero.getName(),
                hero.getDescription(),
                hero.getCity(),
                hero.isVillain(),
                hero.getId()) > 0;
    }

    @Override
    public boolean deleteHero(int id) {
        return jt.update("DELETE FROM hero WHERE id = ?;", id) > 0;
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    @Override
    public Hero saveHero(Hero hero) {
        if (hero.getId() <= 0) {
            return addHero(hero);
        } else {
            if (editHero(hero)) {
                return hero;
            }
        }
        return null;
    }

    private static final class HeroMapper implements RowMapper<Hero> {

        @Override
        public Hero mapRow(ResultSet rs, int i) throws SQLException {
            Hero h = new Hero();
            h.setId(rs.getInt("id"));
            h.setName(rs.getString("name"));
            h.setDescription(rs.getString("description"));
            h.setCity(rs.getString("city"));
            h.setVillain(rs.getBoolean("villain"));

            return h;
        }
    }
}
