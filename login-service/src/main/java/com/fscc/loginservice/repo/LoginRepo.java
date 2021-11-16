package com.fscc.loginservice.repo;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.fscc.loginservice.model.LoginEntity;

@Repository
public interface LoginRepo extends MongoRepository<LoginEntity, Long> {
	public LoginEntity findByEmail(String email);
	
	public Boolean existsByEmail(String email);
	
}
