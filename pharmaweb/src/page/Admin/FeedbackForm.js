import React, { useState } from 'react';

const styles = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    background: '#f9fafb',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#0369a1',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1.5px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
  },
  textarea: {
    padding: '0.75rem 1rem',
    border: '1.5px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
    resize: 'vertical',
    transition: 'border-color 0.3s ease',
  },
  button: {
    backgroundColor: '#0369a1',
    color: 'white',
    border: 'none',
    padding: '0.85rem',
    borderRadius: '6px',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }
};

const FeedbackForm = ({ title = "Gửi phản hồi", category = "general" }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Phản hồi từ:', category, formData);
    alert(`Cảm ơn bạn đã gửi phản hồi về ${category}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{title}</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Họ tên"
          onChange={handleChange}
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = '#0369a1'}
          onBlur={(e) => e.target.style.borderColor = '#ccc'}
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = '#0369a1'}
          onBlur={(e) => e.target.style.borderColor = '#ccc'}
        />
        <textarea
          name="message"
          placeholder="Nội dung phản hồi..."
          onChange={handleChange}
          required
          style={styles.textarea}
          onFocus={(e) => e.target.style.borderColor = '#0369a1'}
          onBlur={(e) => e.target.style.borderColor = '#ccc'}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={e => e.target.style.backgroundColor = '#024f6b'}
          onMouseLeave={e => e.target.style.backgroundColor = '#0369a1'}
          onMouseDown={e => e.target.style.backgroundColor = '#013745'}
          onMouseUp={e => e.target.style.backgroundColor = '#024f6b'}
        >
          Gửi phản hồi
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
