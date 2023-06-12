package com.example.demo.repository;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.domain.Arduino;
import com.example.demo.domain.Paciente;

public interface PacienteRepository extends JpaRepository<Paciente, Long>{
	
	@Transactional
	@Modifying
	@Query(value = "update paciente set flagatencion=?1 where idpaciente=?2"			
			, nativeQuery = true)
  int queryUpdateFlagAtencion
   (
		  
		   @Param("flagatencion") Integer flagatencion,
		   @Param("idpaciente") Integer idpaciente
	 );
	
	
	
	@Transactional
	@Modifying
	@Query(value = "update paciente set flagmonitorear=?1 ,idarduino=?2 where idpaciente=?3 "			
			, nativeQuery = true)
  int queryUpdateFlagMonitorear
   (
		  
		   @Param("flagmonitorear") Integer flagmonitorear,
		   @Param("idarduino") Integer idarduino,
		   @Param("idpaciente") Integer idpaciente
	 );
	
	@Transactional
	@Modifying
	@Query(value = "update paciente set idarduino=?1 where idpaciente=?2"			
			, nativeQuery = true)
  int queryUpdateFlagIdArduino
   (
		  
		   @Param("idarduino") Integer idarduino,
		   @Param("idpaciente") Integer idpaciente
	 );
	
	
	@Query(value = "select * from paciente p  where p.flagmonitorear=?1 order by p.idpaciente asc"			
			, nativeQuery = true)
	List<Paciente> listPacienteSiendoMonitoreados(@Param("flagmonitorear") Integer flagmonitorear);
	
	
	@Query(value = 			
			"select count(*) from paciente "			
			, nativeQuery = true)	
   int retornaCantidadListPaciente();
	
	
	
	
	@Query(value = "select * from paciente "
			+ "		limit ?1 offset ?2 "			
			, nativeQuery = true)
	List<Paciente> listPacienteTotalesOFFLIM(Integer limit, Integer offset);

	
	
	
	
}
