package hr.hanzek.taskE.controllers;

import java.rmi.ServerException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.hanzek.taskE.beans.Kljucevi;
import hr.hanzek.taskE.beans.Molba;
import hr.hanzek.taskE.beans.Potpis;
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
	@GetMapping("/get")
	public ResponseEntity<List<Upis>> dohvatiUpise() throws ServerException {
		List<Upis> nas = iUpisService.dohvatiUpise();
			return new ResponseEntity<>(nas, HttpStatus.OK);
	}
	
	@GetMapping("/predmeti/user/{id}")
	public ResponseEntity<List<Predmet>> dohvatiPredmetePoUserId(@PathVariable Long id) throws ServerException {
		List<Predmet> nas = iUpisService.dohvatiPredmetePoUserId(id);
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
	
	@PostMapping("/update")
//	@PreAuthorize("hasRole('ROLE_USER') ")
	public ResponseEntity<Upis> updateUpis(@RequestBody Upis m) throws ServerException {
		Upis oba = iUpisService.updateUpis(m);
		if (oba == null) {
			throw new ServerException("Neuspješno spremanje podataka.");
		} else {
			return new ResponseEntity<>(oba, HttpStatus.CREATED);
		}

	}
	
	@GetMapping("/kljuc/{id}")
	public ResponseEntity<Kljucevi> generirajKljuceve(@PathVariable Long id) throws ServerException {
		Kljucevi up = iUpisService.generirajKljuceve(id);
		
		if (up.equals(null)) {
			throw new ServerException("Neuspješno dohvaćanje osobe po id:");
		} else {
			return new ResponseEntity<>(up, HttpStatus.OK);
		}
	}
	
	@PostMapping("/potpisi")
//	@PreAuthorize("hasRole('ROLE_USER') ")
	public ResponseEntity<Potpis> potpisi(@RequestBody Potpis pred) throws ServerException {
		iUpisService.potpisi(pred);
		if (pred == null) {
			throw new ServerException("Neuspješno spremanje podataka.");
		} else {
			return new ResponseEntity<>(pred, HttpStatus.CREATED);
		}

	}
	
	@PostMapping("/validiraj")
//	@PreAuthorize("hasRole('ROLE_USER') ")
	public ResponseEntity<Upis> potpisi(@RequestBody Upis upis) throws ServerException {
		Upis up = iUpisService.validiraj(upis);
		if (up == null) {
			throw new ServerException("Neuspješno spremanje podataka.");
		} else {
			return new ResponseEntity<>(up, HttpStatus.CREATED);
		}

	}
	
}
