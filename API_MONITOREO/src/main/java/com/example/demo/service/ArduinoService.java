package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.domain.Arduino;
import com.example.demo.domain.Metrica;
import com.example.demo.repository.ArduinoRepository;

@Service
public class ArduinoService {
	
	@Autowired
	private ArduinoRepository arduinoRepository;
	
		public Arduino create (Arduino arduino) {
				
				return arduinoRepository.save(arduino);
		}	
		
		public List<Arduino> getAllArduinos (){
			return arduinoRepository.findAll();
		}			
		
		public int queryUpdateFlagDisponible(Integer flagdisponible, Integer idarduino) {
			return arduinoRepository.queryUpdateFlagdisponible(flagdisponible,idarduino);
		}
		
		
		public List<Arduino> listArduinosPorDisponibilidad (Arduino e) {			
			List<Arduino> list = new ArrayList<>();
			list=arduinoRepository.listArduinosPorDisponibilidad(e.getFlagdisponible());			
			return list;			
		}
		
		
		
}
