package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Empleado;
import com.example.demo.repository.EmpleadoRepository;


@Service
public class EmpleadoService {
	
	@Autowired
	private EmpleadoRepository empleadoRepository;
	
	public Empleado create (Empleado empleado) {
		
		return empleadoRepository.save(empleado);
	}
	
	public List<Empleado> getAllDoctors (){
		return empleadoRepository.findAll();
	}
	
	public void delete(Long id) {
		empleadoRepository.deleteById(id);
	}
	
	public Optional<Empleado> findById (Long id) {
		
		return empleadoRepository.findById(id);
	}
	
	public Empleado consultaEmpleadoLogin (Empleado e) {
		
		Empleado emp = new Empleado();
		emp=empleadoRepository.consultaEmpleado(e.getUser(),e.getPass());
		
		return emp;
		
	}
	public List<Empleado> listEmpleado (Empleado e) {
		
		List<Empleado> list = new ArrayList<>();
		list=empleadoRepository.listEmpleado(e.getTipoEmpleado());
		
		return list;
		
	}
	
}
