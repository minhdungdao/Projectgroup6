import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import httpClient from '../../auth/httpClient';

const InputField = ({ id, label, value, onChange, placeholder, type }) => (
    <div
        style={{
            flex: '1 1 45%',
            minWidth: '250px',
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        <label
            htmlFor={id}
            style={{
                fontWeight: 600,
                color: '#1e293b',
                marginBottom: '0.6rem',
                fontSize: '1.1rem',
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
                padding: '16px',
                fontSize: '1.1rem',
                borderRadius: '10px',
                border: '1.5px solid #e2e8f0',
                backgroundColor: '#f8fafc',
            }}
        />
    </div>
);

const AddProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [output, setOutput] = useState('');
    const [capsuleSize, setCapsuleSize] = useState('');
    const [machineDimension, setMachineDimension] = useState('');
    const [weight, setWeight] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState(null);

    const [toast, setToast] = useState({ message: '', type: '' });

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const res = await httpClient.get(`/api/Capsule/${id}`);
                    const data = res.data;
                    setProductName(data.name.trim());
                    setOutput(data.output.toString());
                    setCapsuleSize(data.capsuleSize.toString());
                    setMachineDimension(data.machineDimension);
                    setWeight(data.shippingWeight.toString());
                    setPrice(data.price.toString());
                    setExistingImageUrl(`https://localhost:5194${data.avatar}`);
                } catch (error) {
                    showToast('❌ Error loading product data.', 'error');
                    console.error(error);
                }
            };
            fetchProduct();
        }
    }, [id]);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => {
            setToast({ message: '', type: '' });
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productName.trim()) {
            showToast('❌ Please enter the product name.', 'error');
            return;
        }

        if (!id && !image) {
            showToast('❌ Please select a product image.', 'error');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('Name', productName.trim());
            formData.append('Output', parseInt(output));
            if (image) {
                formData.append(id ? 'AvatarFile' : 'Avatar', image);
            }
            formData.append('CapsuleSize', parseFloat(capsuleSize));
            formData.append('MachineDimension', machineDimension.trim());
            formData.append('ShippingWeight', parseFloat(weight));
            formData.append('Price', parseFloat(price));

            let res;
            if (id) {
                res = await httpClient.put(`/api/Capsule/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                res = await httpClient.post('/api/Capsule', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            if (res.status >= 200 && res.status < 300) {
                showToast(id ? '✅ Product updated successfully!' : '🎉 Product added successfully!', 'success');
                setTimeout(() => {
                    navigate('/adminproduct');
                }, 1200);
            } else {
                showToast(id ? '❌ Failed to update product.' : '❌ Failed to add product.', 'error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showToast('❌ An error occurred.', 'error');
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setExistingImageUrl(null);
        }
    };

    const fields = [
        {
            id: 'productName',
            label: 'Product Name',
            value: productName,
            onChange: setProductName,
            placeholder: 'Enter product name',
            type: 'text',
        },
        {
            id: 'output',
            label: 'Output',
            value: output,
            onChange: setOutput,
            placeholder: 'e.g., 2000',
            type: 'number',
        },
        {
            id: 'capsuleSize',
            label: 'Capsule Size (mm)',
            value: capsuleSize,
            onChange: setCapsuleSize,
            placeholder: 'e.g., 12',
            type: 'number',
        },
        {
            id: 'machineDimension',
            label: 'Machine Dimension (mm)',
            value: machineDimension,
            onChange: setMachineDimension,
            placeholder: 'e.g., 800 x 600 x 1200 mm',
            type: 'text',
        },
        {
            id: 'weight',
            label: 'Weight (kg)',
            value: weight,
            onChange: setWeight,
            placeholder: 'e.g., 150',
            type: 'number',
        },
        {
            id: 'price',
            label: 'Price ($)',
            value: price,
            onChange: setPrice,
            placeholder: 'e.g., 2500',
            type: 'number',
        },
    ];

    return (
        <div
            style={{
                maxWidth: '720px',
                margin: '3rem auto',
                padding: '3rem 2.5rem',
                borderRadius: '20px',
                background: '#fff',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h2
                style={{
                    fontWeight: 700,
                    fontSize: '2rem',
                    marginBottom: '2.5rem',
                    color: '#0369a1',
                    textAlign: 'center',
                }}
            >
                {id ? 'Edit Capsule Product' : 'Add New Capsule Product'}
            </h2>

            <button
                type="button"
                onClick={handleGoBack}
                style={{
                    background: '#bae6fd',
                    color: '#0369a1',
                    border: '2px solid white',
                    boxShadow: '0 4px 8px rgba(3, 105, 161, 0.2)',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '2rem',
                    width: 'fit-content',
                    outline: 'none',
                }}
                onMouseEnter={(e) => {
                    e.target.style.background = '#0369a1';
                    e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                    e.target.style.background = '#bae6fd';
                    e.target.style.color = '#0369a1';
                }}
            >
                <i className="fas fa-arrow-left"></i> Go Back
            </button>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.8rem' }}>
                    <label
                        htmlFor="product-image"
                        style={{
                            fontWeight: 600,
                            color: '#1e293b',
                            marginBottom: '0.6rem',
                            display: 'block',
                            fontSize: '1.1rem',
                        }}
                    >
                        Product Image
                    </label>
                    <input id="product-image" type="file" accept="image/*" onChange={handleImageChange} />
                    {preview ? (
                        <img
                            src={preview}
                            alt="Preview"
                            style={{
                                marginTop: '10px',
                                maxWidth: '100%',
                                maxHeight: '300px',
                                borderRadius: '10px',
                                objectFit: 'contain',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            }}
                        />
                    ) : existingImageUrl ? (
                        <img
                            src={existingImageUrl}
                            alt="Existing"
                            style={{
                                marginTop: '10px',
                                maxWidth: '100%',
                                maxHeight: '300px',
                                borderRadius: '10px',
                                objectFit: 'contain',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            }}
                        />
                    ) : null}
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        justifyContent: 'space-between',
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
                        marginTop: '2.5rem',
                        backgroundColor: '#bae6fd',
                        color: '#0369a1',
                        border: '1.5px solid #e2e8f0',
                        padding: '14px 24px',
                        borderRadius: '10px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 6px 20px rgba(3, 105, 161, 0.2)',
                        transition: 'all 0.2s ease',
                    }}
                    onFocus={(e) => (e.target.style.border = '1.5px solid #0369a1')}
                    onBlur={(e) => (e.target.style.border = '1.5px solid #e2e8f0')}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#0369a1';
                        e.target.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#bae6fd';
                        e.target.style.color = '#0369a1';
                    }}
                >
                    {id ? 'Update Product' : 'Add Product'}
                </button>
            </form>

            {toast.message && (
                <div
                    style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        padding: '14px 20px',
                        borderRadius: '8px',
                        backgroundColor:
                            toast.type === 'success' ? '#dcfce7' : toast.type === 'error' ? '#fee2e2' : '#e0f2fe',
                        color: toast.type === 'success' ? '#166534' : toast.type === 'error' ? '#b91c1c' : '#0369a1',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        fontWeight: 600,
                        zIndex: 9999,
                        transition: 'all 0.3s ease',
                    }}
                >
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default AddProduct;
