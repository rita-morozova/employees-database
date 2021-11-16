package com.fscc.employeeservice.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fscc.employeeservice.model.EmployeeEntity;
import com.fscc.employeeservice.service.EmployeeService;



@RestController
@RequestMapping(value = "/employee")
public class EmployeeController {
	@Autowired
	private Environment env;
	
	@Autowired
	private EmployeeService employeeService;
	
	private final Logger logger = LoggerFactory.getLogger(EmployeeController.class);
	
	public EmployeeController() {
		
	}

	@GetMapping(path = "/status/check")
	public String status() {
		return "Working on port " + env.getProperty("server.port") + "!";
	}
	
	@RequestMapping(value = "/employees")
	public ResponseEntity<?> getAllEmployees() {
		try {
			logger.info("Entered EmployeeController.getAllEmployees()");
			
			List<EmployeeEntity> employees = this.employeeService.getAllEmployees();
			
			if (employees == null) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			
			ResponseEntity<List<EmployeeEntity>> responseEntity = new ResponseEntity<List<EmployeeEntity>>(employees, HttpStatus.OK);
			
			logger.info("Leaving EmployeeController.getAllEmployees()");
			return responseEntity;
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value = "/employee/{userId}")
	public ResponseEntity<?> getEmployee(@PathVariable(value = "userId") String userId) {
		try {
			
			logger.info("Entered EmployeeController.getEmployee().  userId=" + userId);
			
			EmployeeEntity employee = this.employeeService.getEmployee(userId);
			
			if (employee != null) {
				ResponseEntity<EmployeeEntity> responseEntity = new ResponseEntity<EmployeeEntity>(employee, HttpStatus.OK);
				
				logger.debug("Leaving EmployeeController.getEmployee().  userId = " + userId.toString());
				return responseEntity;
			} 
			return null;
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(value = "/employees", method = RequestMethod.POST)
	public ResponseEntity<?> addEmployee(@RequestBody EmployeeEntity employee) {
		try {
			logger.info("Entered EmployeeController.addEmployee().  employee=" + employee.toString());
			EmployeeEntity employeeEntity = this.employeeService.addEmployee(employee);
			
			ResponseEntity<EmployeeEntity> responseEntity = new ResponseEntity<EmployeeEntity>(employeeEntity,
					HttpStatus.OK);
	
			logger.info("Exited EmployeeController.addEmployee()");
	
			return responseEntity;
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value = "/employee/{userId}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateEmployee(@PathVariable(value = "userId") String userId, @RequestBody EmployeeEntity employee){
		try{
			logger.info("Entered EmployeeController.updateEmployee().  employee=" + employee.toString());
		
			EmployeeEntity employeeEntity = this.employeeService.updateEmployee(userId, employee);
			
			ResponseEntity<EmployeeEntity> responseEntity = new ResponseEntity<EmployeeEntity>(employeeEntity,
					HttpStatus.OK);
			
			logger.info("Exited EmployeeController.updateEmployee()");
	
			return responseEntity;
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@RequestMapping(value = "/employee/{userId}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteEmployee(@PathVariable(value = "userId") String userId) {
		try{
			this.employeeService.deleteEmployee(userId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	

}
