package com.inventory.service;

import com.inventory.exception.UserNotFoundException;
import com.inventory.exception.InvalidCredentialsException;
import com.inventory.exception.UserAlreadyExistsException;
import com.inventory.model.User;
import com.inventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException("User already registered with email: " + user.getEmail());
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setIsLoggedIn(false);
        return userRepository.save(user);
    }

    public boolean loginUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials for email: " + email);
        }
        
        user.setIsLoggedIn(true);
        userRepository.save(user);
        return true;
    }

    public boolean logoutUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
        user.setIsLoggedIn(false);
        userRepository.save(user);
        return true;
    }
}
