package hr.hanzek.taskE.security.payload.response;

import java.util.List;

public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private Long id;
  private String username;
  private String email;
  private String name;
  private List<String> roles;
  private String smjer;
  private String semestar;
  private Boolean redovan;
  private String jmbag;
  private String publicKey;
  public JwtResponse(String accessToken, Long id, String username, String email,String name, List<String> roles,String smjer,Boolean redovan,String semestar, String jmbag, String publicKey) {
    this.token = accessToken;
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
    this.name = name;
    this.smjer = smjer;
    this.semestar = semestar;
    this.redovan = redovan;
    this.jmbag=jmbag;
    this.publicKey=publicKey;
  }
  
  

  public String getSmjer() {
	return smjer;
}


public void setSmjer(String smjer) {
	this.smjer = smjer;
}


public String getAccessToken() {
    return token;
  }

  public String getSemestar() {
	return semestar;
}

public void setSemestar(String semestar) {
	this.semestar = semestar;
}

public Boolean getRedovan() {
	return redovan;
}

public void setRedovan(Boolean redovan) {
	this.redovan = redovan;
}

public void setRoles(List<String> roles) {
	this.roles = roles;
}

public void setAccessToken(String accessToken) {
    this.token = accessToken;
  }

  public String getTokenType() {
    return type;
  }

  public void setTokenType(String tokenType) {
    this.type = tokenType;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public List<String> getRoles() {
    return roles;
  }

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}



public String getJmbag() {
	return jmbag;
}



public void setJmbag(String jmbag) {
	this.jmbag = jmbag;
}



public String getPublicKey() {
	return publicKey;
}



public void setPublicKey(String publicKey) {
	this.publicKey = publicKey;
}
}
