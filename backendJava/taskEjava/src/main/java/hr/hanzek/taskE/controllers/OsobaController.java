package hr.hanzek.taskE.controllers;

import java.rmi.ServerException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.hanzek.taskE.beans.Osoba;
import hr.hanzek.taskE.service.OsobaService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/osobe")
public class OsobaController {

	@Autowired
	OsobaService iOsobaService;

	@GetMapping("/dohvati")
	public ResponseEntity<List<Osoba>> dohvatiOsobe() throws ServerException {
		List<Osoba> osobe = iOsobaService.dohvatiOsobe();
			return new ResponseEntity<>(osobe, HttpStatus.OK);

	}
	
	@GetMapping("/dohvati/osobu/{id}")
	public ResponseEntity<Osoba> dohvatiOsobuPoId( @PathVariable Long id) throws ServerException {
		Osoba osoba = iOsobaService.dohvatiOsobuPoId(id);
		if (osoba.equals(null)) {
			throw new ServerException("Neuspješno dohvaćanje osobe po id:"+id);
		} else {
			return new ResponseEntity<>(osoba, HttpStatus.OK);
		}

	}
	
	@DeleteMapping("/izbrisi-osoba/{id}")
	public ResponseEntity<String> izbrisiOsoba(@PathVariable Long id) throws ServerException {
		iOsobaService.izbrisiOsoba(id);
		return new ResponseEntity<>("izbrisano", HttpStatus.OK);

	}
	
}
