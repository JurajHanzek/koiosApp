package hr.hanzek.taskE.dao;

import java.util.List;

import hr.hanzek.taskE.beans.Predmet;
import hr.hanzek.taskE.beans.Upis;
import hr.hanzek.taskE.beans.User;

public interface UpisDAO {

	List<Predmet> dohvatiMolbe();

	List<Predmet> spremiUpis(List<Predmet> pred);

	Upis dohvatiUpisPoId(Long id);

	List<Predmet> dohvatiPredmetePoUserId(Long id);

	List<Upis> dohvatiUpise();

	Upis updateUpis(Upis m);

	void updatePublicKey(String encodeToString, Long id);

	void setSignature(String signatureString, Long id);

	User getUser(Long userId);

}
