package hr.hanzek.taskE.dao;

import java.util.List;

import hr.hanzek.taskE.beans.Naslovna;
import hr.hanzek.taskE.beans.Obavijesti;

public interface NaslovnaDAO {

	List<Naslovna> dohvatiNaslovnu();

	List<Obavijesti> dohvatiObavijesti();

	Obavijesti spremiObavijest(Obavijesti p);
}
