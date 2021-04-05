package com.fss.onboard.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A BusinessBankAcc.
 */
@Entity
@Table(name = "business_bank_acc")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BusinessBankAcc implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "ifsc_code")
    private String ifscCode;

    @Column(name = "account_name")
    private String accountName;

    @ManyToOne
    @JsonIgnoreProperties(value = "businessBankAccs", allowSetters = true)
    private BuisnessInfo buisnessInfo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public BusinessBankAcc accountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
        return this;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public BusinessBankAcc ifscCode(String ifscCode) {
        this.ifscCode = ifscCode;
        return this;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }

    public String getAccountName() {
        return accountName;
    }

    public BusinessBankAcc accountName(String accountName) {
        this.accountName = accountName;
        return this;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public BuisnessInfo getBuisnessInfo() {
        return buisnessInfo;
    }

    public BusinessBankAcc buisnessInfo(BuisnessInfo buisnessInfo) {
        this.buisnessInfo = buisnessInfo;
        return this;
    }

    public void setBuisnessInfo(BuisnessInfo buisnessInfo) {
        this.buisnessInfo = buisnessInfo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BusinessBankAcc)) {
            return false;
        }
        return id != null && id.equals(((BusinessBankAcc) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BusinessBankAcc{" +
            "id=" + getId() +
            ", accountNumber='" + getAccountNumber() + "'" +
            ", ifscCode='" + getIfscCode() + "'" +
            ", accountName='" + getAccountName() + "'" +
            "}";
    }
}
