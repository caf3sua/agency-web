package com.baoviet.app.rest.vm;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;


/**
 * The persistent class for the AGENCY database table.
 * 
 */
@JsonInclude(Include.NON_EMPTY)
public class PaymentValidateResult {
	private String responseString;
	
	private String transRef;
	
	private boolean result;

	public String getResponseString() {
		return responseString;
	}

	public void setResponseString(String responseString) {
		this.responseString = responseString;
	}

	public String getTransRef() {
		return transRef;
	}

	public void setTransRef(String transRef) {
		this.transRef = transRef;
	}

	public boolean isResult() {
		return result;
	}

	public void setResult(boolean result) {
		this.result = result;
	}
}