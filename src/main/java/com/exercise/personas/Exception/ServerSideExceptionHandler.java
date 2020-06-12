package com.exercise.personas.Exception;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;


@ControllerAdvice
public class ServerSideExceptionHandler{
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public Map<String, ArrayList<String>> handleValidationExceptions(
			MethodArgumentNotValidException ex) {
		List<FieldError> errors = ex.getBindingResult().getFieldErrors();
	    Map<String, ArrayList<String>> errorsMap = initErrorsMap(errors);
	    errors.forEach((error) -> {
	        String fieldName = ((FieldError) error).getField();
	        String errorMessage = error.getDefaultMessage();
	        errorsMap.get(fieldName).add(errorMessage);
	    });
	    return errorsMap;
	}
	
	private HashMap<String, ArrayList<String>> initErrorsMap(List<FieldError> errors){
		HashMap<String, ArrayList<String>> errorsMap = new HashMap<>();
		errors.forEach((error) -> {
			errorsMap.put(((FieldError) error).getField(), new ArrayList<String>());
		});
		return errorsMap;
	}
	
	@ExceptionHandler(ResourceAlreadyExistsException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	@ResponseBody
	public Map<String, String> handleResourceAlreadyExistsException(
			ResourceAlreadyExistsException ex){
		Map<String, String> errorMap = new HashMap<String, String>() {
			{
				put("result", "error");
				put("message", ex.getMessage());
			}
		};
		
		return errorMap;
	}
}
