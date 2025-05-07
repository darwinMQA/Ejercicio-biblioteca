sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/Table",
  "sap/m/Column",
  "sap/m/Text",
  "sap/m/ColumnListItem",
  "sap/m/MessageToast",
  "sap/m/Dialog",
  "sap/m/Input",
  "sap/m/Button"
], function (
  Controller,
  Table,
  Column,
  Text,
  ColumnListItem,
  MessageToast,
  Dialog,
  Input,
  Button
) {
  "use strict";

  return Controller.extend("quickstart.controller.Editoriales", {

    onInit: function () {
      this._fetchPublishers();
      this._createEditDialog();
    },

    // Obtener las editoriales
    _fetchPublishers: function () {
      fetch('http://localhost:3000/api/publishers')
        .then(response => response.json())
        .then(publishers => {
          var oModel = new sap.ui.model.json.JSONModel();
          oModel.setData({ publishers: publishers });
          this.getView().setModel(oModel);
        })
        .catch(error => {
          console.error('Error al obtener editoriales:', error);
        });
    },

    _createEditDialog: function () {
      this._oEditDialog = new Dialog({
        title: "Editar Editorial",
        content: [
          new Input("editNameInput", { placeholder: "Nombre" }),
        ],
        beginButton: new Button({
          text: "Guardar",
          press: function () {
            const id = this._editPublisherId;
            const name = sap.ui.getCore().byId("editNameInput").getValue();
          
            fetch(`http://localhost:3000/api/publishers/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name })
            })
            .then(response => {
              if (response.ok) {
                MessageToast.show("Editorial actualizada correctamente.");
                this._fetchPublishers();
              } else {
                MessageToast.show("Error al actualizar editorial.");
              }
              this._oEditDialog.close();
            })
            .catch(error => {
              console.error("Error:", error);
              MessageToast.show("Error al actualizar editorial.");
              this._oEditDialog.close();
            });
          }.bind(this)
        }),
        endButton: new Button({
          text: "Cancelar",
          press: function () {
            this._oEditDialog.close();
          }.bind(this)
        })
      });
    },


    // Agregar editorial
    onAddPublisher: function () {
      var name = this.byId("nameInput").getValue();

      if (!name) {
        MessageToast.show("Por favor ingresa el nombre.");
        return;
      }

      var publisher = { name: name};

      fetch('http://localhost:3000/api/publishers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(publisher)
      })
      .then(response => {
        if (response.ok) {
          MessageToast.show("Editorial agregada correctamente.");
          this._fetchPublishers();
        } else {
          MessageToast.show("Error al agregar Editorial.");
        }
      })
      .catch(error => {
        console.error('Error al agregar editorial:', error);
        MessageToast.show("Error al agregar editorial.");
      });
    },

    // Eliminar editorial
    onDeletePublisher: function (oEvent) {
      var id = oEvent.getSource().getBindingContext().getProperty("ID");

      fetch(`http://localhost:3000/api/publishers/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          MessageToast.show("Editorial eliminada correctamente.");
          this._fetchPublishers(); 
        } else {
          MessageToast.show("Error al eliminar editorial.");
        }
      })
      .catch(error => {
        console.error('Error al eliminar editorial:', error);
        MessageToast.show("Error al eliminar editorial.");
      });
    },

    // Actualizar editorial
    onUpdatePublisher: function (oEvent) {
      const context = oEvent.getSource().getBindingContext();
      const publisher = context.getObject();
    
      this._editPublisherId = publisher.ID;
      sap.ui.getCore().byId("editNameInput").setValue(publisher.NAME);
    
      this._oEditDialog.open();
    }

    
    
    

  });
});
