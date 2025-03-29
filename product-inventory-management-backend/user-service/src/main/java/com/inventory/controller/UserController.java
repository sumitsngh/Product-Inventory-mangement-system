package com.inventory.controller;

import com.inventory.model.User;
import com.inventory.model.LoginRequest;
import com.inventory.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> loginUser(@RequestBody LoginRequest loginRequest) {
        boolean isAuthenticated = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());

        if (!isAuthenticated) {
            return ResponseEntity.status(401).body(false);
        }
        return ResponseEntity.ok(true);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Boolean> logoutUser(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");

        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(false);
        }
        boolean loggedOut = userService.logoutUser(email);
        return ResponseEntity.ok(loggedOut);
    }
}
