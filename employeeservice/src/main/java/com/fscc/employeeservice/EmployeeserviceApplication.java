package com.fscc.employeeservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;


@SpringBootApplication
//(exclude={MongoAutoConfiguration.class, MongoRepositoriesAutoConfiguration.class,MongoDataAutoConfiguration.class})
//@EnableAutoConfiguration
@EnableEurekaClient
public class EmployeeserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeserviceApplication.class, args);
	}

}
