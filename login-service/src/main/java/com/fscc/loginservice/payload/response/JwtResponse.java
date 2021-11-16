package com.fscc.loginservice.payload.response;

import org.bson.types.ObjectId;

public class JwtResponse {
	
	private String token;
	private String type = "Bearer";
	private ObjectId id;
	private String email;

	public JwtResponse(String accessToken, ObjectId id, String email) {
		this.token = accessToken;
		this.id = id;
		this.email = email;
	}

	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public ObjectId getId() {
		return id;
	}

	public void setId(ObjectId id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
