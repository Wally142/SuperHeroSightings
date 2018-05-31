package com.sg.superherosightings.models;

import java.util.List;
import lombok.Data;


@Data
public class Hero {

    private int id;
    private String name;
    private String description;
    private String city;
    private boolean villain;
    private List<Power> powers;
    private List<Organization> orgs;
                    
}
