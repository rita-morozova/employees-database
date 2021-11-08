package com.fscc.kafka.service;

import com.fscc.kafka.model.User;

public interface ProducerService {
	public void produce(User user) throws Exception;
}
