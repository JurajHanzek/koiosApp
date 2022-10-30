package hr.hanzek.taskE.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hr.hanzek.taskE.beans.Osoba;
import hr.hanzek.taskE.dao.OsobaDao;
import hr.hanzek.taskE.service.OsobaService;

@Service
public class OsobaServiceImpl implements OsobaService {
	
	@Autowired
	OsobaDao iOsobaDao;
	
	@Override
	public Osoba addOsoba(Osoba newOsoba) {
		
		return iOsobaDao.saveOsoba(newOsoba);
	}
	
	@Override
	public Osoba azurirajOsoba(Osoba newOsoba) {
		
		return iOsobaDao.azurirajOsoba(newOsoba);
	}

	@Override
	public List<Osoba> dohvatiOsobe() {
		return iOsobaDao.dohvatiOsobe();
	}

	@Override
	public Osoba dohvatiOsobuPoId(Long id) {
		return iOsobaDao.dohvatiOsobuPoId(id);
	}

	@Override
	public void izbrisiOsoba(Long id) {
		 iOsobaDao.izbrisiOsoba(id);
	}
	

}
