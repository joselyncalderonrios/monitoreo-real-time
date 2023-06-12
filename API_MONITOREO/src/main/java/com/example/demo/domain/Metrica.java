package com.example.demo.domain;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Objects;

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
@Table(name = "metrica")
public class Metrica implements Serializable{
	

	@Id	
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name= "idmetrica")
	private Long id;

	
	
	@Column(name= "idarduino")
	private Integer idarduino;
	
	@Column(name= "valor")
	private Double valor;
	
	@Column(name= "fechahora")
	private Timestamp fechahora;
	
	
	
	@ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name="idpaciente", nullable=true)
	@JsonProperty(access = Access.WRITE_ONLY)
    private Paciente paciente;
	
	
	 public Metrica() {
	        
	}


	public Metrica(Long id, Integer idarduino, Double valor, Timestamp fechahora, Paciente paciente) {
		
		this.id = id;
		this.idarduino = idarduino;
		this.valor = valor;
		this.fechahora = fechahora;
		this.paciente = paciente;
	}
	


	

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Integer getIdarduino() {
		return idarduino;
	}


	public void setIdarduino(Integer idarduino) {
		this.idarduino = idarduino;
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


	public Paciente getPaciente() {
		return paciente;
	}


	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}


	@Override
	public String toString() {
		return "Metrica [id=" + id + ", idarduino=" + idarduino + ", valor=" + valor + ", fechahora=" + fechahora
				+ ", paciente=" + paciente + "]";
	}


	@Override
	public int hashCode() {
		return Objects.hash(fechahora, id, idarduino, paciente, valor);
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Metrica other = (Metrica) obj;
		return Objects.equals(fechahora, other.fechahora) && Objects.equals(id, other.id)
				&& Objects.equals(idarduino, other.idarduino) && Objects.equals(paciente, other.paciente)
				&& Objects.equals(valor, other.valor);
	}


	

	
	

	


	


	
	 
	 
	 
	
}
