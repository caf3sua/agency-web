package com.baoviet.app.rest;

import java.net.URI;
import java.net.URISyntaxException;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.baoviet.app.rest.vm.TransactionVM;

/**
 * REST controller for managing users.
 *
 * <p>This class accesses the User entity, and needs to fetch its collection of authorities.</p>
 * <p>
 * For a normal use-case, it would be better to have an eager relationship between User and Authority,
 * and send everything to the client side: there would be no View Model and DTO, a lot less code, and an outer-join
 * which would be good for performance.
 * </p>
 * <p>
 * We use a View Model and a DTO for 3 reasons:
 * <ul>
 * <li>We want to keep a lazy association between the user and the authorities, because people will
 * quite often do relationships with the user, and we don't want them to get the authorities all
 * the time for nothing (for performance reasons). This is the #1 goal: we should not impact our users'
 * application because of this use-case.</li>
 * <li> Not having an outer join causes n+1 requests to the database. This is not a real issue as
 * we have by default a second-level cache. This means on the first HTTP call we do the n+1 requests,
 * but then all authorities come from the cache, so in fact it's much better than doing an outer join
 * (which will get lots of data from the database, for each HTTP call).</li>
 * <li> As this manages users, for security reasons, we'd rather have a DTO layer.</li>
 * </ul>
 * <p>Another option would be to have a specific JPA entity graph to handle this case.</p>
 */
@RestController
@RequestMapping("/api/trans")
public class TransactionResource {

    private final Logger log = LoggerFactory.getLogger(TransactionResource.class);

    @Value("${spring.application.proxy.enable}")
	private boolean proxyEnable;
	
	@Value("${spring.application.proxy.address}")
	private String proxyAddress;
	
	@Value("${spring.application.proxy.port}")
	private String proxyPort;
	
	@Value("${spring.application.proxy.username}")
	private String proxyUsername;
	
	@Value("${spring.application.proxy.password}")
	private String proxyPassword;

    /**
     * POST  /users  : Creates a new user.
     * <p>
     * Creates a new user if the login and email are not already used, and sends an
     * mail with an activation link.
     * The user needs to be activated on creation.
     * </p>
     *
     * @param managedUserVM the user to create
     * @return the ResponseEntity with status 201 (Created) and with body the new user, or with status 400 (Bad Request) if the login or email is already in use
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/get-transaction-status")
    public ResponseEntity<TransactionVM> createUser(@Valid @RequestBody TransactionVM param) throws URISyntaxException {
    	if (proxyEnable) {
			System.getProperties().put("http.proxyHost", proxyAddress);
			System.getProperties().put("http.proxyPort", proxyPort);
			System.getProperties().put("http.proxyUser", proxyUsername);
			System.getProperties().put("http.proxyPassword", proxyPassword);
		}
    	
    	RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(param.getLink(), String.class);
        
//		RequestEntity<?> requestEntity = new RequestEntity<>(HttpMethod.GET, URI.create(param.getLink()));
//		ResponseEntity<String> responseEntity = restTemplate.exchange(requestEntity, String.class);
//    	String result = responseEntity.getBody();
    	
    	param.setResponse(result);
    	return new ResponseEntity<>(param, HttpStatus.OK);
    }

}
