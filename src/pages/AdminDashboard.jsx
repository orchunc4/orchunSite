import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('renders');
    const [renders, setRenders] = useState([]);
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');

    // Form states
    // Form states
    const [renderForm, setRenderForm] = useState({ title: '', subtitle: '', image: null });
    const [modelForm, setModelForm] = useState({ name: '', file: null, thumbnail: null });

    // Delete Modal state
    const [deleteModal, setDeleteModal] = useState({ show: false, id: null, type: null });

    // Check auth
    useEffect(() => {
        if (sessionStorage.getItem('adminAuth') !== 'true') {
            navigate('/admin');
        }
    }, [navigate]);

    // Fetch data
    useEffect(() => {
        setLoading(true);
        Promise.all([fetchRenders(), fetchModels()]);
    }, []);

    const fetchRenders = async () => {
        try {
            const res = await fetch('/api/renders');
            const data = await res.json();
            setRenders(data);
        } catch (err) {
            console.error('Failed to fetch renders:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchModels = async () => {
        try {
            const res = await fetch('/api/models');
            const data = await res.json();
            setModels(data);
        } catch (err) {
            console.error('Failed to fetch models:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRenderUpload = async (e) => {
        e.preventDefault();
        if (!renderForm.image) return alert('Please select an image');

        // 10MB Limit Check
        if (renderForm.image.size > 10 * 1024 * 1024) {
            return alert('File too large! Max size is 10MB for Cloudinary free plan.');
        }

        setLoading(true);
        setUploadStatus('Uploading...');

        const formData = new FormData();
        formData.append('image', renderForm.image);
        formData.append('title', renderForm.title);
        formData.append('subtitle', renderForm.subtitle);

        try {
            const res = await fetch('/api/upload/render', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                setUploadStatus('Upload successful!');
                setRenderForm({ title: '', subtitle: '', image: null });
                fetchRenders();
            } else {
                const data = await res.json();
                setUploadStatus('Upload failed: ' + (data.error || 'Unknown error'));
            }
        } catch (err) {
            setUploadStatus('Error: ' + err.message);
        }
        setLoading(false);
    };

    const handleModelUpload = async (e) => {
        e.preventDefault();
        if (!modelForm.file) return alert('Please select a file');

        // 10MB Limit Check
        if (modelForm.file.size > 10 * 1024 * 1024) {
            return alert('Model File too large! Max size is 10MB.');
        }

        setLoading(true);
        setUploadStatus('Uploading 3D Model...');

        const formData = new FormData();
        formData.append('modelFile', modelForm.file);
        formData.append('name', modelForm.name);
        if (modelForm.thumbnail) {
            formData.append('thumbnailFile', modelForm.thumbnail);
        }

        try {
            const res = await fetch('/api/upload/model', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                setUploadStatus('Model uploaded!');
                setModelForm({ name: '', file: null, thumbnail: null });
                fetchModels();
            } else {
                const data = await res.json();
                setUploadStatus('Upload failed: ' + (data.error || 'Unknown error'));
            }
        } catch (err) {
            setUploadStatus('Error: ' + err.message);
        }
        setLoading(false);
    };

    const initiateDelete = (id, type) => {
        setDeleteModal({ show: true, id, type });
    };

    const confirmDelete = async () => {
        const { id, type } = deleteModal;
        if (!id) return;

        try {
            const endpoint = type === 'render' ? `/api/delete/render/${id}` : `/api/delete/model/${id}`;
            const res = await fetch(endpoint, { method: 'DELETE' });

            if (res.ok) {
                setUploadStatus(`${type === 'render' ? 'Render' : 'Model'} deleted`);
                if (type === 'render') fetchRenders();
                else fetchModels();
            } else {
                setUploadStatus('Delete failed');
            }
        } catch (err) {
            setUploadStatus('Error: ' + err.message);
        }
        setDeleteModal({ show: false, id: null, type: null });
    };

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuth');
        navigate('/admin');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-dark)',
            padding: '100px 20px 40px'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px'
                }}>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--accent-red)'
                    }}>
                        ADMIN DASHBOARD
                    </h1>
                    <button onClick={handleLogout} className="glass-btn">
                        LOGOUT
                    </button>
                </div>

                {/* Status Message */}
                {uploadStatus && (
                    <div style={{
                        padding: '15px',
                        marginBottom: '20px',
                        background: uploadStatus.includes('Error') || uploadStatus.includes('failed') ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,0,0.1)',
                        border: `1px solid ${uploadStatus.includes('Error') || uploadStatus.includes('failed') ? 'rgba(255,0,0,0.2)' : 'rgba(0,255,0,0.2)'}`,
                        borderRadius: '4px',
                        textAlign: 'center',
                        color: uploadStatus.includes('Error') || uploadStatus.includes('failed') ? '#ff6b6b' : '#63e6be'
                    }}>
                        {uploadStatus}
                    </div>
                )}

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                    <button
                        onClick={() => setActiveTab('renders')}
                        className="glass-btn"
                        style={{
                            background: activeTab === 'renders' ? 'var(--accent-red)' : 'transparent'
                        }}
                    >
                        RENDERS
                    </button>
                    <button
                        onClick={() => setActiveTab('models')}
                        className="glass-btn"
                        style={{
                            background: activeTab === 'models' ? 'var(--accent-red)' : 'transparent'
                        }}
                    >
                        3D MODELS
                    </button>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
                        <h2 style={{ color: 'var(--text-secondary)' }}>Loading Data...</h2>
                    </div>
                ) : (
                    <div className="glass-panel" style={{ padding: '30px' }}>
                        {activeTab === 'renders' ? (
                            <div>
                                <h2 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>
                                    Upload New Render
                                </h2>
                                <form onSubmit={handleRenderUpload} style={{ marginBottom: '40px' }}>
                                    <div style={{ display: 'grid', gap: '15px', maxWidth: '500px' }}>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={renderForm.title || ''}
                                            onChange={(e) => setRenderForm({ ...renderForm, title: e.target.value })}
                                            style={{
                                                padding: '12px',
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: '4px',
                                                color: 'white'
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Subtitle (optional)"
                                            value={renderForm.subtitle || ''}
                                            onChange={(e) => setRenderForm({ ...renderForm, subtitle: e.target.value })}
                                            style={{
                                                padding: '12px',
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: '4px',
                                                color: 'white'
                                            }}
                                        />
                                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                                            <button type="button" className="glass-btn" style={{ width: '100%', textAlign: 'left', fontSize: '0.9rem', color: renderForm.image ? 'var(--text-primary)' : 'var(--text-secondary)', textTransform: 'none' }}>
                                                {renderForm.image ? `SELECTED: ${renderForm.image.name}` : 'CHOOSE RENDER IMAGE...'}
                                            </button>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setRenderForm({ ...renderForm, image: e.target.files[0] })}
                                                style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 0,
                                                    opacity: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="glass-btn"
                                            disabled={loading}
                                            style={{ padding: '15px' }}
                                        >
                                            {loading ? 'UPLOADING...' : 'UPLOAD RENDER'}
                                        </button>
                                    </div>
                                </form>

                                <h3 style={{ marginBottom: '15px', color: 'var(--text-secondary)' }}>
                                    Current Renders ({renders.length})
                                </h3>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                    gap: '20px'
                                }}>
                                    {renders.map((render) => (
                                        <div key={render.id} style={{
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            position: 'relative'
                                        }}>
                                            <img
                                                src={render.imageUrl}
                                                alt={render.title}
                                                style={{
                                                    width: '100%',
                                                    height: '180px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <div style={{ padding: '15px' }}>
                                                <p style={{ fontWeight: 'bold', color: 'white', marginBottom: '5px' }}>{render.title}</p>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>
                                                    {render.subtitle}
                                                </p>
                                                <button
                                                    onClick={() => initiateDelete(render.id, 'render')}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px',
                                                        background: 'rgba(255,0,0,0.1)',
                                                        border: '1px solid rgba(255,0,0,0.2)',
                                                        color: '#ff6b6b',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.8rem',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = 'rgba(255,0,0,0.2)';
                                                        e.currentTarget.style.borderColor = 'rgba(255,0,0,0.4)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = 'rgba(255,0,0,0.1)';
                                                        e.currentTarget.style.borderColor = 'rgba(255,0,0,0.2)';
                                                    }}
                                                >
                                                    DELETE
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>
                                    Upload New 3D Model
                                </h2>
                                <form onSubmit={handleModelUpload} style={{ marginBottom: '40px' }}>
                                    <div style={{ display: 'grid', gap: '15px', maxWidth: '500px' }}>
                                        <input
                                            type="text"
                                            placeholder="Model Name"
                                            value={modelForm.name || ''}
                                            onChange={(e) => setModelForm({ ...modelForm, name: e.target.value })}
                                            style={{
                                                padding: '12px',
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: '4px',
                                                color: 'white'
                                            }}
                                        />
                                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                                            <button type="button" className="glass-btn" style={{ width: '100%', textAlign: 'left', fontSize: '0.9rem', color: modelForm.thumbnail ? 'var(--text-primary)' : 'var(--text-secondary)', textTransform: 'none' }}>
                                                {modelForm.thumbnail ? `SELECTED: ${modelForm.thumbnail.name}` : 'CHOOSE THUMBNAIL (OPTIONAL)...'}
                                            </button>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setModelForm({ ...modelForm, thumbnail: e.target.files[0] })}
                                                style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 0,
                                                    opacity: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        </div>
                                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Upload 3D Model (.glb, .gltf)</label>
                                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                                            <button type="button" className="glass-btn" style={{ width: '100%', textAlign: 'left', fontSize: '0.9rem', color: modelForm.file ? 'var(--text-primary)' : 'var(--text-secondary)', textTransform: 'none' }}>
                                                {modelForm.file ? `SELECTED: ${modelForm.file.name}` : 'CHOOSE 3D MODEL FILE...'}
                                            </button>
                                            <input
                                                type="file"
                                                accept=".glb,.gltf"
                                                onChange={(e) => setModelForm({ ...modelForm, file: e.target.files[0] })}
                                                style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 0,
                                                    opacity: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="glass-btn"
                                            disabled={loading}
                                            style={{ padding: '15px' }}
                                        >
                                            {loading ? 'UPLOADING...' : 'UPLOAD MODEL'}
                                        </button>
                                    </div>
                                </form>

                                <h3 style={{ marginBottom: '15px', color: 'var(--text-secondary)' }}>
                                    Current Models ({models.length})
                                </h3>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                    gap: '20px'
                                }}>
                                    {models.map((model) => (
                                        <div key={model.id} style={{
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: '8px',
                                            padding: '25px',
                                            textAlign: 'center',
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '8px',
                                                margin: '0 auto 15px',
                                                overflow: 'hidden',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'rgba(0,0,0,0.3)',
                                                border: '1px solid rgba(255,255,255,0.1)'
                                            }}>
                                                {model.thumbnailUrl ? (
                                                    <img src={model.thumbnailUrl} alt={model.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <img src="/model-thumb.png" alt="Default Thumbnail" style={{ width: '80%', height: '80%', objectFit: 'contain', opacity: 0.7 }} />
                                                )}
                                            </div>
                                            <p style={{ fontWeight: 'bold', color: 'white', marginBottom: '5px' }}>{model.name}</p>
                                            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                                                GLB Model
                                            </p>
                                            <button
                                                onClick={() => initiateDelete(model.id, 'model')}
                                                style={{
                                                    width: '100%',
                                                    padding: '8px',
                                                    background: 'rgba(255,0,0,0.1)',
                                                    border: '1px solid rgba(255,0,0,0.2)',
                                                    color: '#ff6b6b',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.8rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'rgba(255,0,0,0.2)';
                                                    e.currentTarget.style.borderColor = 'rgba(255,0,0,0.4)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'rgba(255,0,0,0.1)';
                                                    e.currentTarget.style.borderColor = 'rgba(255,0,0,0.2)';
                                                }}
                                            >
                                                DELETE
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div className="glass-panel" style={{ padding: '30px', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '20px', color: 'white' }}>Confirm Delete?</h3>
                        <p style={{ marginBottom: '30px', color: 'var(--text-secondary)' }}>
                            Are you sure you want to delete this {deleteModal.type}? This action cannot be undone.
                        </p>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <button
                                onClick={() => setDeleteModal({ show: false, id: null, type: null })}
                                className="glass-btn"
                                style={{ background: 'transparent', opacity: 0.7 }}
                            >
                                CANCEL
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="glass-btn"
                                style={{ background: 'var(--accent-red)', borderColor: 'var(--accent-red)' }}
                            >
                                DELETE
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
