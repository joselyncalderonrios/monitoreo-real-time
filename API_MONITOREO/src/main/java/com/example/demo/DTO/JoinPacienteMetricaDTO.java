package com.example.demo.DTO;

import java.io.Serializable;
import java.sql.Timestamp;

public class JoinPacienteMetricaDTO implements Serializable{
	
	
private Integer nrohistoria;
	
	private String nombres;
	
	
	private String apellidopaterno;
	
	
	private String apellidomaterno;
	
	
	private Double valor;
	
	private Timestamp fechahora;

	
	public JoinPacienteMetricaDTO() {}
	
	
	public JoinPacienteMetricaDTO(Integer nrohistoria, String nombres, String apellidopaterno, String apellidomaterno,
			Double valor, Timestamp fechahora) {
		
		this.nrohistoria = nrohistoria;
		this.nombres = nombres;
		this.apellidopaterno = apellidopaterno;
		this.apellidomaterno = apellidomaterno;
		this.valor = valor;
		this.fechahora = fechahora;
	}

	public Integer getNrohistoria() {
		return nrohistoria;
	}

	public void setNrohistoria(Integer nrohistoria) {
		this.nrohistoria = nrohistoria;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getApellidopaterno() {
		return apellidopaterno;
	}

	public void setApellidopaterno(String apellidopaterno) {
		this.apellidopaterno = apellidopaterno;
	}

	public String getApellidomaterno() {
		return apellidomaterno;
	}

	public void setApellidomaterno(String apellidomaterno) {
		this.apellidomaterno = apellidomaterno;
	}

	public Double getValor() {
		return valor;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}

	public Timestamp getFechahora() {
		return fechahora;
	}

	public void setFechahora(Timestamp fechahora) {
		this.fechahora = fechahora;
	}
	
	
	

}
