package com.example.taskcrud.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TodoDto {

    private Integer id;

    private String title;
    private String description;
    private ZonedDateTime dueToDate;
    private boolean done;
    private ZonedDateTime createdAt;
    private String createdBy;
}
