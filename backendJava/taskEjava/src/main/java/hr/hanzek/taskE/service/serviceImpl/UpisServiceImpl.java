package hr.hanzek.taskE.service.serviceImpl;

import java.io.ByteArrayOutputStream;
import java.io.ObjectOutputStream;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.Signature;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hr.hanzek.taskE.beans.Kljucevi;
import hr.hanzek.taskE.beans.Potpis;
import hr.hanzek.taskE.beans.Predmet;
import hr.hanzek.taskE.beans.Upis;
import hr.hanzek.taskE.dao.UpisDAO;
import hr.hanzek.taskE.service.UpisService;

@Service
public class UpisServiceImpl implements UpisService{
	
	@Autowired
	UpisDAO iUpisDAO;

	@Override
	public List<Predmet> dohvatiMolbe() {
		return iUpisDAO.dohvatiMolbe();
	}

	@Override
	public List<Predmet> spremiUpis(List<Predmet> pred) {
		return iUpisDAO.spremiUpis(pred);
	}

	@Override
	public Upis dohvatiUpisPoId(Long id) {
		return iUpisDAO.dohvatiUpisPoId(id);
	}

	@Override
	public List<Predmet> dohvatiPredmetePoUserId(Long id) {
		return iUpisDAO.dohvatiPredmetePoUserId(id);
	}

	@Override
	public List<Upis> dohvatiUpise() {
		return iUpisDAO.dohvatiUpise();
	}

	@Override
	public Upis updateUpis(Upis m) {
		return iUpisDAO.updateUpis( m);
	}

	@Override
	public Kljucevi generirajKljuceve(Long id) {
		Kljucevi key=new Kljucevi();
		String temp = "";
		try {
	        // Get instance and initialize a KeyPairGenerator object.
	        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("DSA", "SUN");
	        SecureRandom random = SecureRandom.getInstance("SHA1PRNG", "SUN");
	        keyGen.initialize(1024, random);

	        // Get a PrivateKey from the generated key pair.
	        KeyPair keyPair = keyGen.generateKeyPair();
	        PrivateKey privateKey = keyPair.getPrivate();
	        PublicKey publicKey = keyPair.getPublic();
	        
	        System.out.println(keyPair);
	        key.setPrivateKey(Base64.getEncoder().encodeToString(privateKey.getEncoded()));
	        iUpisDAO.updatePublicKey( Base64.getEncoder().encodeToString(publicKey.getEncoded()),id);
	        // Get an instance of Signature object and initialize it.
//	        Signature signature = Signature.getInstance("SHA1withDSA", "SUN");
//	        signature.initSign(privateKey);

	        // Supply the data to be signed to the Signature object
	        // using the update() method and generate the digital
	        // signature.
//	        byte[] bytes = Files.readAllBytes(Paths.get("README.md"));
//	        signature.update(bytes);
//	        byte[] digitalSignature = signature.sign();

	        // Save digital signature and the public key to a file.
//	        Files.write(Paths.get("signature"), digitalSignature);
//	        Files.write(Paths.get("publickey"), keyPair.getPublic().getEncoded());
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
		return key;
	}

	@Override
	public void potpisi(Potpis pred) {
		// TODO Auto-generated method stub
		byte[] privateKeyBytes = Base64.getDecoder().decode(pred.getPrivateKey());
		try {
		    PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(privateKeyBytes);
		    KeyFactory factory = KeyFactory.getInstance("DSA");
		    PrivateKey privateKey = factory.generatePrivate(spec);
		    
	        Signature signature = Signature.getInstance("SHA1withDSA", "SUN");
	        signature.initSign(privateKey);

	        ByteArrayOutputStream bos = new ByteArrayOutputStream();
	        ObjectOutputStream oos = new ObjectOutputStream(bos);
	        oos.writeObject(pred.getUpis());
	        oos.flush();
	        byte[] objectBytes = bos.toByteArray();
	        signature.update(objectBytes);
	        byte[] digitalSignature = signature.sign();
		    
	        String signatureString = Base64.getEncoder().encodeToString(digitalSignature);
	        System.out.println("Digital signature: " + signatureString);
	        iUpisDAO.setSignature( signatureString,pred.getUpis().getId());
		    // Use the privateKey object here
		} catch ( Exception e) {
			System.out.println(e);
		    // Handle any exceptions
		}
		
	}

	@Override
	public Upis validiraj(Upis upis) {
		boolean result=false;
		 try {
			 	Upis temp = new Upis();
			 	temp.setId(upis.getId());
			 	temp.setDatum(upis.getDatum());
			 	temp.setSemestar(upis.getSemestar());
			 	temp.setStatus("CEKANJE_POTPISA");
			 	temp.setUser(upis.getUser());
			 	temp.setUserId(upis.getUserId());
		        // Convert the public key from string to PublicKey object
		        byte[] publicKeyBytes = Base64.getDecoder().decode(iUpisDAO.getUser(upis.getUserId()).getPublicKey());
		        System.out.println(iUpisDAO.getUser(upis.getUserId()).getPublicKey());
		        X509EncodedKeySpec spec = new X509EncodedKeySpec(publicKeyBytes);
		        KeyFactory factory = KeyFactory.getInstance("DSA");
		        PublicKey publicKey = factory.generatePublic(spec);
		        System.out.println( Base64.getEncoder().encodeToString(publicKey.getEncoded()));
		        // Convert the signature from string to byte array
		        byte[] signatureBytes = Base64.getDecoder().decode(upis.getPotpis());

		        // Initialize the Signature object with the public key
		        Signature signature = Signature.getInstance("SHA1withDSA", "SUN");
		        signature.initVerify(publicKey);
		        System.out.println("Digital signature: " + Base64.getEncoder().encodeToString(signatureBytes));
		        // Serialize the object to byte array
		        ByteArrayOutputStream bos = new ByteArrayOutputStream();
		        ObjectOutputStream oos = new ObjectOutputStream(bos);
		        oos.writeObject(temp);
		        oos.flush();
		        byte[] objectBytes = bos.toByteArray();

		        // Update the signature with the serialized object
		        signature.update(objectBytes);

		        // Verify the signature
		         result = signature.verify(signatureBytes);
		        System.out.println(result);
		        
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
		 if(result) {
			 return upis;
		 }else {
			 return null;
		 }
	
	}

}
