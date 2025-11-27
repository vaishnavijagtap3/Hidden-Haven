package com.hiddenplaces.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hiddenplaces.entity.Location;
import com.hiddenplaces.service.LocationService;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/location")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class LocationController {
	
	private final LocationService locationService;
	
	@GetMapping
	public ResponseEntity<?> getAllLocations(){
		System.out.println("in getalllocations controller");
		
		List<Location> locations = locationService.getAllLocations();
		if(locations.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}else {
			return ResponseEntity.ok(locations);
		}
		
	}
	
	
	
}
