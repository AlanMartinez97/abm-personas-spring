<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>    
<!DOCTYPE html>

  <div id="table-container">
    <table>
  	  <tr>
  	    <th>
  	      Id
  	    </th>
  	    <th>
  	      Nombre
  	    </th>
  	    <th>
  	      Apellido
  	    </th>
  	    <th>
  	      Telefono
  	    </th>
  	    <th>
  	      Email
  	    </th>
  	    <th>
  	    </th>
  	  </tr>
  	  <c:forEach items="${personas }" var="persona" varStatus="tagStatus">
        <tr id="${persona.email}">
      	  <td>
      	    ${persona.id}
      	  </td>
          <td>
            ${persona.nombre}
          </td>
          <td>
            ${persona.apellido }
          </td>
          <td>
            ${persona.telefono}
          </td>
          <td>
            ${persona.email}
          </td>
          <td class="actionCell">
            <a class="btn-floating btn-large waves-effect waves-light green page-nav-form"><i class="material-icons" data-action="/personas/edit/${persona.id}">create</i></a>
            <a class="btn-floating btn-large waves-effect waves-light red page-nav-delete"><i class="material-icons" data-action="/personas/delete/${persona.id }">delete</i></a>
          </td>
        </tr>
  	  </c:forEach>
    </table>
  </div>
  
  <div id="deleteConfirmation" class="modalContainer browser-default">
    <!-- Modal content -->
    <div name="modalContent"class="modal-content">
      <span name="closeModal" class="close">&times;</span>
      <center>
        <h5>Esta seguro de querer eliminar a la persona?</h5>
        <a name="acceptBtn" class="btn-floating btn-large waves-effect waves-light green modal-btn"><i class="material-icons" >done</i></a>
        <a name="cancelBtn" class="btn-floating btn-large waves-effect waves-light red modal-btn"><i class="material-icons" >close</i></a>
        </center>
    </div>
  </div>