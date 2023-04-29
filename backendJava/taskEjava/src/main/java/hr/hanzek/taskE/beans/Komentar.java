package hr.hanzek.taskE.beans;

import lombok.Data;

@Data
public class Komentar {
		
		private Long id;
		private String komentar;
		private Long userId;
		private Long sourceId;
		private Boolean isMolba; 
		private String datum;
		private String user;
}
