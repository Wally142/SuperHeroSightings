
package com.sg.superherosightings.data;

import com.sg.superherosightings.models.Sighting;
import java.util.List;


public interface SightingDao {
    
    public List<Sighting> getAll();
    
    public Sighting getById(int id);
    
    public Sighting addSighting(Sighting sight);
    
    public boolean editSighting(Sighting sight);
    
    public boolean deleteSighting(int id);
    
    public Sighting saveSight(Sighting sight);
    
}
