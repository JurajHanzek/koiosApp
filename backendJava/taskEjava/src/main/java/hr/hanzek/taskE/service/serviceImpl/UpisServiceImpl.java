package hr.hanzek.taskE.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hr.hanzek.taskE.beans.Predmet;
import hr.hanzek.taskE.beans.Upis;
import hr.hanzek.taskE.dao.UpisDAO;
import hr.hanzek.taskE.service.UpisService;

@Service
public class UpisServiceImpl implements UpisService{
	
	@Autowired
	UpisDAO iUpisDAO;

	@Override
	public List<Predmet> dohvatiMolbe() {
		return iUpisDAO.dohvatiMolbe();
	}

	@Override
	public List<Predmet> spremiUpis(List<Predmet> pred) {
		return iUpisDAO.spremiUpis(pred);
	}

	@Override
	public Upis dohvatiUpisPoId(Long id) {
		return iUpisDAO.dohvatiUpisPoId(id);
	}

}
