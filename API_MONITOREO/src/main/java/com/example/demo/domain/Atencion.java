package com.example.demo.domain;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
@Table(name = "atencion")
public class Atencion implements Serializable{

	@Id	
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name= "idatencion")
	private Long id;
	
	
	@ManyToOne(fetch = FetchType.LAZY,optional = true)
    @JoinColumn(name="idpaciente", nullable=false)
	@JsonProperty(access = Access.WRITE_ONLY)
    private Paciente paciente;

	
	@ManyToOne(fetch = FetchType.LAZY,optional = true)
    @JoinColumn(name="iddoctor" ,nullable=false)
	@JsonProperty(access = Access.WRITE_ONLY)
    private Empleado doctor;
	
	@ManyToOne(fetch = FetchType.LAZY,optional = true)
    @JoinColumn(name="idenfermera", nullable=false)
	@JsonProperty(access = Access.WRITE_ONLY)
    private Empleado enfermera;	
	
	@Column(name= "fechahora")
	private Timestamp fechahora;
	
	@Column(name= "estado")
	private Integer estado;
	

	public Atencion() {
		
	}
	public Atencion(Long id, Paciente paciente, Empleado doctor, Empleado enfermera, Timestamp fechahora,
			Integer estado) {		
		this.id = id;
		this.paciente = paciente;
		this.doctor = doctor;
		this.enfermera = enfermera;
		this.fechahora = fechahora;
		this.estado = estado;
	}
	public Integer getEstado() {
		return estado;
	}
	public void setEstado(Integer estado) {
		this.estado = estado;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}


	public Paciente getPaciente() {
		return paciente;
	}


	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}

	public Timestamp getFechahora() {
		return fechahora;
	}


	public void setFechahora(Timestamp fechahora) {
		this.fechahora = fechahora;
	}







	public Empleado getDoctor() {
		return doctor;
	}







	public void setDoctor(Empleado doctor) {
		this.doctor = doctor;
	}







	public Empleado getEnfermera() {
		return enfermera;
	}







	public void setEnfermera(Empleado enfermera) {
		this.enfermera = enfermera;
	}






	
}
