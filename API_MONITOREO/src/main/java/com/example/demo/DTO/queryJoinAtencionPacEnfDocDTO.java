	package com.example.demo.DTO;
	
	import java.sql.Timestamp;
	
	public class queryJoinAtencionPacEnfDocDTO extends Pagination {
		
		
		
			private Integer idatencion;
		
			private Timestamp fechahora;	
			
			private Integer estado;
			private Integer idenfermera;
			private String nomenf;		
			private String apepatenf;	
			private String apematenf;
			
			private Integer nrohistoria;
			private Integer iddoctor;
			private String nomdoc;	
			private String apepatdoc;
			private String apematdoc;
			private Integer idpaciente;	
		private String nompac;	
		private String apepapac;		
		private String apemapac;
		
		private String dnipac;
	
	public queryJoinAtencionPacEnfDocDTO() {
		
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
	public Integer getEstado() {
		return estado;
	}
	public void setEstado(Integer estado) {
		this.estado = estado;
	}
	public String getNomenf() {
		return nomenf;
	}
	public void setNomenf(String nomenf) {
		this.nomenf = nomenf;
	}
	public String getApepatenf() {
		return apepatenf;
	}
	public void setApepatenf(String apepatenf) {
		this.apepatenf = apepatenf;
	}
	public String getApematenf() {
		return apematenf;
	}
	public void setApematenf(String apematenf) {
		this.apematenf = apematenf;
	}
	public Integer getNrohistoria() {
		return nrohistoria;
	}
	public void setNrohistoria(Integer nrohistoria) {
		this.nrohistoria = nrohistoria;
	}
	public String getNomdoc() {
		return nomdoc;
	}
	public void setNomdoc(String nomdoc) {
		this.nomdoc = nomdoc;
	}
	public String getApepatdoc() {
		return apepatdoc;
	}
	public void setApepatdoc(String apepatdoc) {
		this.apepatdoc = apepatdoc;
	}
	public String getApematdoc() {
		return apematdoc;
	}
	public void setApematdoc(String apematdoc) {
		this.apematdoc = apematdoc;
	}
	public String getNompac() {
		return nompac;
	}
	public void setNompac(String nompac) {
		this.nompac = nompac;
	}
	public String getApepapac() {
		return apepapac;
	}
	public void setApepapac(String apepapac) {
		this.apepapac = apepapac;
	}
	public String getApemapac() {
		return apemapac;
	}
	public void setApemapac(String apemapac) {
		this.apemapac = apemapac;
	}
	public String getDnipac() {
		return dnipac;
	}
	public void setDnipac(String dnipac) {
		this.dnipac = dnipac;
	}	
		
		
	
	
	
	}
