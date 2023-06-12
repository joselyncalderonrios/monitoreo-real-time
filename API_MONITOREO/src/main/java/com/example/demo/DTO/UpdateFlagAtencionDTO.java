package com.example.demo.DTO;

public class UpdateFlagAtencionDTO {
	
	private Integer flagatencion;
	private Integer idpaciente;
	private Integer flagmonitorear;
	private Integer idArduino;
	private Integer flagdisponible;
	
	public UpdateFlagAtencionDTO() {
		
	}
	
	
	
	public Integer getFlagdisponible() {
		return flagdisponible;
	}



	public void setFlagdisponible(Integer flagdisponible) {
		this.flagdisponible = flagdisponible;
	}



	public Integer getIdArduino() {
		return idArduino;
	}



	public void setIdArduino(Integer idArduino) {
		this.idArduino = idArduino;
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
	public Integer getIdpaciente() {
		return idpaciente;
	}
	public void setIdpaciente(Integer idpaciente) {
		this.idpaciente = idpaciente;
	}
	
	

}
