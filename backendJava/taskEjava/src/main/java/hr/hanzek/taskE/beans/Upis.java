package hr.hanzek.taskE.beans;

import java.io.Serializable;

import lombok.Data;

@Data
public class Upis implements Serializable{
	
	private Long id;
	private Long userId;
	private Long semestar;
	private String status;
	private String datum;
	private String user;
	private String potpis;
}
