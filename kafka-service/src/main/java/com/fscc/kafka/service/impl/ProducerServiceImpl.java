package com.fscc.kafka.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fscc.kafka.model.User;
import com.fscc.kafka.repository.KafkaRepository;
import com.fscc.kafka.service.ProducerService;

@Service
public class ProducerServiceImpl implements ProducerService {
  
	//used to send messages to the topic
	 @Autowired
	 private KafkaTemplate<String,String> kafkaTemplate;
	 
	 @Autowired
	 private KafkaRepository kafkaRepo;

	 private ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public void produce(User user) throws Exception {
		User newUser = new User();
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setEmail(user.getEmail());
		
		if(user.getStatus() == null || user.getStatus().equals("") || user.getStatus().equals("PENDING")) {
			newUser.setStatus("PENDING");
		} else if (user.getStatus().equals("APPROVED")) {
			newUser.setStatus("APPROVED");
		} else {
			newUser.setStatus("REJECTED");
		}
		
		 if(user.getFirstName().isEmpty() || user.getLastName().isEmpty() || user.getEmail().isEmpty())
			 throw new Exception("Does not accept null values");
		 
		 if(kafkaRepo.existsByEmail(user.getEmail()))
	            throw new Exception("Email Already Exists");
		 
		
		String json = objectMapper.writeValueAsString(newUser);
		kafkaTemplate.send("t_employee_registration", json);	
	}

}
