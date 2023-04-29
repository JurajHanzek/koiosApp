package hr.hanzek.taskE.service;

import java.util.List;

import hr.hanzek.taskE.beans.Naslovna;
import hr.hanzek.taskE.beans.Obavijesti;

public interface NaslovnaService {

	List<Naslovna> dohvatiNaslovnu();

	List<Obavijesti> dohvatiObavijesti();

	Obavijesti spremiObavijest(Obavijesti p);
}
