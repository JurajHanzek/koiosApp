package hr.hanzek.taskE.service;

import java.util.List;

import hr.hanzek.taskE.beans.Osoba;

public interface OsobaService {

	Osoba addOsoba(Osoba newOsoba);
	
	Osoba azurirajOsoba(Osoba newOsoba);
	
	List<Osoba> dohvatiOsobe();
	
	Osoba dohvatiOsobuPoId(Long id);
	
	void izbrisiOsoba(Long id);
}
