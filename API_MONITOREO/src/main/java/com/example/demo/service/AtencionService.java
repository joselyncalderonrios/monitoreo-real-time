package com.example.demo.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.JoinPacienteMetricaDTO;
import com.example.demo.DTO.Pagination;
import com.example.demo.DTO.queryJoinAtencionPacEnfDocDTO;
import com.example.demo.domain.Atencion;


import com.example.demo.domain.Metrica;
import com.example.demo.repository.AtencionRepository;

@Service
public class AtencionService {

	@Autowired
	private AtencionRepository atencionRepository;

	public Atencion create(Atencion atencion) {

		return atencionRepository.save(atencion);
	}

	public List<Atencion> getAllMetricas() {
		return atencionRepository.findAll();
	}	

	public List<JoinPacienteMetricaDTO> getAllPacienteJoinMetricas() {	
		List<ArrayList<Object>> listDesdeBD = atencionRepository.listaConsulta();
		List<JoinPacienteMetricaDTO> listPacienteJoinMetrica = new ArrayList<>();
		for (ArrayList<Object> obj : listDesdeBD) {
			JoinPacienteMetricaDTO objPacMet=new  JoinPacienteMetricaDTO();
			objPacMet.setNrohistoria((Integer)obj.get(0));	
			objPacMet.setNombres((String)obj.get(1));
			objPacMet.setApellidopaterno((String)obj.get(2));
			objPacMet.setApellidomaterno((String)obj.get(3));
			objPacMet.setValor((Double)obj.get(4));
			objPacMet.setFechahora((Timestamp)obj.get(5));
			listPacienteJoinMetrica.add(objPacMet);		    
		}
		
		return listPacienteJoinMetrica;
		
	}
	
	public int retornaCantidadListAtencion() {	
		int pg = atencionRepository.queryJoinAtencionPacEnfDocCantidad();		
		return pg;		
	}
	
	//modifique
	public List<queryJoinAtencionPacEnfDocDTO> getQueryJoinAtencionPacEnfDoc(Integer limit , Integer offset)
	{	
		List<ArrayList<Object>> listDesdeBD = atencionRepository.queryJoinAtencionPacEnfDoc(limit,offset);
		List<queryJoinAtencionPacEnfDocDTO> listAtencionPacEnfDocDTO = new ArrayList<>();
		for (ArrayList<Object> obj : listDesdeBD) {
			queryJoinAtencionPacEnfDocDTO objPacEnfDocDTO=new  queryJoinAtencionPacEnfDocDTO();
			objPacEnfDocDTO.setIdatencion((Integer)obj.get(0));
			objPacEnfDocDTO.setFechahora((Timestamp)obj.get(1));
			objPacEnfDocDTO.setEstado((Integer)obj.get(2));
			//enf
			objPacEnfDocDTO.setIdenfermera((Integer)obj.get(3));
			objPacEnfDocDTO.setNomenf((String)obj.get(4));
			objPacEnfDocDTO.setApepatenf((String)obj.get(5));
			objPacEnfDocDTO.setApematenf((String)obj.get(6));
			
			
			//doc
			objPacEnfDocDTO.setIddoctor((Integer)obj.get(7));
			objPacEnfDocDTO.setNomdoc((String)obj.get(8));
			objPacEnfDocDTO.setApepatdoc((String)obj.get(9));
			objPacEnfDocDTO.setApematdoc((String)obj.get(10));
			
			objPacEnfDocDTO.setIdpaciente((Integer)obj.get(11));
			objPacEnfDocDTO.setNrohistoria((Integer)obj.get(12));
			//pac
			objPacEnfDocDTO.setNompac((String)obj.get(13));
			objPacEnfDocDTO.setApepapac((String)obj.get(14));
			objPacEnfDocDTO.setApemapac((String)obj.get(15));
			
			objPacEnfDocDTO.setDnipac((String)obj.get(16));
			
			listAtencionPacEnfDocDTO.add(objPacEnfDocDTO);		    
		}
		
		return listAtencionPacEnfDocDTO;		
	}
	
	
	
	
	
	public void delete(Long id) {
		atencionRepository.deleteById(id);
	}

	public Optional<Atencion> findById(Long id) {
		return atencionRepository.findById(id);
	}

}
