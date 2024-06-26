import "./App.css";
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>Album Covers Gallery</h1>
        <p>Upload your favortie album covers to share with the community.</p>
        <p>Méndez Chávez Jesús</p>
        <p>6BM1 // Cómputo en la nube // Rodrigo Ojeda</p>
      </header>
      <div className="upload-section">
        <label htmlFor="file-input" className="custom-button">
          Seleccionar archivo
        </label>
        <input
          id="file-input"
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        <button onClick={uploadFile} className="custom-button">
          Subir imagen
        </button>
      </div>
      <div className="gallery">
        {imageUrls.map((url) => (
          <div key={url} className="image-container">
            <img
              src={url}
              alt="Uploaded"
              onClick={() => setSelectedImage(url)}
              className="gallery-image"
            />
          </div>
        ))}
      </div>
      <Modal show={!!selectedImage} onHide={() => setSelectedImage(null)} centered>
        <Modal.Body>
          <img src={selectedImage} alt="Selected" className="selected-image" />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
