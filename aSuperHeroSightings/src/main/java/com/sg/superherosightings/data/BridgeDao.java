package com.sg.superherosightings.data;

import com.sg.superherosightings.models.HeroOrganization;
import com.sg.superherosightings.models.HeroPower;
import com.sg.superherosightings.models.HeroSighting;
import java.util.List;

public interface BridgeDao {

    public Integer heroSighting(int a, int b);

    public Integer heroPowers(int a, HeroPower pow);
    
    public Integer editHeroPowers(int a, HeroPower pow);

    public Integer heroOrganization(int a, HeroOrganization org);
    
    public Integer editHeroOrganization(int a, HeroOrganization org);

    public List<HeroSighting> showRecentSightings();

    public List<HeroPower> allHeroPowers(int id);

    public List<HeroOrganization> allHeroOrganizations(int id);

    public List<HeroOrganization> AllOrganizationMembers(int id);

}
