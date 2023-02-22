package com.example.taskcrud.controller;

import com.example.taskcrud.exception.TodoNotFoundException;
import com.example.taskcrud.model.TodoDto;
import com.example.taskcrud.service.TasksService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Tag(name = "Todo Controller")
@RequestMapping("/tasks")
public class TodoController {

    @Autowired
    private TasksService service;

    @GetMapping("/search")
    @Operation
    public ResponseEntity<List<TodoDto>> findAllByQuery(@RequestParam(defaultValue = "") String q) {
        return ResponseEntity.ok(service.findAllByQuery(q));
    }

    @GetMapping("/{id}")
    @Operation
    public ResponseEntity<TodoDto> getById(@PathVariable Integer id) throws TodoNotFoundException {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    @Operation
    public ResponseEntity<TodoDto> create(@RequestBody TodoDto request) {
        return ResponseEntity.ok(service.createTask(request));
    }

    @PutMapping("/{id}")
    @Operation
    public ResponseEntity<TodoDto> update(@PathVariable Integer id, @RequestBody TodoDto request) throws TodoNotFoundException {
        return ResponseEntity.ok(service.updateTask(id, request));
    }

    @PatchMapping("/{id}/done/{done}")
    @Operation
    public ResponseEntity<Boolean> update(@PathVariable Integer id, @PathVariable Boolean done) throws TodoNotFoundException {
        service.updateDoneStatus(id, done);
        return ResponseEntity.ok(true);
    }

    @DeleteMapping("/{id}")
    @Operation
    public ResponseEntity<Boolean> delete(@PathVariable Integer id) throws TodoNotFoundException {
        service.deleteTask(id);
        return ResponseEntity.ok(true);
    }
}
