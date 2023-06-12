package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.Arduino;
import com.example.demo.domain.Atencion;
import com.example.demo.domain.Empleado;
import com.example.demo.domain.PacienteArduino;

@Repository
public interface PacienteArduinoRepository extends JpaRepository<PacienteArduino, Long>{
	
	
	
	
	
	

}
