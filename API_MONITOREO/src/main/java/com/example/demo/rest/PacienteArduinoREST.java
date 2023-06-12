package com.example.demo.rest;

import java.net.URI;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.UpdateFlagAtencionDTO;
import com.example.demo.domain.Arduino;
import com.example.demo.domain.Metrica;
import com.example.demo.domain.PacienteArduino;
import com.example.demo.service.ArduinoService;
import com.example.demo.service.AtencionService;
import com.example.demo.service.PacienteArduinoService;

@RestController
@RequestMapping ("/api/pacientearduino/")
@Component
public class PacienteArduinoREST {
	
	@Autowired
	private PacienteArduinoService  pacienteArduinoService;
	
	@Autowired
	private ArduinoService  arduinoService;
	
	@PostMapping("/guardarMonitoreo")
	private ResponseEntity<PacienteArduino> guardarMonitoreo (@RequestBody PacienteArduino pacienteArduino){
		
		Long datetime = System.currentTimeMillis();
        Timestamp timestamp = new Timestamp(datetime);
        System.out.println(timestamp);		
	        
        pacienteArduino.setFechahora(timestamp);
		
        PacienteArduino temporal = pacienteArduinoService.create(pacienteArduino);
		
		try {
			return ResponseEntity.created(new URI("/api/pacientearduino"+temporal.getIdpacientearudino())).body(temporal);
			
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@PostMapping("/guardarArduino")
	private ResponseEntity<Arduino> guardarArduino (@RequestBody Arduino arduino){
		
				
        Arduino temporal = arduinoService.create(arduino);
		
		try {
			return ResponseEntity.created(new URI("/api/pacientearduino"+temporal.getIdarduino())).body(temporal);
			
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	
	
	@GetMapping("/listArduinos")
	private ResponseEntity<List<Arduino>> listarTodasLosArduinos (){
		return ResponseEntity.ok(arduinoService.getAllArduinos());
	}
	
	@PostMapping("/listArduinosPorDisponibilidad")
	private ResponseEntity<List<Arduino>> listarTodasLosArduinosPorDisponibilidad (@RequestBody Arduino a){
		System.out.println(a.getFlagdisponible());
		return ResponseEntity.ok(arduinoService.listArduinosPorDisponibilidad(a));
	}
	
	@CrossOrigin(origins = "http://localhost:4200") 
	@PostMapping("/modificarflagdisponible")
	private ResponseEntity<?> QueryUpdateFlagdisponible	(@RequestBody UpdateFlagAtencionDTO dto	)
	{
		
		  	Integer flagdisponible = dto.getFlagdisponible() ;
		    Integer idarduino = dto.getIdArduino();
		
		return ResponseEntity.ok(arduinoService.queryUpdateFlagDisponible(flagdisponible,idarduino));
		
	}
	
	
	
	
}
