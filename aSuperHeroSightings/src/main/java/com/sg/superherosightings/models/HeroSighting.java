
package com.sg.superherosightings.models;

import lombok.Data;

@Data
public class HeroSighting {
    
    private Hero hero;
    private Location location;
    private Sighting sight;

}
