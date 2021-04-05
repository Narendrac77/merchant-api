package com.fss.onboard.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A BusinessLegal.
 */
@Entity
@Table(name = "business_legal")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BusinessLegal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "legal_name")
    private String legalName;

    @Column(name = "reg_address")
    private String regAddress;

    @Column(name = "incorporation")
    private String incorporation;

    @Column(name = "pan_number")
    private String panNumber;

    @Column(name = "gst_in_number")
    private String gstInNumber;

    @ManyToOne
    @JsonIgnoreProperties(value = "businessLegals", allowSetters = true)
    private BuisnessInfo buisnessInfo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLegalName() {
        return legalName;
    }

    public BusinessLegal legalName(String legalName) {
        this.legalName = legalName;
        return this;
    }

    public void setLegalName(String legalName) {
        this.legalName = legalName;
    }

    public String getRegAddress() {
        return regAddress;
    }

    public BusinessLegal regAddress(String regAddress) {
        this.regAddress = regAddress;
        return this;
    }

    public void setRegAddress(String regAddress) {
        this.regAddress = regAddress;
    }

    public String getIncorporation() {
        return incorporation;
    }

    public BusinessLegal incorporation(String incorporation) {
        this.incorporation = incorporation;
        return this;
    }

    public void setIncorporation(String incorporation) {
        this.incorporation = incorporation;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public BusinessLegal panNumber(String panNumber) {
        this.panNumber = panNumber;
        return this;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public String getGstInNumber() {
        return gstInNumber;
    }

    public BusinessLegal gstInNumber(String gstInNumber) {
        this.gstInNumber = gstInNumber;
        return this;
    }

    public void setGstInNumber(String gstInNumber) {
        this.gstInNumber = gstInNumber;
    }

    public BuisnessInfo getBuisnessInfo() {
        return buisnessInfo;
    }

    public BusinessLegal buisnessInfo(BuisnessInfo buisnessInfo) {
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
        if (!(o instanceof BusinessLegal)) {
            return false;
        }
        return id != null && id.equals(((BusinessLegal) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BusinessLegal{" +
            "id=" + getId() +
            ", legalName='" + getLegalName() + "'" +
            ", regAddress='" + getRegAddress() + "'" +
            ", incorporation='" + getIncorporation() + "'" +
            ", panNumber='" + getPanNumber() + "'" +
            ", gstInNumber='" + getGstInNumber() + "'" +
            "}";
    }
}
