package com.example.demo.DTO;

import java.sql.Timestamp;
import java.util.Date;

public class FechaRange {
	
	private  Timestamp start;
	private Timestamp end ;
	private Integer idpaciente;
	
	
	
	public FechaRange() {}
	
	
	
	
	public FechaRange(Timestamp start, Timestamp end, Integer idpaciente) {
		super();
		this.start = start;
		this.end = end;
		this.idpaciente = idpaciente;
	}




	public Timestamp getStart() {
		return start;
	}
	public void setStart(Timestamp start) {
		this.start = start;
	}
	public Timestamp getEnd() {
		return end;
	}
	public void setEnd(Timestamp end) {
		this.end = end;
	}
	public Integer getIdpaciente() {
		return idpaciente;
	}
	public void setIdpaciente(Integer idpaciente) {
		this.idpaciente = idpaciente;
	}
	

	
	
}
