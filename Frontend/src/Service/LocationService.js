import axios from 'axios';

const API_URL = "http://localhost:8080/location";

class LocationService {
    
    // 1. GET ALL
    getAllLocations() {
        return axios.get(API_URL);
    }

    // 2. GET BY ID (Optional, helpful for view details)
    getLocationById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    // 3. UPDATE (PUT)
    updateLocation(id, locationData) {
        return axios.put(`${API_URL}/${id}`, locationData);
    }

    // 4. DELETE
    deleteLocation(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new LocationService();