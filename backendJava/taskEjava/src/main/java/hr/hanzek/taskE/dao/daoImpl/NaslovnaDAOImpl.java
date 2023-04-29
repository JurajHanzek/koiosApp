package hr.hanzek.taskE.dao.daoImpl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import hr.hanzek.taskE.beans.Naslovna;
import hr.hanzek.taskE.beans.Obavijesti;
import hr.hanzek.taskE.dao.NaslovnaDAO;

@Repository
public class NaslovnaDAOImpl implements NaslovnaDAO{

	private final static Logger LOGGER = Logger.getLogger(OsobaDaoImpl.class.getName());

	@Autowired
	public JdbcTemplate iJdbcTemplate;

	@Override
	@Transactional
	public List<Naslovna> dohvatiNaslovnu() {
			String sql = "SELECT * FROM naslovna";
			return iJdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Naslovna.class));

	}

	@Override
	public List<Obavijesti> dohvatiObavijesti() {
		String sql = "SELECT * FROM obavijesti_referade ORDER BY id DESC";
		return iJdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Obavijesti.class));
	}

	@Override
	@Transactional
	public Obavijesti spremiObavijest(Obavijesti p) {
		LocalDate now = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        String formattedDate = now.format(formatter);
		String sql3 = "INSERT INTO obavijesti_referade(naslov,opis,prioritet,timestamp,userId) VALUES(?,?,?,?,?)";
		iJdbcTemplate.update(sql3, p.getNaslov(), p.getOpis(), p.getPrioritet(), formattedDate.toString(),
				2);
		return p;
	}

	
}
