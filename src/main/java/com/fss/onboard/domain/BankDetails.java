package com.fss.onboard.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A BankDetails.
 */
@Entity
@Table(name = "bank_details")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BankDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "i_fsc_code")
    private String iFSCCode;

    @Column(name = "name")
    private String name;

    @Column(name = "mid")
    private String mid;

    @Column(name = "status")
    private String status;

    @OneToOne(mappedBy = "bankDetails")
    @JsonIgnore
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

    public BankDetails accountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
        return this;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getiFSCCode() {
        return iFSCCode;
    }

    public BankDetails iFSCCode(String iFSCCode) {
        this.iFSCCode = iFSCCode;
        return this;
    }

    public void setiFSCCode(String iFSCCode) {
        this.iFSCCode = iFSCCode;
    }

    public String getName() {
        return name;
    }

    public BankDetails name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMid() {
        return mid;
    }

    public BankDetails mid(String mid) {
        this.mid = mid;
        return this;
    }

    public void setMid(String mid) {
        this.mid = mid;
    }

    public String getStatus() {
        return status;
    }

    public BankDetails status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BuisnessInfo getBuisnessInfo() {
        return buisnessInfo;
    }

    public BankDetails buisnessInfo(BuisnessInfo buisnessInfo) {
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
        if (!(o instanceof BankDetails)) {
            return false;
        }
        return id != null && id.equals(((BankDetails) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BankDetails{" +
            "id=" + getId() +
            ", accountNumber='" + getAccountNumber() + "'" +
            ", iFSCCode='" + getiFSCCode() + "'" +
            ", name='" + getName() + "'" +
            ", mid='" + getMid() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
