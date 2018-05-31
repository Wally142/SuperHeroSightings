package com.sg.superherosightings.data;

import com.sg.superherosightings.models.Location;
import java.util.List;


public interface LocationDao {
    
    public List<Location> getAll();
    
    public Location getById(int id);
    
    public Location addLocation(Location location);
    
    public boolean editLocation(Location location);
    
    public boolean deleteLocation(int id);
    
    public Location saveLocation(Location location);
    
    
}
