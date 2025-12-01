package com.hiddenplaces.controller;

import com.hiddenplaces.entity.User;
import com.hiddenplaces.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class PasswordMigrationController {

    private final UserRepository userRepository;

    // We instantiate this locally to ensure we are using BCrypt
    // regardless of what is currently configured in SecurityConfig
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/patch-passwords")
    public ResponseEntity<String> patchPasswords() {
        List<User> users = userRepository.findAll();
        int updatedCount = 0;

        for (User user : users) {
            String currentPassword = user.getPassword();

            // Simple check: BCrypt hashes start with $2a$ (or $2b$, $2y$)
            // If it doesn't start with $, it's likely plain text
            if (currentPassword != null && !currentPassword.startsWith("$")) {
                
                // Encode the password
                String encodedPassword = passwordEncoder.encode(currentPassword);
                user.setPassword(encodedPassword);
                
                // Save
                userRepository.save(user);
                updatedCount++;
            }
        }

        return ResponseEntity.ok("Migration Complete. Updated " + updatedCount + " users to BCrypt.");
    }
}