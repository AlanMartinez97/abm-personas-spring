package com.exercise.personas.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
@Table(name="Personas")
public class Persona {
	
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Id
	private Long id;
	
	@NotBlank(message="El nombre es requerido")
	@Size(min=2, max=30)
	@Pattern(regexp="^[a-zA-Z ]*$", message="El nombre no debe llevar numeros")
	@Column
	private String nombre;
	
	@NotBlank(message="El apellido es requerido")
	@Size(min=2, max=30, message="El apellido debe tener de 2 a 30 caracteres")
	@Pattern(regexp="^[a-zA-Z ]*$", message="El nombre no debe llevar numeros")
	@Column
	private String apellido;
	
	@NotBlank(message="El telefono es requerido")
	@Size(min=10, max=15, message="El telefono debe tener de 10 a 15 numeros")
	@Pattern(regexp="^[0-9]*$", message="El telefono debe estar conformado por numeros")
	@Column
	private String telefono;
	
	@NotBlank(message="El email es requerido")
	@Size(max=76, message="El email debe tener hasta 76 caracateres")
	@Pattern(regexp="^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",message="Direccion de correo electronico invalida")  
	@Column()
	private String email;

	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	public String getApellido() {
		return apellido;
	}
	
	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
