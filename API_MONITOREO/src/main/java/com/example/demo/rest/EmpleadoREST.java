package com.example.demo.rest;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.Empleado;
import com.example.demo.service.EmpleadoService;


@RestController
@RequestMapping ("/api/empleado/")
public class EmpleadoREST {

	
	@Autowired
	private EmpleadoService empleadoService;
	
	
	@PostMapping("/guardar")
	private ResponseEntity<Empleado> guardar (@RequestBody Empleado empleado){
		Empleado temporal = empleadoService.create(empleado);
		
		try {
			return ResponseEntity.created(new URI("/api/empleado"+temporal.getId())).body(temporal);
			
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	
	@GetMapping("/list")
	private ResponseEntity<List<Empleado>> listarTodasLosDoctores (){
		return ResponseEntity.ok(empleadoService.getAllDoctors());
	}
	@PostMapping("/listEmpleadoxtipo")
	private ResponseEntity<List<Empleado>> listEmpleadoxtipo (@RequestBody Empleado e){
		return ResponseEntity.ok(empleadoService.listEmpleado(e));
	}
	
	@PostMapping("/consultaempleadologin")
	private ResponseEntity<Empleado> ConsultaEmpleadoLog (@RequestBody Empleado e){
		
		return ResponseEntity.ok(empleadoService.consultaEmpleadoLogin(e));
	}
	
	@DeleteMapping("/delete/{id}")
	private ResponseEntity<Void> eliminarDoctores (@PathVariable Long id){
		empleadoService.delete(id);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping (value = "{id}")
	private ResponseEntity<Optional<Empleado>> listarDoctoresPorId (@PathVariable ("id") Long id){
		return ResponseEntity.ok(empleadoService.findById(id));
	}
	
	
	
	
}
