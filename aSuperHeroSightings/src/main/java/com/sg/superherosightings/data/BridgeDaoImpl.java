package com.sg.superherosightings.data;

import com.sg.superherosightings.models.Hero;
import com.sg.superherosightings.models.HeroSighting;
import com.sg.superherosightings.models.Location;
import com.sg.superherosightings.models.Sighting;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Component
public class BridgeDaoImpl implements BridgeDao {

    @Autowired
    private JdbcTemplate jt;

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public Integer heroSighting(int hero, int sighting) {
        jt.update(
                "INSERT INTO hero_sighting (hero_id, sighting_id) VALUES (?, ?);",
                hero,
                sighting
        );

        return hero;
    }
    
    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public Integer heroPowers(int hero, int powers) {
        jt.update(
                "INSERT INTO hero_power (hero_id, power_id) VALUES (?, ?);",
                hero,
                powers
        );

        return hero;
        
    }

    @Override
    public List<HeroSighting> showRecentSightings() {
        return jt.query("select  h.name, l.city, l.country , s.sighted\n"
                + "from hero_sighting hs\n"
                + "Inner Join hero h on h.id = hs.hero_id\n"
                + "Inner Join sighting s on s.id = hs.sighting_id\n"
                + "Inner Join location l  on l.id = s.locationId;", new HeroSightMapper());
    }

    private static final class HeroSightMapper implements RowMapper<HeroSighting> {

        @Override
        public HeroSighting mapRow(ResultSet rs, int i) throws SQLException {
            HeroSighting hs = new HeroSighting();

            Hero h = new Hero();
            Location l = new Location();
            Sighting s = new Sighting();

            h.setName((rs.getString("name")));
            hs.setHero(h);

            l.setCity((rs.getString("city")));
            l.setCountry((rs.getString("country")));
            hs.setLocation(l);

            s.setSighted(rs.getDate("sighted").toLocalDate());
            hs.setSight(s);

            return hs;
        }
    }

}
