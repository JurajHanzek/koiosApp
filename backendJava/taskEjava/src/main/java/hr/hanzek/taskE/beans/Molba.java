package hr.hanzek.taskE.beans;

import lombok.Data;

@Data
public class Molba {
	
		private Long id;
		private String tip;
		private String objasnjenje;
		private String status;
		private Long userId;
		private String datum;
		private String user;
}
