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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.FechaRange;
import com.example.demo.DTO.Pagination;
import com.example.demo.DTO.QueryPromedioPorDiaRangoFechasDTO;
import com.example.demo.DTO.UpdateFlagAtencionDTO;
import com.example.demo.DTO.queryJoinAtencionPacEnfDocDTO;
import com.example.demo.domain.Arduino;
import com.example.demo.domain.Paciente;
import com.example.demo.service.PacienteService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping ("/api/paciente/")
public class PacienteREST {

	
	
	@Autowired
	private PacienteService   pacienteService;
	
	@PostMapping("/guardar")
	private ResponseEntity<Paciente> guardar (@RequestBody Paciente paciente){
//		paciente.setLsatenciones(null);
//		paciente.setLsmetricas(null);
		//actualizar
		Paciente temp = new Paciente
				(
					paciente.getId(),
					paciente.getNroHistoria(),
					paciente.getNombres(),
					paciente.getApellidoPaterno(),
					paciente.getApellidoMaterno(),
					paciente.getDni(),
					paciente.getEdad(),
					paciente.getTalla(),
					paciente.getPeso(),
					paciente.getEstado(),
					paciente.getFlagatencion(),
					paciente.getFlagmonitorear(),
					paciente.getIdarduino()
				);
		
		Paciente temporal = pacienteService.create(temp);
		
		try {
			return ResponseEntity.created(new URI("/api/paciente"+temporal.getId())).body(temporal);
			
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	
	@PostMapping("/list")
	private ResponseEntity<List<Paciente>> listarTodasLosPacientes (@RequestBody  Pagination pagination){
		int pg = pacienteService.retornaCantidadListPaciente();
		List<Paciente> ls=pacienteService.getAllPacientesOFFLIM(pagination.getLimit(),pagination.getOffset());
		if(ls!=null && ls.size()>0) {
			ls.get(0).setCantidad(pg);
		}
		return ResponseEntity.ok(ls);
	}
	
	@GetMapping("/listConCantidad")
	private ResponseEntity<List<Paciente>> listarTodasLosPacientesCantidad (){
		return ResponseEntity.ok(pacienteService.getAllPacientes());
	}
	
	
	@CrossOrigin(origins = "http://localhost:4200") 
	@DeleteMapping("/delete/{id}")
	private ResponseEntity<Void> eliminarPacientes (@PathVariable("id") Long id){
		pacienteService.delete(id);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping (value = "{id}")
	private ResponseEntity<Optional<Paciente>> listarPacientesPorId (@PathVariable ("id") Long id){
		return ResponseEntity.ok(pacienteService.findById(id));
	}
	
	@CrossOrigin(origins = "http://localhost:4200") 
	@PostMapping("/flagatencion")
	private ResponseEntity<?> QueryUpdateFlagAtencion	(@RequestBody UpdateFlagAtencionDTO dto	)
	{
		
		  	Integer flagatencion = dto.getFlagatencion() ;
		    Integer idpaciente = dto.getIdpaciente();
		
		return ResponseEntity.ok(pacienteService.queryUpdateFlagAtencion(flagatencion,idpaciente));
		
	}
	
	@CrossOrigin(origins = "http://localhost:4200") 
	@PostMapping("/flagmonitorear")
	private ResponseEntity<?> QueryUpdateFlagMonitorear	(@RequestBody UpdateFlagAtencionDTO dto	)
	{
		
		  	Integer flagmonitorear = dto.getFlagmonitorear() ;
			Integer idarduino = dto.getIdArduino() ;
		    Integer idpaciente = dto.getIdpaciente();
		
		return ResponseEntity.ok(pacienteService.queryUpdateFlagMonitorear(flagmonitorear,idarduino,idpaciente));
		
	}
	
	@CrossOrigin(origins = "http://localhost:4200") 
	@PostMapping("/modificarIdArduino")
	private ResponseEntity<?> QueryUpdateFlagIdArduino	(@RequestBody UpdateFlagAtencionDTO dto	)
	{
		
		  	Integer idArduino = dto.getIdArduino() ;
		    Integer idpaciente = dto.getIdpaciente();
		
		return ResponseEntity.ok(pacienteService.queryUpdateFlagIdArduino(idArduino,idpaciente));
		
	}
	@PostMapping("/listPacienteSiendoMonitoreados")
	private ResponseEntity<List<Paciente>> listPacienteSiendoMonitoreados (@RequestBody Paciente p){
		System.out.println(p.getFlagmonitorear());
		return ResponseEntity.ok(pacienteService.listPacienteSiendoMonitoreados(p));
	}
	
	
	
}
