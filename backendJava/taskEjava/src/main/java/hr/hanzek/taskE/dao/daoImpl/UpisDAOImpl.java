package hr.hanzek.taskE.dao.daoImpl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import hr.hanzek.taskE.beans.Predmet;
import hr.hanzek.taskE.beans.Upis;
import hr.hanzek.taskE.beans.User;
import hr.hanzek.taskE.dao.UpisDAO;

@Repository	
public class UpisDAOImpl implements UpisDAO{
	
	private final static Logger LOGGER = Logger.getLogger(OsobaDaoImpl.class.getName());

	@Autowired
	public JdbcTemplate iJdbcTemplate;


	@Override
	public List<Predmet> dohvatiMolbe() {
		String sql = "SELECT * FROM predmet";
		return iJdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Predmet.class));
	
	}


	@Override
	public List<Predmet> spremiUpis(List<Predmet> pred) {
		LocalDate now = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        String formattedDate = now.format(formatter);
        for(Predmet p : pred) {
    		String sql3 = "INSERT INTO predmet_student(idStudent,idPredmet) VALUES(?,?)";
    		iJdbcTemplate.update(sql3,2,p.getId()); 
        }
        
		String sql3 = "INSERT INTO upis(userId,semestar,status,datum) VALUES(?,?,?,?)";
		iJdbcTemplate.update(sql3, 2, 5,"PREDAN_ZAHTJEV",formattedDate.toString());
		return pred;
	}


	@Override
	public Upis dohvatiUpisPoId(Long id) {
		Upis temp = new Upis();
		String sql = "SELECT * FROM upis WHERE userId = ? ORDER BY id DESC LIMIT 1";
		
		temp =iJdbcTemplate.queryForObject(sql, BeanPropertyRowMapper.newInstance(Upis.class),id);
		User asd = new User();
		
		String sql2 = "SELECT first_last_name FROM users WHERE id = ? ORDER BY id DESC LIMIT 1";
		asd =iJdbcTemplate.queryForObject(sql2, BeanPropertyRowMapper.newInstance(User.class),id);
		
		temp.setUser(asd.getFirst_last_name());
		return temp;
	}

}
