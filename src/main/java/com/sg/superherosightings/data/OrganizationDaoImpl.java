package com.sg.superherosightings.data;

import com.sg.superherosightings.models.Organization;
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
public class OrganizationDaoImpl implements OrganizationDao {

    @Autowired
    private JdbcTemplate jt;

    @Override
    public List<Organization> getAll() {
        return jt.query("SELECT * FROM organization;", new OrganizationMapper());
    }

    @Override
    public Organization getById(int id) {
        return jt.queryForObject(
                "SELECT * FROM organization WHERE id = ?",
                new OrganizationMapper(), id);
    }

    @Override
    public Organization addOrganization(Organization org) {
        jt.update(
                "INSERT INTO organization (name, description, location) VALUES (?, ?, ?);",
                org.getName(),
                org.getDescription(),
                org.getLocation()
        );

        int id = jt.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);

        org.setId(id);
        return org;
    }

    @Override
    public boolean editOrganization(Organization org) {
        String sql = "UPDATE organization SET"
                + " name = ?,"
                + " description = ?,"
                + " location = ?"
                + " WHERE id = ?;";

        return jt.update(sql,
                org.getName(),
                org.getDescription(),
                org.getLocation(),
                org.getId()) > 0;
    }

    @Override
    public boolean deleteOrganization(int id) {
        return jt.update("DELETE FROM organization WHERE id = ?;", id) > 0;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public Organization saveOrg(Organization org) {
        if (org.getId() <= 0) {
            return addOrganization(org);
        } else {
            if (editOrganization(org)) {
                return org;
            }
        }
        return null;
    }

    private static final class OrganizationMapper implements RowMapper<Organization> {

        @Override
        public Organization mapRow(ResultSet rs, int i) throws SQLException {
            Organization o = new Organization();
            o.setId(rs.getInt("id"));
            o.setName(rs.getString("name"));
            o.setDescription(rs.getString("description"));
            o.setLocation(rs.getString("location"));
            return o;
        }
    }
}
