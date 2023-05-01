package hr.hanzek.taskE.dao.daoImpl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import hr.hanzek.taskE.beans.Komentar;
import hr.hanzek.taskE.beans.Molba;
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
		
//		String sql = "SELECT * FROM upis WHERE userId = ? ORDER BY id DESC LIMIT 1";
//		temp =iJdbcTemplate.queryForObject(sql, BeanPropertyRowMapper.newInstance(Upis.class),id);
//		
		try {
		    String sql = "SELECT * FROM upis WHERE userId = ? ORDER BY id DESC LIMIT 1";
		    temp = iJdbcTemplate.queryForObject(sql, BeanPropertyRowMapper.newInstance(Upis.class), id);
		} catch (EmptyResultDataAccessException ex) {
		    // The first query failed. Log the error or do some other action here.
//		    System.out.println("The first query failed: " + ex.getMessage());

		    try {
		        String sql = "SELECT * FROM upis WHERE id = ? ORDER BY id DESC LIMIT 1";
		        temp = iJdbcTemplate.queryForObject(sql, BeanPropertyRowMapper.newInstance(Upis.class), id);
		    } catch (EmptyResultDataAccessException ex2) {
		        // The second query also failed. Log the error or do some other action here.
//		        System.out.println("Both queries failed: " + ex2.getMessage());
		    }
		}
		
		
		User asd = new User();
		
		String sql2 = "SELECT first_last_name FROM users WHERE id = ? ORDER BY id DESC LIMIT 1";
		asd =iJdbcTemplate.queryForObject(sql2, BeanPropertyRowMapper.newInstance(User.class),temp.getUserId());
		
		temp.setUser(asd.getFirst_last_name());
		return temp;
	}


	@Override
	public List<Predmet> dohvatiPredmetePoUserId(Long id) {
		String sql = "SELECT DISTINCT * FROM predmet inner join predmet_student ps on ps.idPredmet = predmet.id where ps.idStudent = ?";
		return iJdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Predmet.class),id);
	}


	@Override
	public List<Upis> dohvatiUpise() {
		String sql = "SELECT  * FROM upis";
		 List<Upis> temp = new ArrayList<>();
		 List<Upis> temp2 = new ArrayList<>();
			
		 temp= iJdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Upis.class));
			for (Upis x : temp) 
			{ 
				User as=(iJdbcTemplate.queryForObject("SELECT first_last_name FROM users WHERE id = ? ",
						BeanPropertyRowMapper.newInstance(User.class),x.getUserId()));
				x.setUser(as.getFirst_last_name());
				temp2.add(x);
			}
		 return temp2;
	}


	@Override
	public Upis updateUpis(Upis m) {
		String sql3 = "UPDATE upis set status=? where id = ?";
		 iJdbcTemplate.update(sql3,m.getStatus(), m.getId());
		return m;
	}


	@Override
	public void updatePublicKey(String encodeToString,Long id) {
		String sql3 = "UPDATE users set public_key=? where id = ?";
		 iJdbcTemplate.update(sql3,encodeToString, id);
		
	}


	@Override
	public void setSignature(String signatureString, Long id) {
		String sql3 = "UPDATE upis set potpis=? where id = ?";
		 iJdbcTemplate.update(sql3,signatureString, id);
		
	}


	@Override
	public User getUser(Long userId) {
		String sql = "SELECT * FROM users WHERE id=?";
		return (User) iJdbcTemplate.queryForObject(sql, BeanPropertyRowMapper.newInstance(User.class),userId);

	}

}