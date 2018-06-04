
package com.sg.superherosightings.data;

import com.sg.superherosightings.models.HeroSighting;
import java.util.List;


public interface BridgeDao {
    
    public Integer heroSighting (int a, int b);
    
    public Integer heroPowers (int a, int b);
    
    public List<HeroSighting> showRecentSightings();
    
}
