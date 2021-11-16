package com.fscc.loginservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fscc.loginservice.model.LoginEntity;
import com.fscc.loginservice.repo.LoginRepo;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	LoginRepo userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		LoginEntity user = userRepository.findByEmail(username);
		if (user == null) {
			throw new UsernameNotFoundException("User Not Found with email: " + username);
		}
			
		return UserDetailsImpl.build(user);
	}

}