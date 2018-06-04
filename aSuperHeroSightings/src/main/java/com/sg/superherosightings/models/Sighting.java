package com.sg.superherosightings.models;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

@Data
public class Sighting {

    private int id;
    private int locationId;
    private LocalDate sighted;
    private List<Hero> heroes;
}
