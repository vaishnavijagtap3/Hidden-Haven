import React, { useState, useEffect } from 'react';
import LocationService from '../service/LocationService';
import 'bootstrap/dist/css/bootstrap.min.css';

const Locations = () => {
    // --- STATE ---
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter States
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedState, setSelectedState] = useState('All');
    
    // Modal States
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // --- FETCH DATA ---
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await LocationService.getAllLocations();
                setLocations(response.data);
                setFilteredLocations(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching locations:", err);
                setError("Could not load locations. Is backend running?");
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    // --- FILTER LOGIC ---
    useEffect(() => {
        let result = locations;
        if (selectedCategory !== 'All') {
            result = result.filter(loc => loc.category === selectedCategory);
        }
        if (selectedState !== 'All') {
            result = result.filter(loc => loc.state === selectedState);
        }
        setFilteredLocations(result);
    }, [selectedCategory, selectedState, locations]);

    // --- HELPER: Get Unique Values for Dropdowns ---
    const uniqueCategories = ['All', ...new Set(locations.map(loc => loc.category))];
    const uniqueStates = ['All', ...new Set(locations.map(loc => loc.state))];


    // --- MODAL HANDLERS ---
    const handleViewClick = (location) => {
        setSelectedLocation(location);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedLocation(null);
    };

    const renderStars = (rating) => {
        const safeRating = rating || 0; 
        const rounded = Math.round(safeRating);
        return (
            <span className="text-warning me-2">
                {'★'.repeat(rounded)}
                {'☆'.repeat(5 - rounded)}
            </span>
        );
    };

    // --- RENDER ---
    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
    if (error) return <div className="alert alert-danger container mt-5">{error}</div>;

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4 fw-bold text-primary">Explore Hidden Gems</h2>
            
            {/* --- FILTER SECTION --- */}
            <div className="row mb-4 p-3 bg-light rounded shadow-sm">
                {/* ... filters remain the same ... */}
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
                        // Changed col-md-4 to col-12 for full width
                        <div className="col-12 my-3" key={loc.id}>
                            {/* Added d-flex flex-row to make card horizontal */}
                            <div className="card shadow-sm border-0 d-flex flex-row overflow-hidden" style={{ height: '220px' }}>
                                
                                {/* Image container with fixed width */}
                                <div style={{ width: '35%', minWidth: '200px' }}>
                                    <img 
                                        src={loc.imageUrl} 
                                        className="img-fluid h-100 w-100" 
                                        alt={loc.title} 
                                        style={{ objectFit: 'cover' }}
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x220?text=No+Image'; }}
                                    />
                                </div>
                                
                                {/* Card Body */}
                                <div className="card-body d-flex flex-column p-4" style={{ width: '65%' }}>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h4 className="card-title fw-bold mb-1">{loc.title}</h4>
                                            <span className="badge bg-secondary">{loc.category}</span>
                                        </div>
                                        <div className="text-end">
                                            <div className="mb-1">{renderStars(loc.averageRating)}</div>
                                            <small className="text-muted">({loc.averageRating ? loc.averageRating : 0}/5)</small>
                                        </div>
                                    </div>

                                    <p className="text-muted mt-3 mb-auto text-truncate" style={{ maxWidth: '90%' }}>
                                        <i className="fas fa-map-marker-alt me-2 text-danger"></i>
                                        {loc.city}, {loc.state}
                                    </p>
                                    
                                    <div className="mt-3">
                                        <button 
                                            className="btn btn-primary px-4 rounded-pill"
                                            onClick={() => handleViewClick(loc)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center text-muted mt-5">
                        <h4>No locations found matching your filters.</h4>
                    </div>
                )}
            </div>

            {/* --- MODAL (Unchanged) --- */}
            {showModal && selectedLocation && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title fw-bold">{selectedLocation.title}</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <img src={selectedLocation.imageUrl} className="img-fluid rounded shadow-sm" alt={selectedLocation.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }} />
                                    </div>
                                    <div className="col-md-6">
                                        <span className="badge bg-secondary mb-3">{selectedLocation.category}</span>
                                        <h6 className="fw-bold mt-2">Description</h6>
                                        <p className="text-muted">{selectedLocation.description}</p>
                                        <h6 className="fw-bold">Address</h6>
                                        <p className="text-muted mb-2"><i className="fas fa-map-marker-alt me-2 text-danger"></i>{selectedLocation.address}, {selectedLocation.city}, {selectedLocation.state}</p>
                                        <div className="bg-light p-2 rounded border mb-3"><small className="d-block"><strong>Latitude:</strong> {selectedLocation.latitude}</small><small className="d-block"><strong>Longitude:</strong> {selectedLocation.longitude}</small></div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                <button type="button" className="btn btn-primary">See Reviews</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Locations;