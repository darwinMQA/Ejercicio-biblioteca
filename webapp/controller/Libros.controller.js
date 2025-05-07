sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function(Controller, JSONModel, MessageToast, MessageBox) {
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
      const oItem = oEvent.getSource().getBindingContext("books").getObject();
      const that = this;

      MessageBox.confirm(`¿Deseas eliminar el libro "${oItem.title}"?`, {
        onClose: function (oAction) {
          if (oAction === "OK") {
            fetch(`http://localhost:3000/api/books/${oItem.id}`, {
              method: "DELETE"
            })
            .then(response => {
              if (response.ok) {
                MessageToast.show("Libro eliminado");
                that.loadBooks();
              } else {
                MessageBox.error("Error al eliminar el libro");
              }
            })
            .catch(err => {
              console.error("Error:", err);
              MessageBox.error("Error de red al eliminar el libro");
            });
          }
        }
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

    onEditBook: function (oEvent) {
      const oItem = oEvent.getSource().getBindingContext("books").getObject();
      const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("EditBook", {
        bookId: oItem.id
      });
    }
  });
});
