package hr.hanzek.taskE.dao;

import java.util.List;

import hr.hanzek.taskE.beans.Predmet;
import hr.hanzek.taskE.beans.Upis;

public interface UpisDAO {

	List<Predmet> dohvatiMolbe();

	List<Predmet> spremiUpis(List<Predmet> pred);

	Upis dohvatiUpisPoId(Long id);

	List<Predmet> dohvatiPredmetePoUserId(Long id);

	List<Upis> dohvatiUpise();

}
