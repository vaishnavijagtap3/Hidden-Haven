// src/main/java/com/hiddenplaces/entity/Location.java
package com.hiddenplaces.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hiddenplaces.entity.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import org.hibernate.annotations.Formula;

@Entity
@Table(name = "locations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class Location extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT") // Allows long text in MySQL
    private String description;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(name = "image_url")
    private String imageUrl; // Storing URL string as requested

    private Double latitude;
    private Double longitude;

    private String address;
    private String city;
    private String state;

    // Relationship: One Location has Many Reviews
    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Review> reviews;
    
    // Optional: Calculate Average Rating helper method
//    @JsonIgnore
//    public Double getAverageRating() {
//        if (reviews == null || reviews.isEmpty()) return 0.0;
//        return reviews.stream()
//                .mapToInt(Review::getRating)
//                .average()
//                .orElse(0.0);
//    }
 // This runs a sub-query inside the SQL when fetching the location
    @Formula("(SELECT AVG(r.rating) FROM reviews r WHERE r.location_id = id)")
    private Double averageRating;

    // Getter for the new field
    public Double getAverageRating() {
        return averageRating == null ? 0.0 : averageRating;
    }
}