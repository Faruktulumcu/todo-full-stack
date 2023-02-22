package com.example.taskcrud.repository;

import com.example.taskcrud.model.Todo;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends CrudRepository<Todo, Integer> {

    List<Todo> searchAllByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrderByDoneAscIdDesc(String query, String query2);

    @Modifying
    @Query("update Todo set done = :done where id = :id")
    int updateDoneById(@Param("done") boolean done, @Param("id") Integer id);
}
