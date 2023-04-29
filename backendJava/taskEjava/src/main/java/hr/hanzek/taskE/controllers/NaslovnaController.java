package hr.hanzek.taskE.controllers;

import java.rmi.ServerException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.hanzek.taskE.beans.Naslovna;
import hr.hanzek.taskE.service.NaslovnaService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/naslovna")
public class NaslovnaController {

	@Autowired
	NaslovnaService iNaslovnaService;

	@GetMapping("/get")
	public ResponseEntity<List<Naslovna>> dohvatiNaslovnu() throws ServerException {
		List<Naslovna> nas = iNaslovnaService.dohvatiNaslovnu();
			return new ResponseEntity<>(nas, HttpStatus.OK);
	}
	
}
