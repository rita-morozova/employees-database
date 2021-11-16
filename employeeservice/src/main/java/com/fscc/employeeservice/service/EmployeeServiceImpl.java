package com.fscc.employeeservice.service;

import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fscc.employeeservice.model.EmployeeEntity;
import com.fscc.employeeservice.repo.EmployeeRepo;


@Service
public class EmployeeServiceImpl implements EmployeeService  {
	
private final Logger logger = LoggerFactory.getLogger(EmployeeServiceImpl.class);
	
	@Autowired
	private EmployeeRepo employeeRepo;
	
	public EmployeeServiceImpl() {
		
	}

	@Override
	public EmployeeEntity getEmployee(String userId) {
		 logger.info("Entered EmployeeServiceImpl.getEmployee().  userId=" + userId);

	     EmployeeEntity employee = this.employeeRepo.findByUserId(userId);
	     
	     logger.debug("Leaving EmployeeServiceImpl.getEmployee().  employee=" + employee.toString());

	     return employee;
	}

	@Override
	public List<EmployeeEntity> getAllEmployees() {
		  logger.info("Entered EmployeeServiceImpl.getAllEmployees()");

	      List<EmployeeEntity> employees = this.employeeRepo.findAll();
	      
	      logger.info("Leaving EmployeeServiceImpl.getAllEmployees()");

	      return employees;
	}

	@Override
	public EmployeeEntity addEmployee(EmployeeEntity employee) {
		  
		  logger.info("Entered EmployeeServiceImpl.addEmployee().  employee=" + employee.toString());
		  
		  EmployeeEntity employeeEntity = new EmployeeEntity();
		  
		  employeeEntity.setUserId(UUID.randomUUID().toString().replace("-",""));
		  employeeEntity.setFirstName(employee.getFirstName());
		  employeeEntity.setLastName(employee.getLastName());
		  employeeEntity.setAddress(employee.getAddress());
		  employeeEntity.setState(employee.getState());
		  employeeEntity.setZip(employee.getZip());
		  employeeEntity.setCellPhone(employee.getCellPhone());
		  employeeEntity.setEmail(employee.getEmail());
		  //Add the employee to the database MONGO DB
		  employeeEntity = this.employeeRepo.insert(employeeEntity);
	
		  logger.debug("Leaving EmployeeServiceImpl.addEmployee().  employeeEntity= " + employeeEntity.toString());
		  return employeeEntity;
	}



	@Override
	public EmployeeEntity updateEmployee(String userId, EmployeeEntity employee) {
		if (userId != null) {
		 logger.info("Entered EmployeeServiceImpl.updateEmployee().  userId=" + userId);
	     EmployeeEntity employeeEntity = this.employeeRepo.findByUserId(userId);
	     
	      if(employeeEntity != null) {
	      employeeEntity.setFirstName(employee.getFirstName());
		  employeeEntity.setLastName(employee.getLastName());
		  employeeEntity.setAddress(employee.getAddress());
		  employeeEntity.setState(employee.getState());
		  employeeEntity.setZip(employee.getZip());
		  employeeEntity.setCellPhone(employee.getCellPhone());
		  employeeEntity.setEmail(employee.getEmail());
	      }
	     
	      logger.debug(userId);
		  //Update the employee in the database
		  employeeEntity = this.employeeRepo.save(employeeEntity);
		  return employeeEntity;
		} else {
	     return this.employeeRepo.save(employee);
		}
	}

	@Override
	public EmployeeEntity deleteEmployee(String userId) {
		EmployeeEntity employeeEntity = this.employeeRepo.findByUserId(userId);
		if (userId != null) {
			this.employeeRepo.delete(employeeEntity);
			return employeeEntity;
		}else {
			return null;
		}
	}

}
