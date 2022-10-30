package hr.hanzek.taskE.beans;

import java.util.Date;

import lombok.Data;

@Data
public class Osoba {
	private Long id;
    
	private String ime;
	private String prezime;
	private String adresa;
	private String grad;
	private Date datumRodenja;
	private String email;
	
}
