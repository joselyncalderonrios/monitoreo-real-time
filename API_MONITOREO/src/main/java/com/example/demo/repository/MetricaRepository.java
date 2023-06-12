package com.example.demo.repository;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.domain.Metrica;


public interface MetricaRepository extends JpaRepository<Metrica, Long>{
	
	
	
	
	@Query(value = "SELECT DATE_TRUNC('hour', fechahora) AS hora, "
			+ "       MAX(valor) AS maximo, "
			+ "       MIN(valor) AS minimo "
			+ " FROM metrica "
			+ " WHERE fechahora>=?1 AND fechahora <=?2 "
			+ " AND idpaciente=?3"
			+ " GROUP BY hora "			
			, nativeQuery = true)
   List<ArrayList<Object>> queryFiltroMaxMinPorDiaRangoFechas
   (
		   @Param("fecha1") Timestamp fecha1,
		   @Param("fecha2") Timestamp fecha2,
		   @Param("idpaciente") Integer idpaciente
	 );

}
