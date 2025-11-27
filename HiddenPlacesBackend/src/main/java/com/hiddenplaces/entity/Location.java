// src/main/java/com/hiddenplaces/entity/Location.java
package com.hiddenplaces.entity;

import com.hiddenplaces.entity.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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
    private List<Review> reviews;
    
    // Optional: Calculate Average Rating helper method
    public Double getAverageRating() {
        if (reviews == null || reviews.isEmpty()) return 0.0;
        return reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
    }
}