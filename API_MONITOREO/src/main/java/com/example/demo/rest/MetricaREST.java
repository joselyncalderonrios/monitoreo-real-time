package com.example.demo.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.FechaRange;
import com.example.demo.DTO.JoinPacienteMetricaDTO;
import com.example.demo.DTO.QueryPromedioPorDiaRangoFechasDTO;
import com.example.demo.domain.Empleado;
import com.example.demo.domain.Metrica;

import com.example.demo.service.MetricaService;



@RestController
@RequestMapping ("/api/metrica/")
@Component
public class MetricaREST {

	
	@Autowired
	private MetricaService   metricaService;
//	@Autowired
//	private PacienteService   pacienteService;
	
	
	@PostMapping("/guardar")
	private ResponseEntity<Metrica> guardar (@RequestBody Metrica metrica){
		
		Long datetime = System.currentTimeMillis();
        Timestamp timestamp = new Timestamp(datetime);
        System.out.println(timestamp);		
	        
        metrica.setFechahora(timestamp);
		
		Metrica temporal = metricaService.create(metrica);
		
		try {
			return ResponseEntity.created(new URI("/api/metrica"+temporal.getId())).body(temporal);
			
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	
	@GetMapping("/list")
	private ResponseEntity<List<Metrica>> listarTodasLasMetricas (){
		return ResponseEntity.ok(metricaService.getAllMetricas());
	}
	
	@DeleteMapping("/delete/{id}")
	private ResponseEntity<Void> eliminarMetricas (@PathVariable Long id){
		metricaService.delete(id);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping (value = "{id}")
	private ResponseEntity<Optional<Metrica>> listarMetricaPorId (@PathVariable ("id") Long id){
		return ResponseEntity.ok(metricaService.findById(id));
	}
	
	@PostMapping("/listQueryPromedioPorDiaRangoFechas")
	private ResponseEntity<List<QueryPromedioPorDiaRangoFechasDTO>> listarQueryPromedioPorDiaRangoFechas
	(
			@RequestBody   FechaRange objFechaRange
			)
	{	
     
		return ResponseEntity.ok
				(
						metricaService.getQueryFiltroMaxMinPorDiaRangoFechas
						(
								objFechaRange.getStart(),objFechaRange.getEnd(), objFechaRange.getIdpaciente()
						)
				);
	}
	
	
	
//	@PutMapping("/update/{id}")
//	private ResponseEntity<Metrica> updateMetrica (@RequestBody Metrica metrica,@PathVariable Long id){
//		
//		Optional<Paciente> pacienteOptional= pacienteService.findById(metrica.getPaciente().getId());
//		
//		if(!pacienteOptional.isPresent()) {
//			return ResponseEntity.unprocessableEntity().build();
//		}
//		Optional<Metrica> metricaOptional= metricaService.findById(id);
//		if(!metricaOptional.isPresent()) {
//			return ResponseEntity.unprocessableEntity().build();
//		}
//		
//		metrica.setPaciente(pacienteOptional.get());
//		metrica.setId(metricaOptional.get().getId());
//		 metricaService.create(metrica);
//		
//		 return ResponseEntity.noContent().build();
//		
//	}
	
	
	
	
	
}
