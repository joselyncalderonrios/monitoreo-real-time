package com.example.demo.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.Arduino;
import com.example.demo.domain.Atencion;

@Repository
public interface ArduinoRepository  extends JpaRepository<Arduino, Long>{
	
	
	@Transactional
	@Modifying
	@Query(value = "update arduino set flagdisponible=?1 where idarduino=?2"			
			, nativeQuery = true)
  int queryUpdateFlagdisponible
   (
		  
		   @Param("flagdisponible") Integer flagdisponible,
		   @Param("idarduino") Integer idarduino
	 );
	
	
	@Query(value = "select * from arduino a  where a.flagdisponible=?1 order by a.idarduino asc"			
			, nativeQuery = true)
	List<Arduino> listArduinosPorDisponibilidad(@Param("flagdisponible") Integer flagdisponible);
	
	
	

}
