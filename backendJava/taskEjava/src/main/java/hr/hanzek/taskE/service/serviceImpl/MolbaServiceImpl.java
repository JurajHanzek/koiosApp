package hr.hanzek.taskE.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hr.hanzek.taskE.beans.Komentar;
import hr.hanzek.taskE.beans.Molba;
import hr.hanzek.taskE.beans.User;
import hr.hanzek.taskE.dao.MolbaDAO;
import hr.hanzek.taskE.service.MolbaService;

@Service
public class MolbaServiceImpl implements MolbaService{

	@Autowired
	MolbaDAO iMolbaDAO;
	
	@Override
	public Molba spremiMolbu(Molba m) {
		return iMolbaDAO.spremiMolbu(m);
	}

	@Override
	public Komentar spremiKomentar(Komentar m) {
		return iMolbaDAO.spremiKomentar(m);
	}

	@Override
	public List<Molba> dohvatiMolbe() {
		return iMolbaDAO.dohvatiMolbe();
	}

	@Override
	public List<Molba> dohvatiMolbeUsera(Long id) {
		return iMolbaDAO.dohvatiMolbeUsera(id);
	}

	@Override
	public Molba dohvatiMolbuPoId(Long id) {
		return iMolbaDAO.dohvatiMolbuPoId(id);
	}

	@Override
	public List<Komentar> dohvatiKomentareMolbe(Long id) {
		return iMolbaDAO.dohvatiKomentareMolbe(id);
	}

	@Override
	public User dohvatiUsera(Long id) {
		return iMolbaDAO.dohvatiUsera(id);
	}

	@Override
	public Molba updateMolba(Molba m) {
		return iMolbaDAO.updateMolba(m);
	}

}
