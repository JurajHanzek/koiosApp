package hr.hanzek.taskE.dao;

import java.util.List;

import hr.hanzek.taskE.beans.Komentar;
import hr.hanzek.taskE.beans.Molba;
import hr.hanzek.taskE.beans.User;

public interface MolbaDAO {

	Molba spremiMolbu(Molba m);

	Komentar spremiKomentar(Komentar m);

	List<Molba> dohvatiMolbe();

	List<Molba> dohvatiMolbeUsera(Long id);

	Molba dohvatiMolbuPoId(Long id);

	List<Komentar> dohvatiKomentareMolbe(Long id);

	User dohvatiUsera(Long id);

	Molba updateMolba(Molba m);

}
