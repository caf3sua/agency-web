package com.baoviet.app.rest.vm;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;


/**
 * The persistent class for the AGENCY database table.
 * 
 */
@JsonInclude(Include.NON_EMPTY)
public class PaymentResultVnPay {
	private String rspCode;
	
	private String message;

	public String getRspCode() {
		return rspCode;
	}

	public void setRspCode(String rspCode) {
		this.rspCode = rspCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}