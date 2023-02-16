import React, { Component } from "react";
import Navbar from "./Navbar";
import { db, storageRef } from "../config/firebase";
import ModalSuccessAddProduct from "./ModalSuccessAddProduct";
import "../style/style.css";

export default class AddProduct extends Component {
  state = {
    bookTitle: "",
    about: "",
    bookPrice: 0,
    imageBook: "",
    file: "",
    isSuccessAddProduct: false,
    errorMessage: "",
    isError: false,
  };

  render() {
    const uploadFile = () => {
      const name = new Date().getTime() + this.state.file.name;
      //console.log(name);
      var uploadTask = storageRef.child("img/" + name).put(this.state.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("default");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
            default:
              console.log("default");
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.setState({ imageBook: downloadURL });
            db.collection("books")
              .add({
                bookTitle: this.state.bookTitle,
                about: this.state.about,
                bookPrice: this.state.bookPrice,
                imageBook: this.state.imageBook,
              })
              .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                this.setState({ isSuccessAddProduct: true });
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
                this.setState({ isSuccessAddProduct: false });
              });
          });
        }
      );
    };
    const handleAddProduct = (event) => {
      event.preventDefault();
      uploadFile();
    };
    const loadImage = (e) => {
      this.setState({ isError: false, errorMessage: "" });
      if (
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpeg"
      ) {
        this.setState({ file: e.target.files[0] });
      } else {
        this.setState({ isError: true, errorMessage: "incompatible files" });
      }
    };
    return (
      <div>
        <Navbar value={false} />
        <div className="container mt-3">
          <h1 className="fw-bold">Add Product</h1>
          <form onSubmit={handleAddProduct}>
            <div className="mb-2">
              <label className="form-label">Book Title</label>
              <input
                type="text"
                placeholder="Book Title"
                autoFocus=""
                className="form-control shadow-none"
                id="bookTitle"
                onChange={(e) => this.setState({ bookTitle: e.target.value })}
                required
              />
            </div>
            <div className="row mb-2">
              <div className="col">
                <label className="form-label">Price</label>
                <input
                  type="text"
                  placeholder="Price"
                  className="form-control shadow-none"
                  id="bookPrice"
                  onChange={(e) =>
                   this.setState({ bookPrice: e.target.value })
                  }
                  required
                />
              </div>              
            </div>
            <div className="mb-2">
              <label className="form-label">About Book</label>
              <textarea
                className="form-control shadow-none"
                id="about"
                rows="3"
                onChange={(e) => this.setState({ about: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="mb-2">
              <label className="form-label">Book Cover</label>
              <input
                className="form-control form-control shadow-none"
                id="cover"
                type="file"
                onChange={loadImage}
              />
            </div>
            {this.state.isError ? (
              <div className="alert alert-danger" role="alert">
                {this.state.errorMessage}
              </div>
            ) : null}
            <div className="w-25">
              <img
                className="mw-100"
                src={
                  this.state.file
                    ? URL.createObjectURL(this.state.file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <div className="d-grid gap-2 mt-2 d-flex flex-row-reverse mb-3">
              <button type="submit" className="btn-add-product">
                Save
              </button>
            </div>
            {this.state.isSuccessAddProduct ? <ModalSuccessAddProduct /> : null}
          </form>
        </div>
      </div>
    );
  }
}
