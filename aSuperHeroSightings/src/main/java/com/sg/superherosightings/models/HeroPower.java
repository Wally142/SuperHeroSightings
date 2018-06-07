
package com.sg.superherosightings.models;

import lombok.Data;

@Data
public class HeroPower {
    
    private Hero hero;
    private Power power;
    private int[] powerIds;

}
