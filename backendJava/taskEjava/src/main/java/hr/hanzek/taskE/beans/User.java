package hr.hanzek.taskE.beans;


import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "users", 
    uniqueConstraints = { 
      @UniqueConstraint(columnNames = "username"),
      @UniqueConstraint(columnNames = "email") 
    })
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 120)
  private String password;

  @NotBlank
  @Size(max = 100)
  private String first_last_name;

  @NotBlank
  @Size(max = 100)
  private String smjer;

  private Boolean redovan;
  
  @NotBlank
  @Size(max = 100)
  private String jmbag;
  
  private String publicKey;

  public String getJmbag() {
	return jmbag;
}

public void setJmbag(String jmbag) {
	this.jmbag = jmbag;
}

public String getSmjer() {
	return smjer;
}

public void setSmjer(String smjer) {
	this.smjer = smjer;
}

public Boolean getRedovan() {
	return redovan;
}

public void setRedovan(Boolean redovan) {
	this.redovan = redovan;
}

public String getSemestar() {
	return semestar;
}

public void setSemestar(String semestar) {
	this.semestar = semestar;
}

@NotBlank
  @Size(max = 45)
  private String semestar;

  public String getFirst_last_name() {
	return first_last_name;
}

public void setFirst_last_name(String first_last_name) {
	this.first_last_name = first_last_name;
}

@ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(  name = "user_roles", 
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new HashSet<>();

  public User() {
  }

  public User(String username, String email, String password,String first_last_name,String smjer,Boolean redovan,String semestar, String jmbag, String publicKey) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.first_last_name = first_last_name;
    this.smjer = smjer;
	this.redovan = redovan;
	this.semestar = semestar;
	this.jmbag = jmbag;
	this.publicKey=publicKey;
  }

  public Long getId() {
    return id;
  }


public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }

public String getPublicKey() {
	return publicKey;
}

public void setPublicKey(String publicKey) {
	this.publicKey = publicKey;
}
}
