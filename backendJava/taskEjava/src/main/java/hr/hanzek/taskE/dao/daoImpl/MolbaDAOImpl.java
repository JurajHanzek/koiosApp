package hr.hanzek.taskE.dao.daoImpl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import hr.hanzek.taskE.beans.Komentar;
import hr.hanzek.taskE.beans.Molba;
import hr.hanzek.taskE.beans.User;
import hr.hanzek.taskE.dao.MolbaDAO;

@Repository
public class MolbaDAOImpl implements MolbaDAO{
	private final static Logger LOGGER = Logger.getLogger(OsobaDaoImpl.class.getName());

	@Autowired
	public JdbcTemplate iJdbcTemplate;

	@Override
	public Molba spremiMolbu(Molba m) {
		LocalDate now = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        String formattedDate = now.format(formatter);
        m.setStatus("ZAHTJEV POSLAN");
		String sql3 = "INSERT INTO molba(tip,objasnjenje,status,datum,userId) VALUES(?,?,?,?,?)";
		iJdbcTemplate.update(sql3, m.getTip(), m.getObjasnjenje(), m.getStatus(), formattedDate.toString(),
				m.getUserId());
		
		String sql = "SELECT * FROM molba ORDER BY id DESC LIMIT 1";
		return (Molba) iJdbcTemplate.queryForObject(sql, BeanPropertyRowMapper.newInstance(Molba.class));
	}

	@Override
	public Komentar spremiKomentar(Komentar m) {
		LocalDate now = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        String formattedDate = now.format(formatter);
        
		String sql3 = "INSERT INTO komentar(komentar,userId,sourceId,isMolba,datum) VALUES(?,?,?,?,?)";
		iJdbcTemplate.update(sql3, m.getKomentar(), m.getUserId(), m.getSourceId(),m.getIsMolba(), formattedDate.toString()
				);
		return m;
	}

	@Override
	public List<Molba> dohvatiMolbe() {
		String sql = "SELECT * FROM molba";
		return iJdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Molba.class));

	}

	@Override
	public List<Molba> dohvatiMolbeUsera(Long id) {
		String sql = "SELECT * FROM molba WHERE userId = ?";
		 List<Molba> temp = new ArrayList<>();
		 List<Molba> temp2 = new ArrayList<>();
		
		 temp= iJdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Molba.class),id);
		 
			for (Molba x : temp) 
			{ 
				User as=(iJdbcTemplate.queryForObject("SELECT first_last_name FROM users WHERE id = ?",
						BeanPropertyRowMapper.newInstance(User.class),x.getUserId()));
				x.setUser(as.getFirst_last_name());
				temp2.add(x);
			}
		return temp2;
	}

	@Override
	public Molba dohvatiMolbuPoId(Long id) {
		String sql = "SELECT * FROM molba WHERE id=?";
		return (Molba) iJdbcTemplate.queryForObject(sql, BeanPropertyRowMapper.newInstance(Molba.class),id);

	}

	@Override
	public List<Komentar> dohvatiKomentareMolbe(Long id) {
		String sql = "SELECT * FROM komentar WHERE sourceId = ? ORDER BY id DESC";
		 List<Komentar> temp = new ArrayList<>();
		 List<Komentar> temp2 = new ArrayList<>();
		
		 temp= iJdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Komentar.class),id);
			for (Komentar x : temp) 
			{ 
				User as=(iJdbcTemplate.queryForObject("SELECT first_last_name FROM users WHERE id = ? ",
						BeanPropertyRowMapper.newInstance(User.class),x.getUserId()));
				x.setUser(as.getFirst_last_name());
				temp2.add(x);
			}
		 return temp2;
	}

	@Override
	public User dohvatiUsera(Long id) {
		String sql = "SELECT id,first_last_name FROM users WHERE id = ?";
		return iJdbcTemplate.queryForObject(sql, BeanPropertyRowMapper.newInstance(User.class),id);
	}

	@Override
	public Molba updateMolba(Molba m) {
		String sql3 = "UPDATE molba set status=? where id = ?";
		 iJdbcTemplate.update(sql3,m.getStatus(), m.getId());
		return m;
	}
	


	
}
