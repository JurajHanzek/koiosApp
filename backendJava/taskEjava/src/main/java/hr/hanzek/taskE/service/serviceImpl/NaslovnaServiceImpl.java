package hr.hanzek.taskE.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hr.hanzek.taskE.beans.Naslovna;
import hr.hanzek.taskE.beans.Obavijesti;
import hr.hanzek.taskE.dao.NaslovnaDAO;
import hr.hanzek.taskE.service.NaslovnaService;

@Service
public class NaslovnaServiceImpl implements NaslovnaService{

	
	@Autowired
	NaslovnaDAO naslovnaDAO;

	@Override
	public List<Naslovna> dohvatiNaslovnu() {
		return naslovnaDAO.dohvatiNaslovnu();
	}

	@Override
	public List<Obavijesti> dohvatiObavijesti() {
		return naslovnaDAO.dohvatiObavijesti();
	}

	@Override
	public Obavijesti spremiObavijest(Obavijesti p) {
		return naslovnaDAO.spremiObavijest(p);
	}

	
}
