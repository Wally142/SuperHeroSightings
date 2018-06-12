
package com.sg.superherosightings.models;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class Location {
    
    private int id;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String city;
    private String country;
    
}
