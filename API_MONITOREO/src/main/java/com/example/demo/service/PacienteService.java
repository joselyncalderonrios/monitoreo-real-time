package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Arduino;
import com.example.demo.domain.Empleado;
import com.example.demo.domain.Paciente;
import com.example.demo.repository.PacienteRepository;

@Service
public class PacienteService {
	
	
	@Autowired
	private PacienteRepository pacienteRepository;
	
public Paciente create (Paciente paciente) {
		
		return pacienteRepository.save(paciente);
	}
	
	public List<Paciente> getAllPacientes (){
		return pacienteRepository.findAll();
	}
	public List<Paciente> getAllPacientesOFFLIM (Integer limit , Integer offset){
		return pacienteRepository.listPacienteTotalesOFFLIM(limit,offset);
	}
	public void delete(Long id) {
		pacienteRepository.deleteById(id);
	}
	
	public Optional<Paciente> findById (Long id) {		
		return pacienteRepository.findById(id);
	}

	
	public int queryUpdateFlagAtencion(Integer flagatencion, Integer idpaciente) {
		return pacienteRepository.queryUpdateFlagAtencion(flagatencion,idpaciente);
	}
	public int queryUpdateFlagMonitorear(Integer flagmonitorear, Integer idarduino,Integer idpaciente) {
		return pacienteRepository.queryUpdateFlagMonitorear(flagmonitorear,idarduino,idpaciente);
	}
	public int queryUpdateFlagIdArduino(Integer idarduino, Integer idpaciente) {
		return pacienteRepository.queryUpdateFlagIdArduino(idarduino,idpaciente);
	}
	public List<Paciente> listPacienteSiendoMonitoreados (Paciente p) {			
		List<Paciente> list = new ArrayList<>();
		list=pacienteRepository.listPacienteSiendoMonitoreados(p.getFlagmonitorear());			
		return list;			
	}
	
	public int retornaCantidadListPaciente() {	
		int pg = pacienteRepository.retornaCantidadListPaciente();		
		return pg;		
	}
	
	
}
