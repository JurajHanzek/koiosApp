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

import hr.hanzek.taskE.beans.Komentar;
import hr.hanzek.taskE.beans.Molba;
import hr.hanzek.taskE.beans.User;
import hr.hanzek.taskE.service.MolbaService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/molba")
public class MolbeController {

	
	@Autowired
	MolbaService iMolbaService;

	@PostMapping("/spremi")
//	@PreAuthorize("hasRole('ROLE_USER') ")
	public ResponseEntity<Molba> spremiMolbu(@RequestBody Molba m) throws ServerException {
		Molba oba = iMolbaService.spremiMolbu(m);
		if (oba == null) {
			throw new ServerException("Neuspješno spremanje podataka.");
		} else {
			return new ResponseEntity<>(oba, HttpStatus.CREATED);
		}

	}
	
	@PostMapping("/update")
//	@PreAuthorize("hasRole('ROLE_USER') ")
	public ResponseEntity<Molba> updateMolba(@RequestBody Molba m) throws ServerException {
		Molba oba = iMolbaService.updateMolba(m);
		if (oba == null) {
			throw new ServerException("Neuspješno spremanje podataka.");
		} else {
			return new ResponseEntity<>(oba, HttpStatus.CREATED);
		}

	}
	
	
	@PostMapping("/spremi-komentar")
//	@PreAuthorize("hasRole('ROLE_USER') ")
	public ResponseEntity<Komentar> spremiKomentar(@RequestBody Komentar m) throws ServerException {
		Komentar oba = iMolbaService.spremiKomentar(m);
		if (oba == null) {
			throw new ServerException("Neuspješno spremanje podataka.");
		} else {
			return new ResponseEntity<>(oba, HttpStatus.CREATED);
		}
	}

	@GetMapping("/get")
	public ResponseEntity<List<Molba>> dohvatiMolbe() throws ServerException {
		List<Molba> nas = iMolbaService.dohvatiMolbe();
			return new ResponseEntity<>(nas, HttpStatus.OK);
	}
	
	@GetMapping("/get/{id}")
	public ResponseEntity<List<Molba>> dohvatiMolbeUsera( @PathVariable Long id) throws ServerException {
		List<Molba> nas = iMolbaService.dohvatiMolbeUsera(id);
			return new ResponseEntity<>(nas, HttpStatus.OK);
	}
	
//	/dohvaca molbu po njezinom idu
	@GetMapping("/get-id/{id}")
	public ResponseEntity<Molba> dohvatiMolbuPoId( @PathVariable Long id) throws ServerException {
		Molba nas = iMolbaService.dohvatiMolbuPoId(id);
			return new ResponseEntity<>(nas, HttpStatus.OK);
	}
//	dohvaca komentare za jednu molbu sourceId
	@GetMapping("/get-komentari/{id}")
	public ResponseEntity<List<Komentar>> dohvatiKomentareMolbe( @PathVariable Long id) throws ServerException {
		List<Komentar> nas = iMolbaService.dohvatiKomentareMolbe(id);
	
			return new ResponseEntity<>(nas, HttpStatus.OK);
	}
	
	@GetMapping("/get-user/{id}")
	public ResponseEntity<User> dohvatiUsera( @PathVariable Long id) throws ServerException {
		User nas = iMolbaService.dohvatiUsera(id);
			return new ResponseEntity<>(nas, HttpStatus.OK);
	}
}
