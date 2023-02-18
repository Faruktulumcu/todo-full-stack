package com.example.taskcrud.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String description;
    private ZonedDateTime dueToDate;
    private boolean done;
    private ZonedDateTime createdAt;
    private String createdBy;

    public TodoDto toDto() {
        return new TodoDto(
                id,
                title,
                description,
                dueToDate,
                done,
                createdAt,
                createdBy
        );
    }
}
