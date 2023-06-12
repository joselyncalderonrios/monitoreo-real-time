package com.example.demo.rest;

import java.net.URI;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.AtencionDTO;
import com.example.demo.DTO.JoinPacienteMetricaDTO;
import com.example.demo.DTO.Pagination;
import com.example.demo.DTO.queryJoinAtencionPacEnfDocDTO;
import com.example.demo.domain.Atencion;
import com.example.demo.domain.Empleado;
import com.example.demo.domain.Paciente;
import com.example.demo.service.AtencionService;


@RestController
@RequestMapping ("/api/atencion/")
@Component
public class AtencionREST {

	
	@Autowired
	private AtencionService  atencionService;
	
	@PostMapping("/guardar")
	private ResponseEntity<Atencion> guardar (@RequestBody AtencionDTO atencionDTO){

		Atencion atencion= new Atencion();
		Long datetime = System.currentTimeMillis();
        Timestamp timestamp = new Timestamp(datetime);
        //System.out.println(timestamp); 
        atencion.setFechahora(atencionDTO.getIdatencion() != null?atencionDTO.getFechahora():timestamp);
        if(atencionDTO.getIdatencion() == null) { atencion.setFechahora(timestamp);}
       //atencion.setEstado(1);
        atencion.setEnfermera(new Empleado((long)atencionDTO.getIdenfermera()));
        atencion.setDoctor(new Empleado((long)atencionDTO.getIddoctor()));
        atencion.setPaciente(new Paciente((long)atencionDTO.getIdpaciente()));
        atencion.setId(atencionDTO.getIdatencion() != null ? (long)atencionDTO.getIdatencion() : null);
        atencion.setEstado(atencionDTO.getEstado());
		Atencion temporal = atencionService.create(atencion);
		
		try {
			return ResponseEntity.created(new URI("/api/atencion"+temporal.getId())).body(temporal);
			
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	
	@GetMapping("/list")
	private ResponseEntity<List<Atencion>> listarTodasLasAtenciones (){
		return ResponseEntity.ok(atencionService.getAllMetricas());
	}
	
	@GetMapping("/listpacjoinmet")
	private ResponseEntity<List<JoinPacienteMetricaDTO>> listarPacientesJoinMetricas (){		
		return ResponseEntity.ok(atencionService.getAllPacienteJoinMetricas());
	}
	//modifique
	@PostMapping("/listpacjoinAtencion")
	private ResponseEntity<List<queryJoinAtencionPacEnfDocDTO>> listarlistpacjoinAtencion 
	(@RequestBody  queryJoinAtencionPacEnfDocDTO pagination){	
		
		//Pagination pg= new Pagination();
		int pg = atencionService.retornaCantidadListAtencion(pagination.getEstado());
		List<queryJoinAtencionPacEnfDocDTO> ls=atencionService.getQueryJoinAtencionPacEnfDoc(pagination.getEstado(), pagination.getLimit(),pagination.getOffset());
		if(ls!=null && ls.size()>0) {
			ls.get(0).setCantidad(pg);
		}
		
		return ResponseEntity.ok(ls);
	}
	
	@GetMapping("/cantidadList")
	private ResponseEntity<Integer> cantidadLIST(@RequestBody  queryJoinAtencionPacEnfDocDTO pagination){
		//Pagination pg= new Pagination();
		//pg = atencionService.retornaCantidadListAtencion();
		return ResponseEntity.ok(atencionService.retornaCantidadListAtencion(pagination.getEstado()));
	}
	
	
	@CrossOrigin(origins = "http://localhost:4200") 
	@DeleteMapping("/delete/{id}")
	private ResponseEntity<Void> eliminarAtenciones (@PathVariable Long id){
		atencionService.delete(id);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping (value = "{id}")
	private ResponseEntity<Optional<Atencion>> listarAtencionPorId (@PathVariable ("id") Long id){
		return ResponseEntity.ok(atencionService.findById(id));
	}
	
	
	
	
}
