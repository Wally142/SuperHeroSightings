package com.sg.superherosightings.data;

import com.sg.superherosightings.models.Organization;
import java.util.List;

public interface OrganizationDao {
    
    public List<Organization> getAll();
    
    public Organization getById(int id);
    
    public Organization addOrganization(Organization org);
    
    public boolean editOrganization(Organization org);
    
    public boolean deleteOrganization(int id);
    
    public Organization saveOrg(Organization org);
    
    
    
}
