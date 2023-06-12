package com.example.demo.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.JoinPacienteMetricaDTO;
import com.example.demo.DTO.QueryPromedioPorDiaRangoFechasDTO;
import com.example.demo.domain.Metrica;

import com.example.demo.repository.MetricaRepository;

@Service
@Component
public class MetricaService {

	
	@Autowired
	private MetricaRepository metricaRepository;
	
	
	public Metrica create (Metrica metrica) {
			
			return metricaRepository.save(metrica);
		}
	
	public List<Metrica> getAllMetricas (){
		return metricaRepository.findAll();
	}
	
	public void delete(Long id) {
		metricaRepository.deleteById(id);
	}
	
	public Optional<Metrica> findById (Long id) {		
		return metricaRepository.findById(id);
	}
	
	public List<QueryPromedioPorDiaRangoFechasDTO> getQueryFiltroMaxMinPorDiaRangoFechas
	(Timestamp fechaStart,
			Timestamp fechaEnd, Integer idpaciente){
		
		List<ArrayList<Object>> listDesdeBD = metricaRepository.queryFiltroMaxMinPorDiaRangoFechas(fechaStart
				,fechaEnd,idpaciente);
		List<QueryPromedioPorDiaRangoFechasDTO> listQueryPromedioPorDiaRangoFechasDTO = new ArrayList<>();
		for (ArrayList<Object> obj : listDesdeBD) {
			QueryPromedioPorDiaRangoFechasDTO objQueryPromedioPorDiaRangoFechasDTO =new  QueryPromedioPorDiaRangoFechasDTO();
			objQueryPromedioPorDiaRangoFechasDTO.setHora((Timestamp)obj.get(0));	
			objQueryPromedioPorDiaRangoFechasDTO.setMaximo((Double)obj.get(1));
			objQueryPromedioPorDiaRangoFechasDTO.setMinimo((Double)obj.get(2));
			
			listQueryPromedioPorDiaRangoFechasDTO.add(objQueryPromedioPorDiaRangoFechasDTO);		    
		}
		
		return listQueryPromedioPorDiaRangoFechasDTO;
	}
	
	

}
