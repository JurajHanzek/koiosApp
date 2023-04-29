package hr.hanzek.taskE.beans;

import lombok.Data;

@Data
public class Obavijesti {
	
	private Long id;
	private String naslov;
	private String opis;
	private String timestamp;
	private Long userId;
	private Long prioritet; //1-3, 1 najvaznije
}
