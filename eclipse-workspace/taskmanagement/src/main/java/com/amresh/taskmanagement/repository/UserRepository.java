package com.amresh.taskmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.amresh.taskmanagement.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
