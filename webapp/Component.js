sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "sap/ui/core/routing/Router"
  ], function (UIComponent, JSONModel, History, Router) {
    "use strict";
  
    return UIComponent.extend("quickstart.Component", {
      metadata: {
        manifest: "json"
      },
  
      init: function () {
        // Llama al init de la clase base
        UIComponent.prototype.init.apply(this, arguments);
  
        // Inicializa el router (basado en el manifest.json)
        this.getRouter().initialize();
  
        // Incluye estilos personalizados
        jQuery.sap.includeStyleSheet("css/style.css");
      }
    });
  });
  