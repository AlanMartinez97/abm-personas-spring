<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
  <form:form name="personaForm" modelAttribute="persona">
    
    <div>
    <form:label path="nombre">Nombre</form:label>
    <form:input path="nombre" class="browser-default" value="${persona.nombre}" placeholder="Ingrese su nombre" autocomplete="off"/>
    </div>
    
    <div>
    <form:label path="apellido">Apellido</form:label>
    <form:input path="apellido" class="browser-default" value="${persona.apellido }" placeholder="Ingrese su apellido" autocomplete="off"/>
    </div>
    
    <div>
    <form:label path="email">Email</form:label>
    <form:input path="email" value="${persona.email}" class="browser-default" placeholder="Ingrese su mail" autocomplete="off"/>
    <p id="mailAlreadyExistsError" class="errorTip hide" data-lastCheck="" data-original="${persona.email}">Ya existe una persona con ese mail</p>
    </div>
    
    <div>
    <form:label path="telefono">Telefono</form:label>
    <form:input path="telefono" value="${persona.telefono}" class="browser-default" type="tel" placeholder="Ingrese su telefono" autocomplete="off"/>
    </div>
    
    <center><button id="buttonSubmit" class="btn blue"name="submit">Enviar</button></center>
    
  </form:form>