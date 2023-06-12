package com.example.demo.repository;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.DTO.Pagination;
import com.example.demo.domain.Atencion;


@Repository
public interface AtencionRepository extends JpaRepository<Atencion, Long>{
	
	
	
	//@Query(value = "{call lista_procedure()}", nativeQuery = true)
//	@Query(value = "SELECT * FROM atencion", nativeQuery = true)
//    List<Atencion> listaConsulta();
	
	@Query(value = "SELECT  p.nrohistoria,p.nombres,p.apellidopaterno,p.apellidomaterno, m.valor, m.fechahora"
			+ " FROM paciente p   "
			+ "JOIN metrica m "
			+ " on p.idpaciente=m.idpaciente"			
			, nativeQuery = true)
   List<ArrayList<Object>> listaConsulta();	
	
//	@Query(value = "SELECT a.idatencion, a.fechahora,a.estado, "			
//			+ " a.idenfermera,e.nombres as nomenf, e.apellidopaterno as apepatenf, e.apellidomaterno as apematenf,   "
//			+ "a.iddoctor,em.nombres as nomdoc, em.apellidopaterno as apepatdoc, em.apellidomaterno as apematdoc,   "
//			+ "a.idpaciente,p.nrohistoria, p.nombres as nompac, p.apellidopaterno as apepapac, p.apellidomaterno as apemapac, p.dni as dnipac   "
//			+ " FROM atencion a     "
//			+ " JOIN empleado e ON e.idempleado = a.idenfermera   "
//			+ " JOIN empleado em ON em.idempleado = a.iddoctor    "
//			+ " JOIN paciente p ON p.idpaciente = a.idpaciente    "	
//			+ " order by a.fechahora asc , a.idatencion asc    "
//			+ " limit ?1 offset ?2"
//			, nativeQuery = true)
//	
//   List<ArrayList<Object>> queryJoinAtencionPacEnfDoc (Integer limit , Integer offset);
	@Query(value = "SELECT a.idatencion, a.fechahora, a.estado, "
			+ "a.idenfermera, e.nombres as nomenf, e.apellidopaterno as apepatenf, e.apellidomaterno as apematenf, "
			+ "a.iddoctor, em.nombres as nomdoc, em.apellidopaterno as apepatdoc, em.apellidomaterno as apematdoc, "
			+ "a.idpaciente, p.nrohistoria, p.nombres as nompac, p.apellidopaterno as apepapac, p.apellidomaterno as apemapac, p.dni as dnipac "
			+ "FROM atencion a "
			+ "JOIN empleado e ON e.idempleado = a.idenfermera "
			+ "JOIN empleado em ON em.idempleado = a.iddoctor "
			+ "JOIN paciente p ON p.idpaciente = a.idpaciente "
			+ "WHERE "
			+ "CASE "
			+ "WHEN :estadoEs = 0 THEN a.estado = 0 "
			+ "WHEN :estadoEs = 1 THEN a.estado = 1 "
			+ "WHEN :estadoEs = -1 THEN a.estado IN (1,0) "
			+ "END "
			+ "ORDER BY a.fechahora ASC, a.idatencion ASC "
			+ "LIMIT :limit OFFSET :offset", nativeQuery = true)
List<ArrayList<Object>> queryJoinAtencionPacEnfDoc(@Param("estadoEs") Integer estadoEs, @Param("limit") Integer limit, @Param("offset") Integer offset);


	 
	@Query(value = 			
			"SELECT COUNT(*) AS cantidad " 
			+ "   FROM ( SELECT a.idatencion, a.fechahora, a.estado, a.idenfermera, e.nombres AS nomenf, e.apellidopaterno AS apepatenf, e.apellidomaterno AS apematenf, "
			+ "	  a.iddoctor, em.nombres AS nomdoc, em.apellidopaterno AS apepatdoc, em.apellidomaterno AS apematdoc, "
			+ "	    a.idpaciente, p.nrohistoria, p.nombres AS nompac, p.apellidopaterno AS apepapac, p.apellidomaterno AS apemapac, p.dni AS dnipac "
			+ "	  FROM atencion a"
			+ "	  JOIN empleado e ON e.idempleado = a.idenfermera "
			+ "	  JOIN empleado em ON em.idempleado = a.iddoctor "
			+ "	  JOIN paciente p ON p.idpaciente = a.idpaciente "
			+ "WHERE "
			+ "CASE "
			+ "WHEN :estadoEs = 0 THEN a.estado = 0 "
			+ "WHEN :estadoEs = 1 THEN a.estado = 1 "
			+ "WHEN :estadoEs = -1 THEN a.estado IN (1,0) "
			+ "END "
			+ "		  ORDER BY a.fechahora ASC, a.idatencion ASC "			
			+ "		) AS subconsulta "			
			, nativeQuery = true)
	
   int queryJoinAtencionPacEnfDocCantidad(@Param("estadoEs") Integer estadoEs);
	
	
	
//	@Query(value ="{call id_procedure(:idIn)}", nativeQuery = true)
//	Optional<Atencion> idProcedure(@Param("idIn") int idIN);

	
}
