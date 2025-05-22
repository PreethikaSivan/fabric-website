import React, { useState } from 'react';
import './FabricManager.css';
import BASE_URL from '../../utils/api';
const FabricsManager = () => {
  const [fabricName, setFabricName] = useState('');
  const [fabricCategory, setFabricCategory] = useState('');
  const [fabricPrice, setFabricPrice] = useState('');
  const [fabricImage, setFabricImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFabricSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', fabricName);
    formData.append('type', fabricCategory);
    formData.append('price', fabricPrice);
    formData.append('image', fabricImage);

    try {
      const res = await fetch(`${BASE_URL}/api/products/add`, {
  method: 'POST',
  body: formData,
});


      const data = await res.json();
      console.log('Response:', data);

      // Reset fields
      setFabricName('');
      setFabricCategory('');
      setFabricPrice('');
      setFabricImage(null);
      setPreview(null);
      setShowModal(false);
      alert('Fabric added successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload fabric');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFabricImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="fabrics-manager-container">
      <h2>Fabric Manager</h2>
      <button className="add-fabric-btn" onClick={() => setShowModal(true)}>
        + Add Fabric
      </button>

      {showModal && (
        <div className="modal-backdrop">
          <div className="fabric-modal">
            <h3>Add New Fabric</h3>
            <form onSubmit={handleFabricSubmit} className="fabric-form">
              <input
                type="text"
                placeholder="Fabric Name"
                value={fabricName}
                onChange={(e) => setFabricName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Fabric Category"
                value={fabricCategory}
                onChange={(e) => setFabricCategory(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Price (e.g. ₹500)"
                value={fabricPrice}
                onChange={(e) => setFabricPrice(e.target.value)}
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />

              {preview && (
                <div className="preview-section">
                  <img src={preview} alt="Preview" className="preview-img" />
                </div>
              )}

              <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FabricsManager;
