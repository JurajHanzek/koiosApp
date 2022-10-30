package hr.hanzek.taskE.dao.daoImpl;

import java.util.List;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import hr.hanzek.taskE.beans.Osoba;
import hr.hanzek.taskE.dao.OsobaDao;

@Component
public class OsobaDaoImpl implements OsobaDao {
	private final static Logger LOGGER = Logger.getLogger(OsobaDaoImpl.class.getName());

	@Autowired
	public JdbcTemplate iJdbcTemplate;

	@Override
	@Transactional
	public Osoba saveOsoba(Osoba newOsoba) {
		String sql3 = "INSERT INTO osoba(ime, prezime,adresa,grad,datumRodenja,email) VALUES(?,?,?,?,?,?)";
		iJdbcTemplate.update(sql3, newOsoba.getIme(), newOsoba.getPrezime(), newOsoba.getAdresa(), newOsoba.getGrad(),
				newOsoba.getDatumRodenja(), newOsoba.getEmail());
		return newOsoba;
	}

	@Override
	@Transactional
	public Osoba azurirajOsoba(Osoba newOsoba) {
		String sql3 = "UPDATE osoba set ime= ?, prezime= ?, adresa= ?, grad= ?, datumRodenja= ?, email=? where id = ?";
		iJdbcTemplate.update(sql3, newOsoba.getIme(), newOsoba.getPrezime(), newOsoba.getAdresa(), newOsoba.getGrad(),
				newOsoba.getDatumRodenja(), newOsoba.getEmail(), newOsoba.getId());
		return newOsoba;
	}

	@Override
	public List<Osoba> dohvatiOsobe() {
		String sql = "SELECT * FROM osoba";
		return iJdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Osoba.class));
	}

	@Override
	public Osoba dohvatiOsobuPoId(Long id) {
		String sql = "SELECT * FROM osoba WHERE id = ?";
		try {
			return (Osoba) iJdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper(Osoba.class), id);
		} catch (EmptyResultDataAccessException e) {
			LOGGER.log(Level.INFO, "Following query execution failed: ");
			return null;
		}
	}

	@Override
	public void izbrisiOsoba(Long id) {
		String sql = "DELETE FROM osoba WHERE id = ?";
		 iJdbcTemplate.update(sql, id.intValue());
	}

}
