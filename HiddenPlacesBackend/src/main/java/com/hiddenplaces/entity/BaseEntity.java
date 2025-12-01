// src/main/java/com/hiddenplaces/entity/BaseEntity.java
package com.hiddenplaces.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
//import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass // Tells JPA this class is a parent for other entities
//@EntityListeners(AuditingEntityListener.class) // Listens for save/update events
@Getter
@Setter
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    @CreationTimestamp
    @Column(name = "created_on", updatable = false)
    private LocalDateTime createdOn;

    @LastModifiedDate
    @UpdateTimestamp
    @Column(name = "updated_on")
    private LocalDateTime updatedOn;
}