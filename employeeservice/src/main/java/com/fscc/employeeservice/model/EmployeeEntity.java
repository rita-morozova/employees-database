package com.fscc.employeeservice.model;

import java.util.Objects;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Document(collection = "employee")
public class EmployeeEntity {
	@JsonIgnore
	@Id
	private ObjectId _id; //primary and generated

	private String userId; // Generate with UUID and unique
	private String firstName;  
	private String lastName;
	private String address; 
	private String state;
	private String zip;
	private String cellPhone;
	private String email; // Unique
	
	public EmployeeEntity() {
		super();
	}
	
	public EmployeeEntity(String userId, String firstName, String lastName, String address, String state,
		String zip, String cellPhone, String email) {
	super();
	this.userId = userId;
	this.firstName = firstName;
	this.lastName = lastName;
	this.address = address;
	this.state = state;
	this.zip = zip;
	this.cellPhone = cellPhone;
	this.email = email;
	}
	
	public ObjectId get_id() {
		return _id;
	}
	
	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getCellPhone() {
		return cellPhone;
	}

	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public int hashCode() {
		return Objects.hash(address, cellPhone, email, firstName, lastName, state, userId, zip);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EmployeeEntity other = (EmployeeEntity) obj;
		return Objects.equals(address, other.address) && Objects.equals(cellPhone, other.cellPhone)
				&& Objects.equals(email, other.email) && Objects.equals(firstName, other.firstName)
				&& Objects.equals(lastName, other.lastName) && Objects.equals(state, other.state)
				&& Objects.equals(userId, other.userId) && Objects.equals(zip, other.zip);
	}

	@Override
	public String toString() {
		return "EmployeeEntity [userId=" + userId + ", firstName=" + firstName + ", lastName=" + lastName + ", address="
				+ address + ", state=" + state + ", zip=" + zip + ", cellPhone=" + cellPhone + ", email=" + email + "]";
	}
	
	

}
