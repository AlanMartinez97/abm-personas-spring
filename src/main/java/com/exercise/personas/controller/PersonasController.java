package com.exercise.personas.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.exercise.personas.Exception.ResourceAlreadyExistsException;
import com.exercise.personas.Exception.ResourceNotFoundException;
import com.exercise.personas.model.Persona;
import com.exercise.personas.repository.PersonaRepository;

@Controller
public class PersonasController {
	
	@Autowired
	private PersonaRepository repository;
	
	@GetMapping("/")
	public String getHome(){
		return "home";
	}
	
	@GetMapping("/personas")
	public String getPersonas(Model modelo) {
		modelo.addAttribute("personas", repository.findAll());
		return "ListOfPersons";
	}
	
	@GetMapping("/personas/create")
	public String createPersona(Model modelo, HttpServletRequest request) {
		modelo.addAttribute("persona", new Persona());
		modelo.addAttribute("action", request.getRequestURI());
		modelo.addAttribute("method", "POST");
		return "personaForm";
	}
	
	@PostMapping("/personas/create")
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public Map<String, String> createPersona(@Valid @RequestBody Persona persona,
								Model modelo) {
		
		if(repository.existsPersonaByEmail(persona.getEmail())) {
			throw new ResourceAlreadyExistsException("Ya existe una persona con mail " + persona.getEmail());
		}
		
		repository.save(persona);
		Map<String, String> responseBody = new HashMap<String, String>(){
			{
				put("result", "ok");
				put("message", "Persona creada con exito");
			}
		};
		
		return responseBody;
	}
	
	@GetMapping("/personas/edit/{personaId}")
	public String updatePersona(Model modelo,HttpServletRequest request,@PathVariable Long personaId) {
		Persona persona = repository.findById(personaId)
				.map(concretePersona -> {
					return concretePersona;
				}).orElseThrow(
						() -> new ResourceNotFoundException("Persona con id: " + personaId + " no encontrada")
				);
		modelo.addAttribute("persona", persona);
		modelo.addAttribute("action", request.getRequestURI());
		
		
		return "personaForm";
	}
	
	@PostMapping("/personas/edit/{personaId}")
	@ResponseBody
	public Map<String, String> updatePersona(@PathVariable Long personaId,
								 @Valid @RequestBody Persona personaRequest) {
		
		repository.findById(personaId)
				.map(persona -> {
					if((!persona.getEmail().equals(personaRequest.getEmail())) && repository.existsPersonaByEmail(personaRequest.getEmail())) {
						throw new ResourceAlreadyExistsException("Ya existe una persona con mail " + personaRequest.getEmail());
					}
					
					persona.setId(personaId);
					persona.setNombre(personaRequest.getNombre());
					persona.setApellido(personaRequest.getApellido());
					persona.setTelefono(personaRequest.getTelefono());
					persona.setEmail(personaRequest.getEmail());
					
					return repository.save(persona);
				}).orElseThrow(
						() -> new ResourceNotFoundException(
									"Persona con id: " + personaId + " no encontrada"
								)
				);
		
		Map<String, String> responseBody = new HashMap<String, String>() {
			{
				put("result", "ok");
				put("message", "Persona actualizada con exito");
			}
		};
		
		return responseBody;
	}
	
	@DeleteMapping("/personas/delete/{personaId}")
	@ResponseBody
	public Map<String, String> deletePersona(@PathVariable Long personaId){
		repository.findById(personaId)
				.map(persona -> {
					repository.delete(persona);
					return ResponseEntity.ok().build();
				}).orElseThrow(
						() -> new ResourceNotFoundException(
									"Persona con id: " + personaId + " no encontrada"
								)	
				);
		Map<String, String> responseBody = new HashMap<String, String>(){
			{
				put("result", "ok");
				put("message", "Persona eliminada con exito");
			}
		};
		
		return responseBody;
	}
	
	@GetMapping("/personas/exists/{personaEmail}")
	@ResponseBody
	public Map<String, Boolean> existsPersonaWithEmail(@PathVariable String personaEmail){
		Boolean result = repository.existsPersonaByEmail(personaEmail);
		Map<String, Boolean> responseBody = new HashMap<String, Boolean>(){
			{
				put("result", result);
			}
		};
		
		return responseBody;
	}

}
