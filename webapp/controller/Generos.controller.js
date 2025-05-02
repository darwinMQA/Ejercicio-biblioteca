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

  return Controller.extend("quickstart.controller.Generos", {

    onInit: function () {
      this._fetchGenre();
      this._createEditDialog();
    },

    // Obtener los generos
    _fetchGenre: function () {
      fetch('http://localhost:3000/api/genres')
        .then(response => response.json())
        .then(genre => {
          var oModel = new sap.ui.model.json.JSONModel();
          oModel.setData({ genre: genre });
          this.getView().setModel(oModel);
          this._updateGenreTable(genre);
        })
        .catch(error => {
          console.error('Error al obtener generos:', error);
        });
    },

    _createEditDialog: function () {
      this._oEditDialog = new Dialog({
        title: "Editar Genero",
        content: [
          new Input("editGenreInput", { placeholder: "Genero" }),
        ],
        beginButton: new Button({
          text: "Guardar",
          press: function () {
            const id = this._editGenreId;
            const genre = sap.ui.getCore().byId("editGenreInput").getValue();
          
            fetch(`http://localhost:3000/api/genres/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ genre })
            })
            .then(response => {
              if (response.ok) {
                MessageToast.show("Genero actualizado correctamente.");
                this._fetchGenre();
              } else {
                MessageToast.show("Error al actualizar genero.");
              }
              this._oEditDialog.close();
            })
            .catch(error => {
              console.error("Error:", error);
              MessageToast.show("Error al actualizar genero.");
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


    // Agregar genero
    onAddGenre: function () {
      var genreInput = this.byId("genreInput").getValue();

      if (!genreInput) {
        MessageToast.show("Por favor ingresa el genero.");
        return;
      }

      var genre = { genre: genreInput };

      fetch('http://localhost:3000/api/genres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(genre)
      })
      .then(response => {
        if (response.ok) {
          MessageToast.show("Genero agregado correctamente.");
          this._fetchGenre(); // Actualizar la lista de generos
        } else {
          MessageToast.show("Error al agregar genero.");
        }
      })
      .catch(error => {
        console.error('Error al agregar genero:', error);
        MessageToast.show("Error al agregar genero.");
      });
    },

    // Eliminar genero
    onDeleteGenre: function (oEvent) {
      var id = oEvent.getSource().getBindingContext().getProperty("ID");

      fetch(`http://localhost:3000/api/genres/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          MessageToast.show("Genero eliminado correctamente.");
          this._fetchGenre(); // Actualizar la lista de generos
        } else {
          MessageToast.show("Error al eliminar genero.");
        }
      })
      .catch(error => {
        console.error('Error al eliminar genero:', error);
        MessageToast.show("Error al eliminar genero.");
      });
    },

    // Actualizar genero
    onUpdateGenre: function (oEvent) {
      const context = oEvent.getSource().getBindingContext();
      const genre = context.getObject();
    
      this._editGenreId = genre.ID;
      sap.ui.getCore().byId("editGenreInput").setValue(genre.GENRE);
    
      this._oEditDialog.open();
    }    

  });
});
