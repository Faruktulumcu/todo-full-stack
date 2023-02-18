package com.example.taskcrud.controller;

import com.example.taskcrud.model.TodoDto;
import com.example.taskcrud.service.TasksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/tasks")
public class TodoController {

    @Autowired
    private TasksService service;

    @GetMapping("/search")
    public ResponseEntity<List<TodoDto>> findAllByQuery(@RequestParam String q) {
        return ResponseEntity.ok(service.findAllByQuery(q));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoDto> getById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(service.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping
    public ResponseEntity<TodoDto> create(@RequestBody TodoDto request) {
        return ResponseEntity.ok(service.createTask(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoDto> update(@PathVariable Integer id, @RequestBody TodoDto request) {
        try {
            return ResponseEntity.ok(service.updateTask(id, request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PatchMapping("/{id}/done/{done}")
    public ResponseEntity update(@PathVariable Integer id, @PathVariable Boolean done) {
        try {
            service.updateDoneStatus(id, done);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Integer id) {
        try {
            service.deleteTask(id);
            return ResponseEntity.status(200).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}