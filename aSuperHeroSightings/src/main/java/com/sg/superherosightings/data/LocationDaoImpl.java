
package com.sg.superherosightings.data;

import com.sg.superherosightings.models.Location;
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
public class LocationDaoImpl implements LocationDao {
    
     @Autowired
    private JdbcTemplate jt;

    @Override
    public List<Location> getAll() {
        return jt.query("SELECT * FROM location;", new LocationMapper());
    }

    @Override
    public Location getById(int id) {
        return jt.queryForObject(
                "SELECT * FROM location WHERE id = ?",
                new LocationMapper(), id);
    }

    @Override
    public Location addLocation(Location location) {
        jt.update(
                "INSERT INTO location (latitude, longitude, city, country) VALUES (?, ?, ?, ?);",
                location.getLatitude(),
                location.getLongitude(),
                location.getCity(),
                location.getCountry()
        );

        int id = jt.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);

        location.setId(id);
        return location;
    }

    @Override
    public boolean editLocation(Location location) {
        String sql = "UPDATE location SET"
                + " latitude = ?,"
                + " longitude = ?,"
                + " city = ?,"
                + " country = ?"
                + " WHERE id = ?;";

        return jt.update(sql,
                location.getLatitude(),
                location.getLongitude(),
                location.getCity(),
                location.getCountry(),
                location.getId()) > 0;
    }
    

    @Override
    public boolean deleteLocation(int id) {
        return jt.update("DELETE FROM location WHERE id = ?;", id) > 0;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public Location saveLocation(Location location) {
        if (location.getId() <= 0) {
            return addLocation(location);
        } else {
            if (editLocation(location)) {
                return location;
            }
        }
        return null;
    }

    private static final class LocationMapper implements RowMapper<Location> {

        @Override
        public Location mapRow(ResultSet rs, int i) throws SQLException {
            Location l = new Location();
            l.setId(rs.getInt("id"));
            l.setLatitude(rs.getBigDecimal("latitude"));
            l.setLongitude(rs.getBigDecimal("longitude"));
            l.setCity(rs.getString("city"));
            l.setCountry(rs.getString("country"));
            return l;
        }
    }
}
