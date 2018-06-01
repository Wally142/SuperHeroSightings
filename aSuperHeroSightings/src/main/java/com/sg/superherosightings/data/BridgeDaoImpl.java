
package com.sg.superherosightings.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class BridgeDaoImpl implements BridgeDao {
    
    @Autowired
    private JdbcTemplate jt;

    @Override
    public Integer heroSighting(int hero, int sighting) {
        jt.update(
                "INSERT INTO hero_sighting (hero_id, sighting_id) VALUES (?, ?);",
                hero,
                sighting              
        );

//        int id = jt.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
//
//        hero.setId(id);
        return hero;
    }

}
