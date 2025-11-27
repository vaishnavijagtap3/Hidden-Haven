// src/main/java/com/hiddenplaces/entity/ContactMessage.java
package com.hiddenplaces.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "contact_messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class Contact extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String subject;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;
}