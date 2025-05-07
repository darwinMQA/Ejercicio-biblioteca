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

  return Controller.extend("quickstart.controller.Autores", {

    onInit: function () {
      this._fetchAuthors();
      this._createEditDialog();
    },

    // Obtener los autores
    _fetchAuthors: function () {
      fetch('http://localhost:3000/api/authors')
        .then(response => response.json())
        .then(authors => {
          var oModel = new sap.ui.model.json.JSONModel();
          oModel.setData({ authors: authors });
          this.getView().setModel(oModel);
        })
        .catch(error => {
          console.error('Error al obtener autores:', error);
        });
    },

    _createEditDialog: function () {
      this._oEditDialog = new Dialog({
        title: "Editar Autor",
        content: [
          new Input("editNameInput", { placeholder: "Nombre" }),
          new Input("editSurnameInput", { placeholder: "Apellido" })
        ],
        beginButton: new Button({
          text: "Guardar",
          press: function () {
            const id = this._editAuthorId;
            const name = sap.ui.getCore().byId("editNameInput").getValue();
            const surname = sap.ui.getCore().byId("editSurnameInput").getValue();
          
            fetch(`http://localhost:3000/api/authors/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, surname })
            })
            .then(response => {
              if (response.ok) {
                MessageToast.show("Autor actualizado correctamente.");
                this._fetchAuthors();
              } else {
                MessageToast.show("Error al actualizar autor.");
              }
              this._oEditDialog.close();
            })
            .catch(error => {
              console.error("Error:", error);
              MessageToast.show("Error al actualizar autor.");
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


    // Agregar autor
    onAddAuthor: function () {
      var name = this.byId("nameInput").getValue();
      var surname = this.byId("surnameInput").getValue();

      if (!name || !surname) {
        MessageToast.show("Por favor ingresa nombre y apellido.");
        return;
      }

      var author = { name: name, surname: surname };

      fetch('http://localhost:3000/api/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(author)
      })
      .then(response => {
        if (response.ok) {
          MessageToast.show("Autor agregado correctamente.");
          this._fetchAuthors(); // Actualizar la lista de autores
        } else {
          MessageToast.show("Error al agregar autor.");
        }
      })
      .catch(error => {
        console.error('Error al agregar autor:', error);
        MessageToast.show("Error al agregar autor.");
      });
    },

    // Eliminar autor
    onDeleteAuthor: function (oEvent) {
      var id = oEvent.getSource().getBindingContext().getProperty("ID");

      fetch(`http://localhost:3000/api/authors/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          MessageToast.show("Autor eliminado correctamente.");
          this._fetchAuthors(); // Actualizar la lista de autores
        } else {
          MessageToast.show("Error al eliminar autor.");
        }
      })
      .catch(error => {
        console.error('Error al eliminar autor:', error);
        MessageToast.show("Error al eliminar autor.");
      });
    },

    // Actualizar autor
    onUpdateAuthor: function (oEvent) {
      const context = oEvent.getSource().getBindingContext();
      const author = context.getObject();
    
      this._editAuthorId = author.ID;
      sap.ui.getCore().byId("editNameInput").setValue(author.NAME);
      sap.ui.getCore().byId("editSurnameInput").setValue(author.SURNAME);
    
      this._oEditDialog.open();
    }

    
    
    

  });
});
