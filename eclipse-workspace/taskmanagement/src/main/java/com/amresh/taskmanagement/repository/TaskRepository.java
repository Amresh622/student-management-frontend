package com.amresh.taskmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.amresh.taskmanagement.entity.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByAssignedUserId(Long userId);

    List<Task> findByStatus(String status);
}
