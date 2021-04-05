package com.fss.onboard.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Verification.
 */
@Entity
@Table(name = "verification")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Verification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "mid")
    private String mid;

    @Column(name = "pan_status")
    private String panStatus;

    @Column(name = "bank_status")
    private String bankStatus;

    @Column(name = "gstin_status")
    private String gstinStatus;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMid() {
        return mid;
    }

    public Verification mid(String mid) {
        this.mid = mid;
        return this;
    }

    public void setMid(String mid) {
        this.mid = mid;
    }

    public String getPanStatus() {
        return panStatus;
    }

    public Verification panStatus(String panStatus) {
        this.panStatus = panStatus;
        return this;
    }

    public void setPanStatus(String panStatus) {
        this.panStatus = panStatus;
    }

    public String getBankStatus() {
        return bankStatus;
    }

    public Verification bankStatus(String bankStatus) {
        this.bankStatus = bankStatus;
        return this;
    }

    public void setBankStatus(String bankStatus) {
        this.bankStatus = bankStatus;
    }

    public String getGstinStatus() {
        return gstinStatus;
    }

    public Verification gstinStatus(String gstinStatus) {
        this.gstinStatus = gstinStatus;
        return this;
    }

    public void setGstinStatus(String gstinStatus) {
        this.gstinStatus = gstinStatus;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Verification)) {
            return false;
        }
        return id != null && id.equals(((Verification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Verification{" +
            "id=" + getId() +
            ", mid='" + getMid() + "'" +
            ", panStatus='" + getPanStatus() + "'" +
            ", bankStatus='" + getBankStatus() + "'" +
            ", gstinStatus='" + getGstinStatus() + "'" +
            "}";
    }
}
