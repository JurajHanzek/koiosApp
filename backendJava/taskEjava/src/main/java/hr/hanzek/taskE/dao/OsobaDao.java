package hr.hanzek.taskE.dao;

import java.util.List;

import hr.hanzek.taskE.beans.Osoba;

public interface OsobaDao {

	Osoba saveOsoba(Osoba newOsoba);
	
	Osoba azurirajOsoba(Osoba newOsoba);
	
	List<Osoba> dohvatiOsobe();
	
	Osoba dohvatiOsobuPoId(Long id);
	
	void izbrisiOsoba(Long id);
}
