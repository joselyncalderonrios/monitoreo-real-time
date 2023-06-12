package com.example.demo.DTO;

import java.util.Date;
import java.sql.Timestamp;

public class QueryPromedioPorDiaRangoFechasDTO {
	
	private Date hora;	
	private Double maximo;
	private Double minimo;
	
	
	public QueryPromedioPorDiaRangoFechasDTO() {
		
	}
	
	public Date getHora() {
		return hora;
	}
	public void setHora(Date hora) {
		this.hora = hora;
	}
	public Double getMaximo() {
		return maximo;
	}
	public void setMaximo(Double maximo) {
		this.maximo = maximo;
	}
	public Double getMinimo() {
		return minimo;
	}
	public void setMinimo(Double minimo) {
		this.minimo = minimo;
	}
	
	
	

}
