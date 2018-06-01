
package com.sg.superherosightings.models;

import java.util.List;
import lombok.Data;

@Data
public class Organization {
    
    private int id;
    private String name;
    private String description;
    private String location;
    private List<Hero> heroes;

}
