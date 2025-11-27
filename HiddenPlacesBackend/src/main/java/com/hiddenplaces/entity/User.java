// src/main/java/com/hiddenplaces/entity/User.java
package com.hiddenplaces.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hiddenplaces.entity.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = {"password"}) // Handle BaseEntity fields in equals/hashcode
public class User extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    @JsonIgnore // Don't send password in API responses
    private String password;

    private String phone;

    @Enumerated(EnumType.STRING) // Stores "ADMIN" as text in DB
    @Column(nullable = false)
    private Role role;

    // Relationship: One User can write Many Reviews
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Prevent infinite recursion
    private List<Review> reviews;


    
    
    
}