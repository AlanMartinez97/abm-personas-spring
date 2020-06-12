package com.exercise.personas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exercise.personas.model.Persona;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long> {

	boolean existsPersonaByEmail(String email);

}
