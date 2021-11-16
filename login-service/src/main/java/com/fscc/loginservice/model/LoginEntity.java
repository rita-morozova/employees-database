package com.fscc.loginservice.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Document(collection = "Login")
public class LoginEntity {
	
	@JsonIgnore
	@Id
	private ObjectId _id; 

	@NotBlank
	@Size(max=35)
	@Email
	private String email; // primary key
	
	@NotBlank
	@Size(max=35)
	private String password; // encrypted
	
	public LoginEntity() {
		
	}

	public LoginEntity(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}

	public ObjectId get_id() {
		return _id;
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "LoginEntity [email=" + email + ", password=" + password + "]";
	}

	
}
