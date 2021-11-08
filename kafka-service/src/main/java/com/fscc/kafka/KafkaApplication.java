package com.fscc.kafka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import com.fscc.kafka.service.ConsumerService;
import com.fscc.kafka.service.ProducerService;
import com.fscc.kafka.service.impl.ConsumerServiceImpl;
import com.fscc.kafka.service.impl.ProducerServiceImpl;

@SpringBootApplication
@EnableEurekaClient
public class KafkaApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(KafkaApplication.class, args);
	}

}
