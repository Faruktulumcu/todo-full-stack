package com.example.taskcrud.service;

import com.example.taskcrud.exception.TodoNotFoundException;
import com.example.taskcrud.model.Todo;
import com.example.taskcrud.model.TodoDto;
import com.example.taskcrud.repository.TodoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TasksService {

    @Autowired
    private TodoRepository repository;

    public List<TodoDto> findAllByQuery(String q) {
        return repository.searchAllByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrderByDoneAscIdDesc(q, q)
                .stream()
                .map(Todo::toDto)
                .collect(Collectors.toList());
    }

    public TodoDto createTask(TodoDto task) {
        Todo taskEntity = Todo.builder()
                .title(task.getTitle())
                .description(task.getDescription())
                .dueToDate(task.getDueToDate())
                .done(false)
                .createdAt(ZonedDateTime.now())
                .createdBy("todo")
                .build();
        return repository.save(taskEntity).toDto();
    }

    public TodoDto updateTask(Integer id, TodoDto todoDto) throws TodoNotFoundException {
        Optional<Todo> tasksOptional = repository.findById(id);
        if (tasksOptional.isPresent()) {
            Todo todo = tasksOptional.get();
            todo.setTitle(todoDto.getTitle());
            todo.setDescription(todoDto.getDescription());
            todo.setDueToDate(todoDto.getDueToDate());
            todo.setDone(todo.isDone());
            return repository.save(todo).toDto();
        }
        throw new TodoNotFoundException("Entity not found with given id: " + id);
    }

    @Transactional
    public void updateDoneStatus(Integer id, boolean doneStatus) throws TodoNotFoundException {
        int updatedRows = repository.updateDoneById(doneStatus, id);
        if (updatedRows == 0) {
            throw new TodoNotFoundException("Entity not found with given id: " + id);
        }
    }

    public void deleteTask(Integer id) throws TodoNotFoundException {
        Optional<Todo> tasksOptional = repository.findById(id);
        if (tasksOptional.isPresent()) {
            repository.deleteById(id);
            return;
        }
        throw new TodoNotFoundException("Entity not found with given id: " + id);
    }

    public TodoDto findById(Integer id) throws TodoNotFoundException {
        Todo todo = repository.findById(id).orElse(null);
        if (todo == null) {
            throw new TodoNotFoundException("Entity not found with given id: " + id);
        }
        return todo.toDto();
    }
}
