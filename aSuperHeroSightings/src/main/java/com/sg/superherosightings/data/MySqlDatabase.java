
package com.sg.superherosightings.data;


import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.Properties;
import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Component;

@Component
public class MySqlDatabase {

    @Bean
    public DataSourceTransactionManager getTransactionManager(DataSource ds) {
        return new DataSourceTransactionManager(ds);
    }

    @Bean
    public JdbcTemplate getJdbcTemplate(DataSource ds) {
        return new JdbcTemplate(ds);
    }

    @Bean
    public static DataSource getDataSource() throws SQLException {

        Properties dbProperties = new Properties();
        try (InputStream stream = MySqlDatabase.class.getClassLoader().getResourceAsStream("db.properties")) {
            dbProperties.load(stream);
        } catch (IOException ex) {
            ex.printStackTrace();
            System.exit(100);
        }

        MysqlDataSource ds = new MysqlDataSource();
        ds.setServerName(dbProperties.getProperty("serverName"));
        ds.setDatabaseName(dbProperties.getProperty("databaseName"));
        ds.setUser(dbProperties.getProperty("userName"));
        ds.setPassword(dbProperties.getProperty("password"));
        ds.setServerTimezone("UTC");
        ds.setUseSSL(false);

        return ds;
    }
}
