package hr.hanzek.taskE.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hr.hanzek.taskE.beans.Osoba;

@CrossOrigin(origins = "*")
@RestController
public class UnosOsobeController {
	
	@CrossOrigin(origins = "*")
	@PostMapping("/spremi-osoba/{autorId}")
	void addUser(@RequestBody Osoba osoba, @PathVariable final Long autorId) {
		
		System.out.println(osoba+autorId.toString());
	}

}
