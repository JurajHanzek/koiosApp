package hr.hanzek.taskE.beans;

import lombok.Data;

@Data
public class Predmet {
	
	private Long id;
	private String naziv;
	private String nositelj;
	private Long ects;
	private Long semestar;
	private Boolean obvezni;

}
