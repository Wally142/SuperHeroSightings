package com.sg.superherosightings.models;

import java.time.LocalDate;
import java.util.List;
import lombok.Data;

@Data
public class Sighting {

    private int id;
    private LocalDate sighted;
    private List<Hero> heroes;
}
