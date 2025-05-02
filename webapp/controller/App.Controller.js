sap.ui.define([
	"sap/ui/core/mvc/Controller"
  ], function (Controller) {
	"use strict";
  
	return Controller.extend("quickstart.controller.App", {
	  
		onInit: function () {
            // Inicializa el enrutador
            this.getOwnerComponent().getRouter().initialize();
        },
  
	  onNavToLibros: function () {
		this.getOwnerComponent().getRouter().navTo("libros");
	  },
  
	  onNavToAutores: function () {
		this.getOwnerComponent().getRouter().navTo("autores");
	  },
  
	  onNavToGeneros: function () {
		this.getOwnerComponent().getRouter().navTo("generos");
	  },
  
	  onNavToEditoriales: function () {
		this.getOwnerComponent().getRouter().navTo("editoriales");
	  }
  
	});
  });
  