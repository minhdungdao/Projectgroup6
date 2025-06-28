import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import httpClient from "../../auth/httpClient";

const AddTablet = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [productName, setProductName] = useState("");
  const [dies, setDies] = useState("");
  const [maxPressure, setMaxPressure] = useState("");
  const [maxDiameter, setMaxDiameter] = useState("");
  const [maxDepthOfFill, setMaxDepthOfFill] = useState("");
  const [productionCapacity, setProductionCapacity] = useState("");
  const [machineSize, setMachineSize] = useState("");
  const [netWeight, setNetWeight] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Toast state like AddCareer
  const [toast, setToast] = useState({ message: "", type: "" });

  // Toast function like AddCareer
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 3000);
  };

  useEffect(() => {
    if (isEditing) {
      httpClient
        .get(`/api/Tablet/${id}`)
        .then((res) => {
          const data = res.data;
          setProductName(data.modelNumber);
          setDies(data.dies);
          setMaxPressure(data.maxPressure);
          setMaxDiameter(data.maxTabletDiameterMM);
          setMaxDepthOfFill(data.maxDepthOfFillMM);
          setProductionCapacity(data.productionCapacity);
          setMachineSize(data.machineSize);
          setNetWeight(data.netWeightKG);
          setPrice(data.price);
          setPreview(
            data.avatar ? `https://localhost:5194${data.avatar}` : null
          );
          setImage(null);
        })
        .catch((err) => {
          showToast("Error loading data: " + err.message, "error");
        });
    }
  }, [id, isEditing]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ModelNumber", productName);
    formData.append("Dies", dies);
    formData.append("MaxPressure", parseFloat(maxPressure));
    formData.append("MaxTabletDiameterMM", parseFloat(maxDiameter));
    formData.append("MaxDepthOfFillMM", parseFloat(maxDepthOfFill));
    formData.append("ProductionCapacity", productionCapacity);
    formData.append("MachineSize", machineSize);
    formData.append("NetWeightKG", parseFloat(netWeight));
    formData.append("Price", parseFloat(price));
    if (image) formData.append("Avatar", image);

    try {
      if (isEditing) {
        await httpClient.put(`/api/Tablet/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("✅ Product updated successfully!", "success");
      } else {
        await httpClient.post("/api/Tablet", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("🎉 Product added successfully!", "success");
      }
      setTimeout(() => {
        handleGoBack();
      }, 1000);
    } catch (error) {
      showToast(
        "❌ Error: " + (error.response?.data?.message || error.message),
        "error"
      );
    }
  };

  const fields = [
    {
      label: "Product Name",
      value: productName,
      onChange: setProductName,
      placeholder: "Enter product name",
      type: "text",
    },
    {
      label: "Dies",
      value: dies,
      onChange: setDies,
      placeholder: "e.g. 12",
      type: "text",
    },
    {
      label: "Max Pressure",
      value: maxPressure,
      onChange: setMaxPressure,
      placeholder: "e.g. 500",
      type: "number",
    },
    {
      label: "Max Diameter",
      value: maxDiameter,
      onChange: setMaxDiameter,
      placeholder: "e.g. 14",
      type: "number",
    },
    {
      label: "Max Depth of Fill",
      value: maxDepthOfFill,
      onChange: setMaxDepthOfFill,
      placeholder: "e.g. 8",
      type: "number",
    },
    {
      label: "Production Capacity",
      value: productionCapacity,
      onChange: setProductionCapacity,
      placeholder: "e.g. 2000 tablets/hour",
      type: "text",
    },
    {
      label: "Machine Size",
      value: machineSize,
      onChange: setMachineSize,
      placeholder: "e.g. 800 x 600 x 1200 mm",
      type: "text",
    },
    {
      label: "Net Weight (kg)",
      value: netWeight,
      onChange: setNetWeight,
      placeholder: "e.g. 150",
      type: "number",
    },
    {
      label: "Price ($)",
      value: price,
      onChange: setPrice,
      placeholder: "e.g. 1500",
      type: "number",
    },
  ];

  return (
    <div
      style={{
        maxWidth: "720px",
        margin: "3rem auto",
        padding: "3rem 2.5rem",
        borderRadius: "20px",
        background: "#fff",
        boxShadow: "0 8px 40px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      <h2
        style={{
          fontWeight: 700,
          fontSize: "2rem",
          marginBottom: "2.5rem",
          color: "#0369a1",
          textAlign: "center",
        }}
      >
        {isEditing ? "Edit Tablet Product" : "Add New Tablet Product"}
      </h2>

      <button
        type="button"
        onClick={handleGoBack}
        style={{
          background: "#bae6fd",
          color: "#0369a1",
          border: "2px solid white",
          boxShadow: "0 4px 8px rgba(3, 105, 161, 0.2)",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "2rem",
          width: "fit-content",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#0369a1";
          e.target.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "#bae6fd";
          e.target.style.color = "#0369a1";
        }}
      >
        <i className="fas fa-arrow-left"></i> Go Back
      </button>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1.8rem" }}>
          <label
            htmlFor="product-image"
            style={{
              fontWeight: 600,
              color: "#1e293b",
              marginBottom: "0.6rem",
              display: "block",
              fontSize: "1.1rem",
            }}
          >
            Product Image
          </label>
          <input
            id="product-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ cursor: "pointer", fontSize: "1rem", padding: "6px 0" }}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                marginTop: "10px",
                maxWidth: "100%",
                maxHeight: "300px",
                borderRadius: "10px",
                objectFit: "contain",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            />
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.8rem",
            marginBottom: "1.8rem",
          }}
        >
          {fields.map((field, idx) => (
            <div
              key={idx}
              style={{
                flex: "1 1 45%",
                minWidth: "250px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label
                style={{
                  fontWeight: 600,
                  color: "#1e293b",
                  marginBottom: "0.6rem",
                  fontSize: "1.1rem",
                }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                required
                style={{
                  padding: "16px",
                  fontSize: "1.1rem",
                  borderRadius: "10px",
                  border: "1.5px solid #e2e8f0",
                  backgroundColor: "#f8fafc",
                  outline: "none",
                  transition: "border 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0369a1")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <button
            type="submit"
            style={{
              marginTop: "2.5rem",
              backgroundColor: "#bae6fd",
              color: "#0369a1",
              border: "1.5px solid #e2e8f0",
              padding: "14px 24px",
              borderRadius: "10px",
              fontSize: "1.1rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(3, 105, 161, 0.2)",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => (e.target.style.border = "1.5px solid #0369a1")}
            onBlur={(e) => (e.target.style.border = "1.5px solid #e2e8f0")}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#0369a1";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#bae6fd";
              e.target.style.color = "#0369a1";
            }}
          >
            {id ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>

      {/* Toast Notification like AddCareer */}
      {toast.message && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "14px 20px",
            borderRadius: "8px",
            backgroundColor:
              toast.type === "success"
                ? "#dcfce7"
                : toast.type === "error"
                ? "#fee2e2"
                : "#e0f2fe",
            color:
              toast.type === "success"
                ? "#166534"
                : toast.type === "error"
                ? "#b91c1c"
                : "#0369a1",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            fontWeight: 600,
            zIndex: 9999,
            transition: "all 0.3s ease",
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default AddTablet;
