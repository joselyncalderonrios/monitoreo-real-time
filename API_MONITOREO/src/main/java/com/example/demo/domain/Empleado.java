package com.example.demo.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "empleado")
public class Empleado implements Serializable{
	
	@Id	
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name= "idempleado")
	private Long id;
	
	@Column(name= "nombres")
	private String nombres;
	
	@Column(name= "apellidopaterno")
	private String apellidoPaterno;
	
	@Column(name= "apellidomaterno")
	private String apellidoMaterno;
	
	@Column(name= "dni")
	private String dni;
	
	@Column(name= "tipo")
	private String tipoEmpleado;
	
	@Column(name= "usuario")
	private String user;
	
	@Column(name= "contrasenia")
	private String pass;	
	
	
	@OneToMany(mappedBy="doctor", cascade=CascadeType.PERSIST)	
	List<Atencion> lsatencionesDoc= new ArrayList<Atencion>();
	
	@OneToMany(mappedBy="enfermera", cascade=CascadeType.PERSIST)	
	List<Atencion> lsatencionesEnf= new ArrayList<Atencion>();
	
	
	
//	public Empleado(){
//		lsatencionesDoc=new ArrayList<Atencion>();
//		lsatencionesEnf=new ArrayList<Atencion>();
//	}
//	
	public Empleado() {
		
	}
	public Empleado(Long id){
		this.id = id;
	}
	
	public Empleado(Long id, String nombres, String apellidoPaterno, String apellidoMaterno, String dni,String tipoEmpleado, String user,
			String pass) {		
		this.id = id;
		this.nombres = nombres;
		this.apellidoPaterno = apellidoPaterno;
		this.apellidoMaterno = apellidoMaterno;
		this.dni = dni;
		this.user = user;
		this.pass = pass;
		this.tipoEmpleado = tipoEmpleado;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getApellidoPaterno() {
		return apellidoPaterno;
	}

	public void setApellidoPaterno(String apellidoPaterno) {
		this.apellidoPaterno = apellidoPaterno;
	}

	public String getApellidoMaterno() {
		return apellidoMaterno;
	}

	public void setApellidoMaterno(String apellidoMaterno) {
		this.apellidoMaterno = apellidoMaterno;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	public String getTipoEmpleado() {
		return tipoEmpleado;
	}

	public void setTipoEmpleado(String tipoEmpleado) {
		this.tipoEmpleado = tipoEmpleado;
	}

	public List<Atencion> getLsatencionesDoc() {
		return lsatencionesDoc;
	}


	public void setLsatencionesDoc(List<Atencion> lsatencionesDoc) {
		this.lsatencionesDoc = lsatencionesDoc;
//		for (Atencion atencion: lsatencionesDoc) {
//			atencion.setDoctor(this);
//			
//		}
	}


	public List<Atencion> getLsatencionesEnf() {
		return lsatencionesEnf;
	}


	public void setLsatencionesEnf(List<Atencion> lsatencionesEnf) {
		this.lsatencionesEnf = lsatencionesEnf;
//		for (Atencion atencion: lsatencionesEnf) {
//			atencion.setEnfermera(this);
//			
//		}
	}
	
	
	

}
