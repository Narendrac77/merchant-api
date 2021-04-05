package com.fss.onboard.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A BusinessLegalContact.
 */
@Entity
@Table(name = "business_legal_contact")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BusinessLegalContact implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "contact_name")
    private String contactName;

    @Column(name = "contact_mobile")
    private String contactMobile;

    @Column(name = "contact_email")
    private String contactEmail;

    @Column(name = "aadhar_number")
    private String aadharNumber;

    @ManyToOne
    @JsonIgnoreProperties(value = "businessLegalContacts", allowSetters = true)
    private BuisnessInfo buisnessInfo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContactName() {
        return contactName;
    }

    public BusinessLegalContact contactName(String contactName) {
        this.contactName = contactName;
        return this;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getContactMobile() {
        return contactMobile;
    }

    public BusinessLegalContact contactMobile(String contactMobile) {
        this.contactMobile = contactMobile;
        return this;
    }

    public void setContactMobile(String contactMobile) {
        this.contactMobile = contactMobile;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public BusinessLegalContact contactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
        return this;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getAadharNumber() {
        return aadharNumber;
    }

    public BusinessLegalContact aadharNumber(String aadharNumber) {
        this.aadharNumber = aadharNumber;
        return this;
    }

    public void setAadharNumber(String aadharNumber) {
        this.aadharNumber = aadharNumber;
    }

    public BuisnessInfo getBuisnessInfo() {
        return buisnessInfo;
    }

    public BusinessLegalContact buisnessInfo(BuisnessInfo buisnessInfo) {
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
        if (!(o instanceof BusinessLegalContact)) {
            return false;
        }
        return id != null && id.equals(((BusinessLegalContact) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BusinessLegalContact{" +
            "id=" + getId() +
            ", contactName='" + getContactName() + "'" +
            ", contactMobile='" + getContactMobile() + "'" +
            ", contactEmail='" + getContactEmail() + "'" +
            ", aadharNumber='" + getAadharNumber() + "'" +
            "}";
    }
}
