sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/m/Dialog",
  "sap/m/Input",
  "sap/m/Button",
  "sap/m/Table",
  "sap/m/Column",
  "sap/m/Text",
], function(Controller, JSONModel, MessageToast, MessageBox, Dialog, Input, Button, Table,
  Column,
  Text) {
  "use strict";

  return Controller.extend("quickstart.controller.Libros", {
    onInit: function () {
      this.loadBooks();
    },

    loadBooks: function () {
      var oView = this.getView();
      fetch("http://localhost:3000/api/books")
        .then(response => response.json())
        .then(data => {
          const oModel = new JSONModel(data);
          oView.setModel(oModel, "books");
        })
        .catch(error => {
          console.error("Error al cargar los libros:", error);
          MessageBox.error("No se pudieron cargar los libros.");
        });
    },

    onRefresh: function () {
      this.loadBooks();
      MessageToast.show("Datos actualizados");
    },

    onDeleteBook: function (oEvent) {
      var id = oEvent.getSource().getBindingContext("books").getProperty("ID");

      fetch(`http://localhost:3000/api/books/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          MessageToast.show("Libro eliminado correctamente.");
          this.loadBooks(); // Actualizar la lista de autores
        } else {
          MessageToast.show("Error al eliminar autor.");
        }
      })
      .catch(error => {
        console.error('Error al eliminar autor:', error);
        MessageToast.show("Error al eliminar autor.");
      });
    },

    _createEditDialog: function () {
      this._oEditDialog = new Dialog({
        title: "Editar Libro",
        content: [
          new Input("editTitleInput", { placeholder: "Título" }),
          new Input("editRatingInput", { placeholder: "Calificación" }),
          new Input("editPagesInput", { placeholder: "Total de páginas" }),
          new Input("editDateInput", { placeholder: "Fecha de publicación" }),
          new Input("editGenreInput", { placeholder: "ID del género" }),
          new Input("editAuthorsInput", { placeholder: "ID del autor" })
        ],
        beginButton: new Button({
          text: "Guardar",
          press: function () {
            const id = this._editBookId;
            const title = sap.ui.getCore().byId("editTitleInput").getValue();
            const rating = sap.ui.getCore().byId("editRatingInput").getValue();
            const total_pages = sap.ui.getCore().byId("editPagesInput").getValue();
            const published_date = sap.ui.getCore().byId("editDateInput").getValue();
            const genre_id = sap.ui.getCore().byId("editGenreInput").getValue();
            const authors_id = sap.ui.getCore().byId("editAuthorsInput").getValue();
    
            const updatedBook = {
              title,
              rating,
              total_pages,
              published_date,
              genre_id,
              authors_id
            };
    
            fetch(`http://localhost:3000/api/books/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedBook)
            })
            .then(response => {
              if (response.ok) {
                MessageToast.show("Libro actualizado correctamente.");
                this.loadBooks();
              } else {
                MessageToast.show("Error al actualizar libro.");
              }
              this._oEditDialog.close();
            })
            .catch(error => {
              console.error("Error:", error);
              MessageToast.show("Error al actualizar libro.");
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

    // Agregar libro
    onAddBook: function () {
      var title = this.byId("titleInput").getValue();
      var rating = this.byId("ratingInput").getValue();
      var total_pages = this.byId("pagesInput").getValue();
      var published_date = this.byId("dateInput").getValue();
      var genre_id = this.byId("genreInput").getValue();
      var authors_id = this.byId("authorsInput").getValue();

      if (!title || !rating || !total_pages || !published_date || !genre_id || !authors_id) {
        MessageToast.show("Por favor ingresa todos los datos.");
        return;
      }

      var book = { title: title, rating: rating, total_pages: total_pages, published_date: published_date, genre_id: genre_id, authors_id: authors_id };

      fetch('http://localhost:3000/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
      })
      .then(response => {
        if (response.ok) {
          MessageToast.show("Libro agregado correctamente.");
          this.loadBooks(); // Actualizar la lista de libros
        } else {
          MessageToast.show("Error al agregar libro.");
        }
      })
      .catch(error => {
        console.error('Error al agregar libro:', error);
        MessageToast.show("Error al agregar libro.");
      });
    },

    // Actualizar libro
    onUpdateBook: function (oEvent) {
      const oContext = oEvent.getSource().getBindingContext("books");
      const Book = oContext.getObject();
    
      // Guardamos el ID del libro para actualizarlo después
      this._editBookId = Book.ID;

      if (!this._oEditDialog) {
        this._createEditDialog();
      }
    
      // Asignamos valores actuales al formulario de edición (debe estar en el fragmento/dialog)
      sap.ui.getCore().byId("editTitleInput").setValue(Book.TITLE);
      sap.ui.getCore().byId("editRatingInput").setValue(Book.RATING);
      sap.ui.getCore().byId("editPagesInput").setValue(Book.TOTAL_PAGES);
      sap.ui.getCore().byId("editDateInput").setValue(Book.PUBLISHED_DATE);
      sap.ui.getCore().byId("editGenreInput").setValue(Book.GENRE_ID);
      sap.ui.getCore().byId("editAuthorsInput").setValue(Book.AUTHORS_ID);
    
      // Abrimos el diálogo (asegúrate de que esté creado)
      if (!this._oEditDialog) {
        this._oEditDialog = sap.ui.xmlfragment("quickstart.view.EditBookDialog", this);
        this.getView().addDependent(this._oEditDialog);
      }
      this._oEditDialog.open();
    },
    
  });
});
