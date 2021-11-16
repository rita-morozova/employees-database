package com.fscc.employeeservice.service;

import java.util.List;

import com.fscc.employeeservice.model.EmployeeEntity;


public interface EmployeeService {
	
	public EmployeeEntity getEmployee(String userId);
	public List<EmployeeEntity> getAllEmployees();
	public EmployeeEntity addEmployee(EmployeeEntity employee);	
	public EmployeeEntity updateEmployee(String userId, EmployeeEntity employee);
	public EmployeeEntity deleteEmployee(String userId);

}
