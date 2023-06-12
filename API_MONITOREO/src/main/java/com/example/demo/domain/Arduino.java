package com.example.demo.domain;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "arduino")
public class Arduino {
	
	@Id	
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name= "idarduino")
	private Long idarduino;
	
	
	@Column(name= "nombre")
	private String nombre;
	
	
	@Column(name= "flagdisponible")
	private Integer flagdisponible;

	public Arduino() {}
	
	
	public Arduino(Long idarduino, String nombre) {
		super();
		this.idarduino = idarduino;
		this.nombre = nombre;
	}	
	

	public Integer getFlagdisponible() {
		return flagdisponible;
	}


	public void setFlagdisponible(Integer flagdisponible) {
		this.flagdisponible = flagdisponible;
	}


	public Long getIdarduino() {
		return idarduino;
	}


	public void setIdarduino(Long idarduino) {
		this.idarduino = idarduino;
	}


	public String getNombre() {
		return nombre;
	}


	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	
	
}
