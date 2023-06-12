package com.example.demo.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "pacientearduino")
public class PacienteArduino {
	
	@Id	
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name= "idpacientearduino")
	private Long idpacientearduino;
		
	@Column(name= "idpaciente")
	private Integer idpaciente;
	
	@Column(name= "idarduino")
	private Integer idarduino;
	
	
	@Column(name= "fechahora")
	private Timestamp fechahora;


	
	public PacienteArduino() {}
	
	
	public PacienteArduino(Long idpacientearudino, Integer idpaciente, Integer idarduino, Timestamp fechahora) {
		super();
		this.idpacientearduino = idpacientearudino;
		this.idpaciente = idpaciente;
		this.idarduino = idarduino;
		this.fechahora = fechahora;
	}


	public Long getIdpacientearudino() {
		return idpacientearduino;
	}


	public void setIdpacientearudino(Long idpacientearudino) {
		this.idpacientearduino = idpacientearudino;
	}


	public Integer getIdpaciente() {
		return idpaciente;
	}


	public void setIdpaciente(Integer idpaciente) {
		this.idpaciente = idpaciente;
	}


	public Integer getIdarduino() {
		return idarduino;
	}


	public void setIdarduino(Integer idarduino) {
		this.idarduino = idarduino;
	}


	public Timestamp getFechahora() {
		return fechahora;
	}


	public void setFechahora(Timestamp fechahora) {
		this.fechahora = fechahora;
	}
	
	
	
	
}
