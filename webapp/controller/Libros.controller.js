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

  return Controller.extend("quickstart.controller.Libros", {

    onInit: function () {
      this._fetchBooks(); // Cargar los libros al inicializar el controlador
      this._createEditDialog(); // Crear el diálogo de edición
      this._fetchGenresAndAuthors(); // Obtener géneros y autores
    },

    // Obtener todos los libros
    _fetchBooks: function () {
      fetch('http://localhost:3000/api/books')
        .then(response => response.json())
        .then(books => {
          console.log(books);
          var oModel = new sap.ui.model.json.JSONModel();
          oModel.setData({ books: books });
          this.getView().setModel(oModel); // Establecer el modelo en la vista
        })
        .catch(error => {
          console.error('Error al obtener libros:', error);
          MessageToast.show("Error al obtener libros.");
        });
    },

    // Obtener géneros y autores para usarlos en los formularios
    _fetchGenresAndAuthors: function () {
      // Obtener géneros
      fetch('http://localhost:3000/api/genres')  // Asegúrate de tener esta ruta
        .then(response => response.json())
        .then(genres => {
          this.getView().setModel(new sap.ui.model.json.JSONModel({ genres: genres }), "genres");
        })
        .catch(error => {
          console.error('Error al obtener géneros:', error);
          MessageToast.show("Error al obtener géneros.");
        });

      // Obtener autores
      fetch('http://localhost:3000/api/authors')  // Asegúrate de tener esta ruta
        .then(response => response.json())
        .then(authors => {
          this.getView().setModel(new sap.ui.model.json.JSONModel({ authors: authors }), "authors");
        })
        .catch(error => {
          console.error('Error al obtener autores:', error);
          MessageToast.show("Error al obtener autores.");
        });
    },

    // Crear el diálogo de edición para los libros
    _createEditDialog: function () {
      this._oEditDialog = new Dialog({
        title: "Editar Libro",
        content: [
          new Input("editBookTitleInput", { placeholder: "Título" }),
          new Input("editBookRatingInput", { placeholder: "Calificación" }),
          new Input("editBookTotalPagesInput", { placeholder: "Páginas" }),
          new Input("editBookPublishedDateInput", { placeholder: "Fecha de publicación" }),
          new Input("editBookGenreInput", { placeholder: "Género" }),
          new Input("editBookAuthorInput", { placeholder: "Autor" })
        ],
        beginButton: new Button({
          text: "Guardar",
          press: function () {
            const id = this._editBookId;
            const title = sap.ui.getCore().byId("editBookTitleInput").getValue();
            const rating = sap.ui.getCore().byId("editBookRatingInput").getValue();
            const total_pages = sap.ui.getCore().byId("editBookTotalPagesInput").getValue();
            const published_date = sap.ui.getCore().byId("editBookPublishedDateInput").getValue();
            const genre_id = sap.ui.getCore().byId("editBookGenreInput").getValue(); 
            const authors_id = sap.ui.getCore().byId("editBookAuthorInput").getValue(); 

            fetch(`http://localhost:3000/api/books/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ title, rating, total_pages, published_date, genre_id, authors_id })
            })
              .then(response => {
                if (response.ok) {
                  MessageToast.show("Libro actualizado correctamente.");
                  this._fetchBooks();
                } else {
                  MessageToast.show("Error al actualizar el libro.");
                }
                this._oEditDialog.close();
              })
              .catch(error => {
                console.error("Error:", error);
                MessageToast.show("Error al actualizar el libro.");
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

    // Agregar un libro
    onAddBook: function () {
      var title = this.byId("titleInput").getValue();
      var rating = this.byId("ratingInput").getValue();
      var total_pages = this.byId("totalPagesInput").getValue();
      var published_date = this.byId("publishedDateInput").getValue();
      var genre_id = this.byId("genreInput").getValue();
      var authors_id = this.byId("authorInput").getValue();

      if (!title || !rating || !total_pages || !published_date || !genre_id || !authors_id) {
        MessageToast.show("Por favor ingresa todos los datos del libro.");
        return;
      }

      var book = { title, rating, total_pages, published_date, genre_id, authors_id };

      fetch('http://localhost:3000/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
      })
        .then(response => {
          if (response.ok) {
            MessageToast.show("Libro agregado correctamente.");
            this._fetchBooks();
          } else {
            MessageToast.show("Error al agregar libro.");
          }
        })
        .catch(error => {
          console.error('Error al agregar libro:', error);
          MessageToast.show("Error al agregar libro.");
        });
    },

    // Eliminar un libro
    onDeleteBook: function (oEvent) {
      var id = oEvent.getSource().getBindingContext().getProperty("id");

      fetch(`http://localhost:3000/api/books/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            MessageToast.show("Libro eliminado correctamente.");
            this._fetchBooks();
          } else {
            MessageToast.show("Error al eliminar libro.");
          }
        })
        .catch(error => {
          console.error('Error al eliminar libro:', error);
          MessageToast.show("Error al eliminar libro.");
        });
    },

    // Editar un libro
    onUpdateBook: function (oEvent) {
      const context = oEvent.getSource().getBindingContext();
      const book = context.getObject();

      this._editBookId = book.id;
      sap.ui.getCore().byId("editBookTitleInput").setValue(book.title);
      sap.ui.getCore().byId("editBookRatingInput").setValue(book.rating);
      sap.ui.getCore().byId("editBookTotalPagesInput").setValue(book.total_pages);
      sap.ui.getCore().byId("editBookPublishedDateInput").setValue(book.published_date);
      sap.ui.getCore().byId("editBookGenreInput").setValue(book.genre_id); // Aquí deberías manejar el nombre del género
      sap.ui.getCore().byId("editBookAuthorInput").setValue(book.authors_id); // Aquí deberías manejar el nombre del autor

      this._oEditDialog.open();
    }

  });
});
