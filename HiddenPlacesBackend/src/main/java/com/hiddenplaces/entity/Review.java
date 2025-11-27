// src/main/java/com/hiddenplaces/entity/Review.java
package com.hiddenplaces.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max; // Import this
import jakarta.validation.constraints.Min; // Import this
import lombok.*;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class Review extends BaseEntity {

    @Column(nullable = false)
    @Min(value = 1, message = "Rating must be at least 1") // Validates minimum value
    @Max(value = 5, message = "Rating must be at most 5")  // Validates maximum value
    private Integer rating; 

    @Column(columnDefinition = "TEXT")
    private String comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;
}