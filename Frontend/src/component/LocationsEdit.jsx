import React, { useState, useEffect } from 'react';
import LocationService from '../service/LocationService'; // Import Service
import 'bootstrap/dist/css/bootstrap.min.css';

const LocationsEdit = () => {
    // --- STATE ---
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter States
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedState, setSelectedState] = useState('All');
    
    // View Modal State
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

    // Edit Modal State
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({
        id: '', title: '', description: '', category: '', 
        imageUrl: '', address: '', city: '', state: '', 
        latitude: '', longitude: ''
    });

    // --- FETCH DATA ---
    const fetchLocations = async () => {
        try {
            const response = await LocationService.getAllLocations();
            setLocations(response.data);
            setFilteredLocations(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching locations:", err);
            setError("Could not load locations.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    // --- FILTER LOGIC ---
    useEffect(() => {
        let result = locations;
        if (selectedCategory !== 'All') result = result.filter(loc => loc.category === selectedCategory);
        if (selectedState !== 'All') result = result.filter(loc => loc.state === selectedState);
        setFilteredLocations(result);
    }, [selectedCategory, selectedState, locations]);

    // --- ACTION HANDLERS ---

    // 1. DELETE (Using Service)
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this location? This cannot be undone.")) {
            try {
                // Call Service
                await LocationService.deleteLocation(id);
                alert("Location deleted successfully!");
                fetchLocations(); // Refresh list
            } catch (err) {
                alert("Failed to delete location.");
                console.error(err);
            }
        }
    };

    // 2. OPEN EDIT MODAL
    const handleEditClick = (location) => {
        setEditFormData(location); 
        setShowEditModal(true);
    };

    // 3. SUBMIT EDIT (Using Service)
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call Service
            await LocationService.updateLocation(editFormData.id, editFormData);
            alert("Location updated successfully!");
            setShowEditModal(false);
            fetchLocations(); // Refresh list
        } catch (err) {
            alert("Failed to update location.");
            console.error(err);
        }
    };

    // 4. HANDLE INPUT CHANGE
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    // View Modal Handlers
    const handleViewClick = (location) => { setSelectedLocation(location); setShowViewModal(true); };
    const handleCloseViewModal = () => { setShowViewModal(false); setSelectedLocation(null); };

    // --- HELPERS ---
    const uniqueCategories = ['All', ...new Set(locations.map(loc => loc.category))];
    const uniqueStates = ['All', ...new Set(locations.map(loc => loc.state))];

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
    if (error) return <div className="alert alert-danger container mt-5">{error}</div>;

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4 fw-bold text-warning">Manage Locations (Admin)</h2>
            
            {/* --- FILTER SECTION --- */}
            <div className="row mb-4 p-3 bg-light rounded shadow-sm">
                <div className="col-md-5">
                    <label className="fw-bold mb-1">Filter by Category:</label>
                    <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        {uniqueCategories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                    </select>
                </div>
                <div className="col-md-5">
                    <label className="fw-bold mb-1">Filter by State:</label>
                    <select className="form-select" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                        {uniqueStates.map(st => (<option key={st} value={st}>{st}</option>))}
                    </select>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                    <button className="btn btn-secondary w-100" onClick={() => { setSelectedCategory('All'); setSelectedState('All'); }}>Reset</button>
                </div>
            </div>

            {/* --- LONG CARD VIEW --- */}
            <div className="row">
                {filteredLocations.length > 0 ? (
                    filteredLocations.map((loc) => (
                        <div className="col-12 my-3" key={loc.id}>
                            <div className="card shadow-sm border-0 d-flex flex-row overflow-hidden" style={{ height: '220px' }}>
                                {/* Image */}
                                <div style={{ width: '35%', minWidth: '200px' }}>
                                    <img src={loc.imageUrl} className="img-fluid h-100 w-100" alt={loc.title} style={{ objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/300x220?text=No+Image'; }} />
                                </div>
                                
                                {/* Body */}
                                <div className="card-body d-flex flex-column p-4" style={{ width: '65%' }}>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h4 className="card-title fw-bold mb-1">{loc.title}</h4>
                                            <span className="badge bg-secondary">{loc.category}</span>
                                        </div>
                                    </div>

                                    <p className="text-muted mt-3 mb-auto text-truncate" style={{ maxWidth: '90%' }}>
                                        <i className="fas fa-map-marker-alt me-2 text-danger"></i>
                                        {loc.city}, {loc.state}
                                    </p>
                                    
                                    {/* --- ADMIN BUTTONS --- */}
                                    <div className="mt-3 d-flex gap-2">
                                        <button className="btn btn-outline-primary rounded-pill px-4" onClick={() => handleViewClick(loc)}>
                                            View
                                        </button>
                                        <button className="btn btn-warning rounded-pill px-4" onClick={() => handleEditClick(loc)}>
                                            <i className="fas fa-edit me-1"></i> Edit
                                        </button>
                                        <button className="btn btn-danger rounded-pill px-4" onClick={() => handleDelete(loc.id)}>
                                            <i className="fas fa-trash me-1"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center text-muted mt-5"><h4>No locations found.</h4></div>
                )}
            </div>

            {/* --- VIEW MODAL --- */}
            {showViewModal && selectedLocation && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedLocation.title}</h5>
                                <button className="btn-close" onClick={handleCloseViewModal}></button>
                            </div>
                            <div className="modal-body">
                                <img src={selectedLocation.imageUrl} className="img-fluid mb-3 w-100 rounded" style={{maxHeight:'300px', objectFit:'cover'}} alt="view" />
                                <p><strong>Description:</strong> {selectedLocation.description}</p>
                                <p><strong>Address:</strong> {selectedLocation.address}, {selectedLocation.city}, {selectedLocation.state}</p>
                            </div>
                            <div className="modal-footer"><button className="btn btn-secondary" onClick={handleCloseViewModal}>Close</button></div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- EDIT MODAL --- */}
            {showEditModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <form onSubmit={handleEditSubmit}>
                                <div className="modal-header bg-warning text-white">
                                    <h5 className="modal-title">Edit Location</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row g-3">
                                        {/* Title */}
                                        <div className="col-md-12">
                                            <label className="form-label">Title</label>
                                            <input type="text" className="form-control" name="title" value={editFormData.title} onChange={handleInputChange} required />
                                        </div>
                                        {/* Category */}
                                        <div className="col-md-6">
                                            <label className="form-label">Category</label>
                                            <select className="form-select" name="category" value={editFormData.category} onChange={handleInputChange} required>
                                                <option value="BEACH">BEACH</option>
                                                <option value="FOREST">FOREST</option>
                                                <option value="MOUNTAIN">MOUNTAIN</option>
                                                <option value="WATERFALL">WATERFALL</option>
                                                <option value="HISTORICAL">HISTORICAL</option>
                                                <option value="HOLYPLACES">HOLYPLACES</option>
                                            </select>
                                        </div>
                                        {/* Image URL */}
                                        <div className="col-md-6">
                                            <label className="form-label">Image URL</label>
                                            <input type="text" className="form-control" name="imageUrl" value={editFormData.imageUrl} onChange={handleInputChange} />
                                        </div>
                                        {/* Description */}
                                        <div className="col-12">
                                            <label className="form-label">Description</label>
                                            <textarea className="form-control" name="description" rows="3" value={editFormData.description} onChange={handleInputChange} required></textarea>
                                        </div>
                                        {/* City & State */}
                                        <div className="col-md-6">
                                            <label className="form-label">City</label>
                                            <input type="text" className="form-control" name="city" value={editFormData.city} onChange={handleInputChange} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">State</label>
                                            <input type="text" className="form-control" name="state" value={editFormData.state} onChange={handleInputChange} required />
                                        </div>
                                        {/* Address */}
                                        <div className="col-12">
                                            <label className="form-label">Full Address</label>
                                            <input type="text" className="form-control" name="address" value={editFormData.address} onChange={handleInputChange} required />
                                        </div>
                                        {/* Coordinates */}
                                        <div className="col-md-6">
                                            <label className="form-label">Latitude</label>
                                            <input type="number" step="any" className="form-control" name="latitude" value={editFormData.latitude} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Longitude</label>
                                            <input type="number" step="any" className="form-control" name="longitude" value={editFormData.longitude} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocationsEdit;