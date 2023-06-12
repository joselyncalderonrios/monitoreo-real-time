package com.example.demo.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Arduino;
import com.example.demo.domain.Paciente;
import com.example.demo.domain.PacienteArduino;
import com.example.demo.repository.ArduinoRepository;
import com.example.demo.repository.PacienteArduinoRepository;
import com.example.demo.repository.PacienteRepository;

@Service
public class PacienteArduinoService {
	
	@Autowired
	private PacienteArduinoRepository pacienteArduinoRepository;
	
	
	
	public PacienteArduino create (PacienteArduino pacienteArduino) {
		
		return pacienteArduinoRepository.save(pacienteArduino);
	}
	
		
	
	
}
