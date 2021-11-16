package com.fscc.employeeservice.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.fscc.employeeservice.model.EmployeeEntity;

@Repository
public interface EmployeeRepo extends MongoRepository<EmployeeEntity, Long>{
	
	public EmployeeEntity findByUserId(String userId);
}

