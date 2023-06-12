package com.example.demo.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.Empleado;


public interface EmpleadoRepository extends JpaRepository<Empleado, Long>{
	
	@Query(value = "select * from empleado e  where e.usuario=?1 and e.contrasenia=?2"			
			, nativeQuery = true)
  Empleado consultaEmpleado(@Param("user") String user,@Param("pass") String pass);
	
	
	@Query(value = "select * from empleado e  where e.tipo=?1"			
			, nativeQuery = true)
	List<Empleado> listEmpleado(@Param("tipo") String tipo);
	
	
	

}
