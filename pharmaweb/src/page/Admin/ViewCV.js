import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import httpClient from "../../auth/httpClient";

const ViewCV = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const res = await httpClient.get(`/api/CVSubmission/view/${id}`, {
          responseType: "blob", // Get binary file data (PDF)
        });

        const fileBlob = new Blob([res.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(fileBlob);
        setPdfUrl(fileURL);
      } catch (err) {
        setError("Unable to display CV file.");
      } finally {
        setLoading(false);
      }
    };

    fetchCV();
  }, [id]);

  // ✅ Back button handler
  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <p>Loading CV file...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📄 View CV File</h2>

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
        <i className="fas fa-arrow-left"></i> Back
      </button>

      {pdfUrl ? (
        <object
          data={pdfUrl}
          type="application/pdf"
          width="100%"
          height="800px"
        >
          <p>
            Your browser does not support viewing PDF files.{" "}
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              Download file here
            </a>
          </p>
        </object>
      ) : (
        <p>No file to display.</p>
      )}
    </div>
  );
};

export default ViewCV;
