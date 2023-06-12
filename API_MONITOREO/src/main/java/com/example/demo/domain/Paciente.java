package com.example.demo.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.example.demo.DTO.Pagination;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@Table(name = "paciente")
public class Paciente extends Pagination implements Serializable   {
	@Id	
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name= "idpaciente")
	private Long id;
	
	@Column(name= "nrohistoria")
	private Integer nroHistoria;
	
	@Column(name= "nombres")
	private String nombres;
	
	@Column(name= "apellidopaterno")
	private String apellidoPaterno;
	
	@Column(name= "apellidomaterno")
	private String apellidoMaterno;
	
	@Column(name= "dni")
	private String dni; 
	
	@Column(name= "edad")
	private Integer edad;
	
	@Column(name= "talla")
	private Double talla;
	
	@Column(name= "peso")
	private Double peso;
	
	@Column(name= "estado")
	private Integer estado;
	
	@Column(name= "flagatencion")
	private Integer flagatencion;
	
	@Column(name= "flagmonitorear")
	private Integer flagmonitorear;
	
	@Column(name= "idarduino")
	private Integer idarduino;
	
	@OneToMany(mappedBy="paciente", cascade=CascadeType.ALL)
	List<Metrica> lsmetricas= new ArrayList<Metrica>();
	
	
	@OneToMany(mappedBy="paciente", cascade=CascadeType.ALL)
	List<Atencion> lsatenciones= new ArrayList<Atencion>();
	
	
	
	
	//public Paciente(){}



	public Paciente() {	    
	    lsmetricas=new ArrayList<Metrica>();
	    lsatenciones=new ArrayList<Atencion>();
	  }




	public Paciente(Long id) {	    
		this.id = id;
	  }




	

	public Paciente( Integer nroHistoria, String nombres, String apellidoPaterno, String apellidoMaterno,
			String dni, Integer edad, Double talla, Double peso, Integer estado) {	
		
		this.nroHistoria = nroHistoria;
		this.nombres = nombres;
		this.apellidoPaterno = apellidoPaterno;
		this.apellidoMaterno = apellidoMaterno;
		this.dni = dni;
		this.edad = edad;
		this.talla = talla;
		this.peso = peso;
		this.estado = estado;		
	}

	
	
	
	
	public Paciente(Long id, Integer nroHistoria, String nombres, String apellidoPaterno, String apellidoMaterno,
			String dni, Integer edad, Double talla, Double peso, Integer estado, Integer flagatencion,
			Integer flagmonitorear, Integer idarduino) {
		
		this.id = id;
		this.nroHistoria = nroHistoria;
		this.nombres = nombres;
		this.apellidoPaterno = apellidoPaterno;
		this.apellidoMaterno = apellidoMaterno;
		this.dni = dni;
		this.edad = edad;
		this.talla = talla;
		this.peso = peso;
		this.estado = estado;
		this.flagatencion = flagatencion;
		this.flagmonitorear = flagmonitorear;
		this.idarduino = idarduino;
	}




	public Integer getIdarduino() {
		return idarduino;
	}




	public void setIdarduino(Integer idarduino) {
		this.idarduino = idarduino;
	}




	public Integer getFlagmonitorear() {
		return flagmonitorear;
	}




	public void setFlagmonitorear(Integer flagmonitorear) {
		this.flagmonitorear = flagmonitorear;
	}




	public Integer getFlagatencion() {
		return flagatencion;
	}




	public void setFlagatencion(Integer flagatencion) {
		this.flagatencion = flagatencion;
	}




	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}






	public Integer getNroHistoria() {
		return nroHistoria;
	}






	public void setNroHistoria(Integer nroHistoria) {
		this.nroHistoria = nroHistoria;
	}






	public String getNombres() {
		return nombres;
	}






	public void setNombres(String nombres) {
		this.nombres = nombres;
	}






	public String getApellidoPaterno() {
		return apellidoPaterno;
	}






	public void setApellidoPaterno(String apellidoPaterno) {
		this.apellidoPaterno = apellidoPaterno;
	}






	public String getApellidoMaterno() {
		return apellidoMaterno;
	}






	public void setApellidoMaterno(String apellidoMaterno) {
		this.apellidoMaterno = apellidoMaterno;
	}






	public String getDni() {
		return dni;
	}






	public void setDni(String dni) {
		this.dni = dni;
	}






	public Integer getEdad() {
		return edad;
	}






	public void setEdad(Integer edad) {
		this.edad = edad;
	}






	public Double getTalla() {
		return talla;
	}






	public void setTalla(Double talla) {
		this.talla = talla;
	}






	public Double getPeso() {
		return peso;
	}






	public void setPeso(Double peso) {
		this.peso = peso;
	}


	public List<Metrica> getLsmetricas() {
		return lsmetricas;
	}


	public void setLsmetricas(List<Metrica> lsmetricas) {
		this.lsmetricas = lsmetricas;
		for (Metrica metrica: lsmetricas) {
			metrica.setPaciente(this);
		}
		
	}



	public List<Atencion> getLsatenciones() {
		return lsatenciones;
	}



	public void setLsatenciones(List<Atencion> lsatenciones) {
		this.lsatenciones = lsatenciones;
		for (Atencion atencion: lsatenciones) {
			atencion.setPaciente(this);
		}
	}

	


	public Integer getEstado() {
		return estado;
	}








	public void setEstado(Integer estado) {
		this.estado = estado;
	}








	@Override
	public int hashCode() {
		return Objects.hash(apellidoMaterno, apellidoPaterno, dni, edad, id, lsmetricas, nombres, nroHistoria, peso,
				talla);
	}



	@Override
	public String toString() {
		return "Paciente [id=" + id + ", nroHistoria=" + nroHistoria + ", nombres=" + nombres + ", apellidoPaterno="
				+ apellidoPaterno + ", apellidoMaterno=" + apellidoMaterno + ", dni=" + dni + ", edad=" + edad
				+ ", talla=" + talla + ", peso=" + peso+  "]";
	}



	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Paciente other = (Paciente) obj;
		return Objects.equals(apellidoMaterno, other.apellidoMaterno)
				&& Objects.equals(apellidoPaterno, other.apellidoPaterno) && Objects.equals(dni, other.dni)
				&& Objects.equals(edad, other.edad) && Objects.equals(id, other.id)
				&& Objects.equals(lsmetricas, other.lsmetricas) && Objects.equals(nombres, other.nombres)
				&& Objects.equals(nroHistoria, other.nroHistoria) && Objects.equals(peso, other.peso)
				&& Objects.equals(talla, other.talla);
	}
	
	
	
	

}
