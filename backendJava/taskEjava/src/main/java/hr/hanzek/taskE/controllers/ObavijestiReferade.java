package hr.hanzek.taskE.controllers;

import java.rmi.ServerException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.hanzek.taskE.beans.Obavijesti;
import hr.hanzek.taskE.service.NaslovnaService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/obavijesti")
public class ObavijestiReferade {


	@Autowired
	NaslovnaService iNaslovnaService;

	@GetMapping("/get")
	public ResponseEntity<List<Obavijesti>> dohvatiObavijesti() throws ServerException {
		List<Obavijesti> obavijesti = iNaslovnaService.dohvatiObavijesti();
			return new ResponseEntity<>(obavijesti, HttpStatus.OK);
	}
	
	@PostMapping("/spremi")
//	@PreAuthorize("hasRole('REFERADA') ")
	public ResponseEntity<Obavijesti> spremiObavijest(@RequestBody Obavijesti p) throws ServerException {
		Obavijesti oba = iNaslovnaService.spremiObavijest(p);
		if (oba == null) {
			throw new ServerException("Neuspješno spremanje podataka.");
		} else {
			return new ResponseEntity<>(oba, HttpStatus.CREATED);
		}
	}
}
