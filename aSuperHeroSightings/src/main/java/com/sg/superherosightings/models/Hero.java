package com.sg.superherosightings.models;

import lombok.Data;


@Data
public class Hero {

    private int id;
    private String name;
    private String description;
    private String city;
    private boolean villain;
                    
}
