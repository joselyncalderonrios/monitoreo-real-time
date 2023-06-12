package com.example.demo.DTO;

import java.sql.Timestamp;

public class AtencionDTO extends Pagination{

private Integer idatencion;
	private Timestamp fechahora;
	private Integer idenfermera  ;
	private Integer iddoctor ;
	private Integer idpaciente ;
	private Integer estado ;
	private String accion;
	
	
	public AtencionDTO() {}	
	
	
	public AtencionDTO(Timestamp fechahora, Integer idenfermera, Integer iddoctor, Integer idpaciente, Integer estado,
			String accion) {
		
		this.fechahora = fechahora;
		this.idenfermera = idenfermera;
		this.iddoctor = iddoctor;
		this.idpaciente = idpaciente;
		this.estado = estado;
		this.accion = accion;
	}
	
	public Integer getIdatencion() {
		return idatencion;
	}

	public void setIdatencion(Integer idatencion) {
		this.idatencion = idatencion;
	}

	public Timestamp getFechahora() {
		return fechahora;
	}
	public void setFechahora(Timestamp fechahora) {
		this.fechahora = fechahora;
	}
	public Integer getIdenfermera() {
		return idenfermera;
	}
	public void setIdenfermera(Integer idenfermera) {
		this.idenfermera = idenfermera;
	}
	public Integer getIddoctor() {
		return iddoctor;
	}
	public void setIddoctor(Integer iddoctor) {
		this.iddoctor = iddoctor;
	}
	public Integer getIdpaciente() {
		return idpaciente;
	}
	public void setIdpaciente(Integer idpaciente) {
		this.idpaciente = idpaciente;
	}
	public Integer getEstado() {
		return estado;
	}
	public void setEstado(Integer estado) {
		this.estado = estado;
	}
	public String getAccion() {
		return accion;
	}
	public void setAccion(String accion) {
		this.accion = accion;
	}
	
	
	
	
}
