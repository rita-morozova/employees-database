package com.fscc.kafka.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.fscc.kafka.model.User;

@Repository
public interface KafkaRepository extends MongoRepository<User, Long> {
	public User findByEmail(String email);

	public boolean existsByEmail(String email);
}
