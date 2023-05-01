package hr.hanzek.taskE.beans;

import lombok.Data;

@Data
public class Potpis {
	
	private Upis upis;
	private Komentar[] komentar;
	private String privateKey;

}
