package hr.hanzek.taskE;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan("com")
@SpringBootApplication
public class TaskEApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskEApplication.class, args);
	}

}
