
package com.sg.superherosightings.models;

import lombok.Data;

@Data
public class HeroOrganization {
    
    private Hero hero;
    private Organization org;
    private int[] orgIds;

}
