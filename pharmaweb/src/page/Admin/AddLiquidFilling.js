import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import httpClient from "../../auth/httpClient";

const InputField = ({ id, label, value, onChange, placeholder, type }) => (
  <div
    style={{
      flex: "1 1 45%",
      minWidth: "250px",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <label
      htmlFor={id}
      style={{
        fontWeight: 600,
        color: "#1e293b",
        marginBottom: "0.6rem",
        fontSize: "1.1rem",
      }}
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required
      style={{
        padding: "16px",
        fontSize: "1.1rem",
        borderRadius: "10px",
        border: "1.5px solid #e2e8f0",
        backgroundColor: "#f8fafc",
      }}
    />
  </div>
);

const AddLiquidFilling = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State cho các trường input
  const [productName, setProductName] = useState("");
  const [airPressure, setAirPressure] = useState("");
  const [airVolume, setAirVolume] = useState("");
  const [fillingSpeed, setFillingSpeed] = useState("");
  const [fillingRange, setFillingRange] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);

  const [toast, setToast] = useState({ message: "", type: "" });

  // Lấy dữ liệu sản phẩm khi có id (chỉnh sửa)
  useEffect(() => {
  if (id) {
    const fetchProduct = async () => {
      try {
        const res = await httpClient.get(`/api/LiquidFilling/${id}`);
        const data = res.data;

        setProductName(data.modelName?.trim() || "");
        setAirPressure(data.airPressure?.toString() || "");
        setAirVolume(data.airVolume?.toString() || "");
        setFillingSpeed(data.fillingSpeedBPM?.toString() || "");
        setFillingRange(data.fillingRangeML || "");
        setPrice(data.price?.toString() || "");

        // Nếu avatar có, thêm base URL backend vào để hiển thị đúng ảnh
        setExistingImageUrl(
          data.avatar ? `https://localhost:5194${data.avatar}` : null
        );
      } catch (error) {
        showToast("❌ Failed to load product data.", "error");
        console.error(error);
      }
    };

    fetchProduct();
  }
}, [id]);



  // Cleanup preview URL khi thay đổi hoặc component unmount
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Hiển thị toast
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  // Xử lý submit form (thêm hoặc cập nhật)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName.trim()) {
      showToast("❌ Please enter the product name.", "error");
      return;
    }
    if (!id && !image) {
      showToast("❌ Please select a product image.", "error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("ModelName", productName.trim());
      formData.append("AirPressure", parseFloat(airPressure));
      formData.append("AirVolume", parseFloat(airVolume));
      formData.append("FillingSpeedBPM", parseFloat(fillingSpeed));
      formData.append("FillingRangeML", fillingRange);
      formData.append("Price", parseFloat(price));
      if (image) formData.append("Avatar", image);

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const res = id
        ? await httpClient.put(`/api/LiquidFilling/${id}`, formData, config)
        : await httpClient.post("/api/LiquidFilling", formData, config);

      if (res.status >= 200 && res.status < 300) {
        showToast(
          id ? "✅ Product updated successfully!" : "🎉 Product added successfully!",
          "success"
        );
        setTimeout(() => navigate(-1), 1200);
      } else {
        showToast(
          id ? "❌ Failed to update product." : "❌ Failed to add product.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("❌ An error occurred.", "error");
    }
  };

  // Quay lại trang trước
  const handleGoBack = () => navigate(-1);

  // Xử lý chọn ảnh mới, cập nhật preview và clear ảnh cũ nếu có
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Nếu trước đó có preview, revoke nó
    if (preview) URL.revokeObjectURL(preview);

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setExistingImageUrl(null);
  };

  const fields = [
    {
      id: "productName",
      label: "Product Name",
      value: productName,
      onChange: setProductName,
      placeholder: "Enter product name",
      type: "text",
    },
    {
      id: "airPressure",
      label: "Air Pressure",
      value: airPressure,
      onChange: setAirPressure,
      placeholder: "E.g. 5",
      type: "number",
    },
    {
      id: "airVolume",
      label: "Air Volume",
      value: airVolume,
      onChange: setAirVolume,
      placeholder: "E.g. 100",
      type: "number",
    },
    {
      id: "fillingSpeed",
      label: "Filling Speed (BPM)",
      value: fillingSpeed,
      onChange: setFillingSpeed,
      placeholder: "E.g. 200",
      type: "number",
    },
    {
      id: "fillingRange",
      label: "Filling Range (ml)",
      value: fillingRange,
      onChange: setFillingRange,
      placeholder: "E.g. 50-300 ml",
      type: "text",
    },
    {
      id: "price",
      label: "Price ($)",
      value: price,
      onChange: setPrice,
      placeholder: "E.g. 1500",
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
        boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
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
        {id ? "Edit Liquid Filling Product" : "Add New Liquid Filling Product"}
      </h2>

      <button
        type="button"
        onClick={handleGoBack}
        style={{
          background: "#bae6fd",
          color: "#0369a1",
          border: "2px solid white",
          boxShadow: "0 4px 8px rgba(3,105,161,0.2)",
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
          e.currentTarget.style.background = "#0369a1";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#bae6fd";
          e.currentTarget.style.color = "#0369a1";
        }}
      >
        <i className="fas fa-arrow-left"></i> Go Back
      </button>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1.8rem" }}>
          <label
            htmlFor="liquidfilling-image"
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
            id="liquidfilling-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              style={{
                marginTop: 10,
                maxWidth: "100%",
                maxHeight: 300,
                borderRadius: 10,
                objectFit: "contain",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            />
          ) : existingImageUrl ? (
            <img
              src={existingImageUrl}
              alt="Existing"
              style={{
                marginTop: 10,
                maxWidth: "100%",
                maxHeight: 300,
                borderRadius: 10,
                objectFit: "contain",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            />
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            justifyContent: "space-between",
          }}
        >
          {fields.map(({ id, label, value, onChange, placeholder, type }) => (
            <InputField
              key={id}
              id={id}
              label={label}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              type={type}
            />
          ))}
        </div>

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
            boxShadow: "0 6px 20px rgba(3,105,161,0.2)",
            transition: "all 0.2s ease",
          }}
          onFocus={(e) => (e.currentTarget.style.border = "1.5px solid #0369a1")}
          onBlur={(e) => (e.currentTarget.style.border = "1.5px solid #e2e8f0")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0369a1";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#bae6fd";
            e.currentTarget.style.color = "#0369a1";
          }}
        >
          {id ? "Update Product" : "Add Product"}
        </button>
      </form>

      {toast.message && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            padding: "14px 20px",
            borderRadius: 8,
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
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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

export default AddLiquidFilling;
