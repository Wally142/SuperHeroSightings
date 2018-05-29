package com.sg.superherosightings.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class HeroDaoImpl implements HeroDao {

    @Autowired
    private JdbcTemplate jt;

}
