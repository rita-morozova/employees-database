package com.fscc.kafka.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fscc.kafka.model.User;
import com.fscc.kafka.repository.KafkaRepository;
import com.fscc.kafka.service.ConsumerService;

@Service
public class ConsumerServiceImpl implements ConsumerService {

    @Autowired
    private KafkaRepository kafkaRepo;
    private ObjectMapper objectMapper = new ObjectMapper();

	@Override
	@KafkaListener(topics="t_employee_registration", groupId="group_id")
	public void consume(String message) throws Exception {
		 User user = objectMapper.readValue(message, User.class);
		 if (user.getStatus().equals("APPROVED")) {
			 kafkaRepo.save(user);
		 } else {
			 throw new Exception("Status is still pending");
		 }
	}
}
