
package com.sg.superherosightings.data;

import com.sg.superherosightings.models.Sighting;
import java.util.List;


public interface BridgeDao {
    
    public Integer heroSighting (int a, int b);
    
    public List<Sighting> showRecentSightings();
    
}
