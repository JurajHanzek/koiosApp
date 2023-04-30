package hr.hanzek.taskE.service;

import java.util.List;

import hr.hanzek.taskE.beans.Predmet;
import hr.hanzek.taskE.beans.Upis;

public interface UpisService {

	List<Predmet> dohvatiMolbe();

	List<Predmet> spremiUpis(List<Predmet> pred);

	Upis dohvatiUpisPoId(Long id);

	List<Predmet> dohvatiPredmetePoUserId(Long id);

	List<Upis> dohvatiUpise();

}
