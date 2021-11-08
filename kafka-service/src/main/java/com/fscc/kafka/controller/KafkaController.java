package com.fscc.kafka.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fscc.kafka.model.User;
import com.fscc.kafka.repository.KafkaRepository;
import com.fscc.kafka.service.impl.ProducerServiceImpl;


@RestController
@RequestMapping(path = "api")
public class KafkaController {

    @Autowired
    private Environment env;
    
    @Autowired 
    private KafkaRepository kafkaRepo;

    @Autowired
    private ProducerServiceImpl producer;

    @GetMapping(path = "/status/check")
    public String status() {
        return "Working on port " + env.getProperty("server.port") + "!";
    }
    
    
    @PostMapping(path = "/register")
    public ResponseEntity<String> registerUser(@RequestBody User user){
      try {
          producer.produce(user);
          return new ResponseEntity<String>("Registered employee", HttpStatus.OK);
      } catch (Exception e) {
          return new ResponseEntity<String>("Failed to register", HttpStatus.BAD_REQUEST);
      }
  }
 
    @GetMapping(path = "/users")
    public List<User> getAllUsers(){
        return kafkaRepo.findAll();
    }


}
