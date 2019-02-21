package com.baoviet.app.rest;

import java.net.URISyntaxException;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.baoviet.app.rest.vm.PaymentResultVnPay;
import com.baoviet.app.rest.vm.PaymentValidateResult;
import com.baoviet.app.rest.vm.TransactionVM;
import com.baoviet.app.util.Constants;


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
	
	@Value("${spring.url.urlService}")
	private String urlService;
	
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
        
    	param.setResponse(result);
    	return new ResponseEntity<>(param, HttpStatus.OK);
    }
    
    @GetMapping("/notify-returnVnPay")
	public ResponseEntity<PaymentResultVnPay> returnVnPay(@RequestParam(value = "vnp_Amount", required=false) String vnpAmount,
			@RequestParam("vnp_BankCode") String vnpBankCode, @RequestParam(value = "vnp_BankTranNo", required=false) String vnpBankTranNo,
			@RequestParam("vnp_CardType") String vnpCardType, @RequestParam("vnp_OrderInfo") String vnpOrderInfo,
			@RequestParam("vnp_PayDate") String vnpPayDate, @RequestParam("vnp_ResponseCode") String vnpResponseCode,
			@RequestParam("vnp_TmnCode") String vnpTmnCode, @RequestParam("vnp_TransactionNo") String vnpTransactionNo,
			@RequestParam("vnp_TxnRef") String vnpTxnRef, @RequestParam("vnp_SecureHash") String vnpSecureHash)
			throws URISyntaxException {
		log.info("START REST request to returnVnPay, {}");

		PaymentResultVnPay paymentResult = new PaymentResultVnPay();
		
		RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        String urlGetLink = urlService + "/returnVnPayWeb";
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlGetLink)
                .queryParam(Constants.VNPAY_PARAM_AMOUNT, vnpAmount)
                .queryParam(Constants.VNPAY_PARAM_BANK_CODE, vnpBankCode)
                .queryParam(Constants.VNPAY_PARAM_BANK_TRAN_NO, vnpBankTranNo)
                .queryParam(Constants.VNPAY_PARAM_CARD_TYPE, vnpCardType)
                .queryParam(Constants.VNPAY_PARAM_ORDER_INFO, vnpOrderInfo)
                .queryParam(Constants.VNPAY_PARAM_PAY_DATE, vnpPayDate)
                .queryParam(Constants.VNPAY_PARAM_RESPONSE_CODE, vnpResponseCode)
                .queryParam(Constants.VNPAY_PARAM_TMN_CODE, vnpTmnCode)
                .queryParam(Constants.VNPAY_PARAM_TRANSACTION_NO, vnpTransactionNo)
                .queryParam(Constants.VNPAY_PARAM_TXN_REF, vnpTxnRef)
                .queryParam(Constants.VNPAY_PARAM_SECURE_HASH, vnpSecureHash);

        HttpEntity<?> entity = new HttpEntity<>(headers);

        // get link check
        HttpEntity<String> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);
        
        if (response.getBody() != null) {
        	String body = response.getBody();
        	if (body.equals("02")) {
        		paymentResult.setRspCode("02");
            	paymentResult.setMessage("Order already confirmed");
        	} else if (body.equals("01")) {
        		paymentResult.setRspCode("01");
        		paymentResult.setMessage("Order not found");
        	} else if (body.equals("97")) {
        		paymentResult.setRspCode("97");
        		paymentResult.setMessage("Chu ky khong hop le");
        	} else {
        		String linkCheck = response.getBody().replace("@@@", "&");	
//            	String linkCheck = "http://sandbox.vnpayment.vn/merchant_webapi/merchant.html?vnp_Command=querydr@@@vnp_CreateDate=20190117130816@@@vnp_IpAddr=%3A%3A1@@@vnp_Merchant=VNPAY@@@vnp_OrderInfo=Call+api+lay+thong+tin+don+hang+voi+ma+%3D+BVGI.PAY.19.225@@@vnp_TmnCode=BVTCT001@@@vnp_TransDate=20190117000000@@@vnp_TxnRef=BVGI.PAY.19.225@@@vnp_Version=2.0.0@@@vnp_SecureHash=f874a9a6a6d7c2592a46a5480784d347".replace("@@@", "&");
            	if (proxyEnable) {
        			System.getProperties().put("http.proxyHost", proxyAddress);
        			System.getProperties().put("http.proxyPort", proxyPort);
        			System.getProperties().put("http.proxyUser", proxyUsername);
        			System.getProperties().put("http.proxyPassword", proxyPassword);
        		}
            	
                String result = restTemplate.getForObject(linkCheck, String.class);
                
                PaymentValidateResult input = new PaymentValidateResult();
            	input.setResponseString(result);
            	input.setTransRef(vnpTxnRef);
            	// call API update
            	String urlUpdate = urlService + "/update-status-vnpayWeb";

                // get link check
            	PaymentResultVnPay responseUpdate = restTemplate.postForObject(urlUpdate, input, PaymentResultVnPay.class);
                
            	if (responseUpdate != null) {
                	paymentResult.setRspCode(responseUpdate.getRspCode());
                	paymentResult.setMessage(responseUpdate.getMessage());	
                } else {
                	paymentResult.setRspCode("99");
                }        		
        	}
        } else {
        	paymentResult.setRspCode("99");
        }
		return new ResponseEntity<>(paymentResult, HttpStatus.OK);
	}
}
