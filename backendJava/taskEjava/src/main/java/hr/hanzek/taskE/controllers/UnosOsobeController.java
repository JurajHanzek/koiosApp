package hr.hanzek.taskE.controllers;

import java.rmi.ServerException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.hanzek.taskE.beans.Osoba;
import hr.hanzek.taskE.service.OsobaService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/unos")
public class UnosOsobeController {

	@Autowired
	OsobaService iOsobaService;

	@PostMapping("/spremi-osoba")
	@PreAuthorize("hasRole('ROLE_USER') ")
	public ResponseEntity<Osoba> addOsoba(@RequestBody Osoba newOsoba) throws ServerException {
		Osoba osoba = iOsobaService.addOsoba(newOsoba);
		if (osoba == null) {
			throw new ServerException("Neuspješno spremanje podataka.");
		} else {
			return new ResponseEntity<>(osoba, HttpStatus.CREATED);
		}

	}

	@PutMapping("/azuriraj-osoba")
	@PreAuthorize("hasRole('ROLE_USER') ")
	public ResponseEntity<Osoba> azurirajOsoba(@RequestBody Osoba newOsoba) throws ServerException {
		Osoba osoba = iOsobaService.azurirajOsoba(newOsoba);
		if (osoba == null) {
			throw new ServerException("Neuspješno azuriranje podataka.");
		} else {
			return new ResponseEntity<>(osoba, HttpStatus.CREATED);
		}

	}

}
