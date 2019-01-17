package com.baoviet.app.util;

public interface Constants {

	// Spring profiles for development, test and production, see http://jhipster.github.io/profiles/
    public static final String SPRING_PROFILE_DEVELOPMENT = "dev";
    public static final String SPRING_PROFILE_TEST = "test";
    public static final String SPRING_PROFILE_PRODUCTION = "prod";
    // Spring profile used when deploying with Spring Cloud (used when deploying to CloudFoundry)
    public static final String SPRING_PROFILE_CLOUD = "cloud";
    // Spring profile used when deploying to Heroku
    public static final String SPRING_PROFILE_HEROKU = "heroku";
    // Spring profile used to disable swagger
    public static final String SPRING_PROFILE_SWAGGER = "swagger";
    // Spring profile used to disable running liquibase
    public static final String SPRING_PROFILE_NO_LIQUIBASE = "no-liquibase";
    
    static final String VNPAY_PARAM_AMOUNT = "vnp_Amount";
	static final String VNPAY_PARAM_BANK_CODE = "vnp_BankCode";
	static final String VNPAY_PARAM_BANK_TRAN_NO = "vnp_BankTranNo";
	static final String VNPAY_PARAM_CARD_TYPE = "vnp_CardType";
	static final String VNPAY_PARAM_ORDER_INFO = "vnp_OrderInfo";
	static final String VNPAY_PARAM_PAY_DATE = "vnp_PayDate";
	static final String VNPAY_PARAM_RESPONSE_CODE = "vnp_ResponseCode";
	static final String VNPAY_PARAM_TMN_CODE = "vnp_TmnCode";
	static final String VNPAY_PARAM_TRANSACTION_NO = "vnp_TransactionNo";
	static final String VNPAY_PARAM_TXN_REF = "vnp_TxnRef";
	static final String VNPAY_PARAM_SECURE_HASH = "vnp_SecureHash";
	static final String VNPAY_PARAM_VERSION = "vnp_Version";
	static final String VNPAY_PARAM_COMMAND = "vnp_Command";
	static final String VNPAY_PARAM_MERCHANT = "vnp_Merchant";
	static final String VNPAY_PARAM_TRANS_DATE = "vnp_TransDate";
	static final String VNPAY_PARAM_CREATE_DATE = "vnp_CreateDate";
	static final String VNPAY_PARAM_IP_ADDR = "vnp_IpAddr";
	static final String VNPAY_PARAM_TRANSACTION_STATUS = "vnp_TransactionStatus";
}
