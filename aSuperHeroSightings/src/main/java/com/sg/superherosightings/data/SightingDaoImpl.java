
package com.sg.superherosightings.data;

import com.sg.superherosightings.models.Sighting;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
public class SightingDaoImpl implements SightingDao {
    
     @Autowired
    private JdbcTemplate jt;

    @Override
    public List<Sighting> getAll() {
        return jt.query("SELECT * FROM sighting;", new SightMapper());
    }

    @Override
    public Sighting getById(int id) {
        return jt.queryForObject(
                "SELECT * FROM sighting WHERE id = ?",
                new SightMapper(), id);
    }

    @Override
    public Sighting addSighting(Sighting sight) {
        System.out.println("location id " + sight.getLocationId());
        jt.update(
                "INSERT INTO sighting (locationId, sighted) VALUES (?, ?);",
                sight.getLocationId(),
                sight.getSighted()
                
        );

        int id = jt.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);

        sight.setId(id);
        return sight;
    }
    

    @Override
    public boolean editSighting(Sighting sight) {
        String sql = "UPDATE sighting SET"
                + " location_id = ?,"
                + " sighted = ?"
                + " WHERE id = ?;";

        return jt.update(sql,
                sight.getLocationId(),
                sight.getSighted(),
                sight.getId()) > 0;
    }

    @Override
    public boolean deleteSighting(int id) {
        return jt.update("DELETE FROM sighting WHERE id = ?;", id) > 0;
    }

    @Override
    public Sighting saveSight(Sighting sight) {
        if (sight.getId() <= 0) {
            return addSighting(sight);
        } else {
            if (editSighting(sight)) {
                return sight;
            }
        }
        return null;
    }

    private static final class SightMapper implements RowMapper<Sighting> {

        @Override
        public Sighting mapRow(ResultSet rs, int i) throws SQLException {
            Sighting s = new Sighting();
            s.setId(rs.getInt("id"));
            s.setSighted(rs.getDate("sighted").toLocalDate());
            return s;
        }
    }

}
