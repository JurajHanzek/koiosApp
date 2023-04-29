package hr.hanzek.taskE.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import hr.hanzek.taskE.beans.User;

public class UserDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;

  private Long id;

  private String username;
  private String name;

  private String email;
  private String smjer;
  private String semestar;
  private Boolean redovan;
  private String jmbag;

  @JsonIgnore
  private String password;

  private Collection<? extends GrantedAuthority> authorities;

  public UserDetailsImpl(Long id, String username, String email, String password,String name,String smjer,String semestar,Boolean redovan,
      Collection<? extends GrantedAuthority> authorities, String jmbag) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
    this.name=name;
    this.smjer = smjer;
    this.redovan= redovan;
    this.semestar = semestar;
    this.jmbag=jmbag;
  }

  public static UserDetailsImpl build(User user) {
    List<GrantedAuthority> authorities = user.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
        .collect(Collectors.toList());

    return new UserDetailsImpl(
        user.getId(), 
        user.getUsername(), 
        user.getEmail(),
        user.getPassword(), 
        user.getFirst_last_name(),
        user.getSmjer(),
        user.getSemestar(),
        user.getRedovan(),
        authorities,
        user.getJmbag());
    		
  }

  public String getSmjer() {
	return smjer;
}

public void setSmjer(String smjer) {
	this.smjer = smjer;
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

@Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public Long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserDetailsImpl user = (UserDetailsImpl) o;
    return Objects.equals(id, user.id);
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
}
