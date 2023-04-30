package hr.hanzek.taskE.controllers;

import java.rmi.ServerException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.hanzek.taskE.beans.Osoba;
import hr.hanzek.taskE.beans.Predmet;
import hr.hanzek.taskE.beans.Upis;
import hr.hanzek.taskE.service.UpisService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/upis")
public class UpisController {
	
	@Autowired
	UpisService iUpisService;
	
	@GetMapping("/predmeti")
	public ResponseEntity<List<Predmet>> dohvatiMolbe() throws ServerException {
		List<Predmet> nas = iUpisService.dohvatiMolbe();
			return new ResponseEntity<>(nas, HttpStatus.OK);
	}
	


	@PostMapping("/spremi")
//	@PreAuthorize("hasRole('ROLE_USER') ")
	public ResponseEntity<List<Predmet>> spremiUpis(@RequestBody List<Predmet> pred) throws ServerException {
		List<Predmet> nas = iUpisService.spremiUpis(pred);
		if (nas == null) {
			throw new ServerException("Neuspješno spremanje podataka.");
		} else {
			return new ResponseEntity<>(pred, HttpStatus.CREATED);
		}

	}
	@GetMapping("/student/{id}")
	public ResponseEntity<Upis> dohvatiUpis( @PathVariable Long id) throws ServerException {
		Upis up = iUpisService.dohvatiUpisPoId(id);
		if (up.equals(null)) {
			throw new ServerException("Neuspješno dohvaćanje osobe po id:"+id);
		} else {
			return new ResponseEntity<>(up, HttpStatus.OK);
		}

	}
}
