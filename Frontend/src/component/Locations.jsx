import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Locations = () => {
    // 1. State for storing locations (Mock data for now)
    const [locations, setLocations] = useState([]);
    
    // 2. State for the Modal (Selected Location)
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // 3. Load Mock Data on Component Mount
    useEffect(() => {
        // In the future, this will be: axios.get('http://localhost:8080/api/locations')
        const mockData = [
            {
                locationId: 1,
                title: "The Crystal Lagoon",
                image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                rating: 4.5,
                category: "Beach",
                description: "A hidden gem with crystal clear turquoise waters perfect for snorkeling. Located away from the main tourist hubs.",
                address: "North Shore, Island of Solitude, Pacific Ocean"
            },
            {
                locationId: 2,
                title: "Misty Pine Forest",
                image_url: "https://images.unsplash.com/photo-1448375240586-dfd8f3793371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                rating: 5.0,
                category: "Nature",
                description: "Ancient pine trees surrounded by a permanent low-hanging mist. A photographer's paradise.",
                address: "Highland Peak, Oregon, USA"
            },
            {
                locationId: 3,
                title: "Sunset Cliffside",
                image_url: "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                rating: 3.8,
                category: "Mountain",
                description: "The best place to watch the sun go down. Be careful of the steep hike up.",
                address: "West Coast Road, California, USA"
            }
        ];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocations(mockData);
    }, []);

    // 4. Handle Opening the Modal
    const handleViewClick = (location) => {
        setSelectedLocation(location);
        setShowModal(true);
    };

    // 5. Handle Closing the Modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedLocation(null);
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4 fw-bold text-primary">Explore Hidden Gems</h2>
            
            {/* GRID VIEW */}
            <div className="row">
                {locations.map((loc) => (
                    <div className="col-md-4 mb-4" key={loc.locationId}>
                        <div className="card h-100 shadow-sm border-0">
                            {/* Image */}
                            <img 
                                src={loc.image_url} 
                                className="card-img-top" 
                                alt={loc.title} 
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            
                            {/* Card Body */}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-bold">{loc.title}</h5>
                                
                                <div className="mb-2">
                                    {/* Simple Star Logic */}
                                    <span className="text-warning me-2">
                                        {'★'.repeat(Math.round(loc.rating))}
                                        {'☆'.repeat(5 - Math.round(loc.rating))}
                                    </span>
                                    <span className="text-muted small">({loc.rating}/5)</span>
                                </div>
                                
                                {/* Spacer to push button to bottom */}
                                <div className="mt-auto pt-3">
                                    <button 
                                        className="btn btn-outline-primary w-100 rounded-pill"
                                        onClick={() => handleViewClick(loc)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL (POPUP) FOR DETAILS */}
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
                                    {/* Left Side: Image */}
                                    <div className="col-md-6 mb-3">
                                        <img 
                                            src={selectedLocation.image_url} 
                                            className="img-fluid rounded shadow-sm" 
                                            alt={selectedLocation.title} 
                                            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    
                                    {/* Right Side: Info */}
                                    <div className="col-md-6">
                                        <h6 className="text-uppercase text-primary fw-bold mb-3">
                                            {selectedLocation.category}
                                        </h6>
                                        <p className="text-muted">
                                            <i className="fas fa-map-marker-alt me-2 text-danger"></i>
                                            {selectedLocation.address}
                                        </p>
                                        <p className="lead" style={{ fontSize: '1rem' }}>
                                            {selectedLocation.description}
                                        </p>
                                        
                                        <div className="alert alert-info mt-3 p-2">
                                            <strong>Rating: </strong> {selectedLocation.rating} / 5 Stars
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary">
                                    See Reviews
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Locations;