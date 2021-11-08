package com.fscc.kafka.config;

import org.springframework.context.annotation.Configuration;

import java.util.Properties;

@Configuration
public class KafkaConfig {

    Properties config = new Properties();
//    // TODO - implement remaining properties
//    
//    @Bean
//    public NewTopic topicRegistration() {
//    	return  TopicBuilder.name("t_employee_registration").partitions(2).replicas(1).build();
//    }
//    
//    @Bean
//    public NewTopic topicApproval() {
//    	return  TopicBuilder.name("t_status_approval").partitions(2).replicas(1).build();
//    }
}
