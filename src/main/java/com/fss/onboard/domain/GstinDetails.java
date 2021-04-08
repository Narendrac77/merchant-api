package com.fss.onboard.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.checkerframework.common.aliasing.qual.Unique;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A GstinDetails.
 */
@Entity
@Table(name = "gstin_details")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GstinDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "gstin")
    private String gstin;

    @Column(name = "consent")
    private String consent;

    @Unique
    @Column(name = "mid")
    private String mid;

    @Column(name = "status")
    private String status;

    @OneToOne(mappedBy = "gstinDetails")
    @JsonIgnore
    private BuisnessInfo buisnessInfo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGstin() {
        return gstin;
    }

    public GstinDetails gstin(String gstin) {
        this.gstin = gstin;
        return this;
    }

    public void setGstin(String gstin) {
        this.gstin = gstin;
    }

    public String getConsent() {
        return consent;
    }

    public GstinDetails consent(String consent) {
        this.consent = consent;
        return this;
    }

    public void setConsent(String consent) {
        this.consent = consent;
    }

    public String getMid() {
        return mid;
    }

    public GstinDetails mid(String mid) {
        this.mid = mid;
        return this;
    }

    public void setMid(String mid) {
        this.mid = mid;
    }

    public String getStatus() {
        return status;
    }

    public GstinDetails status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BuisnessInfo getBuisnessInfo() {
        return buisnessInfo;
    }

    public GstinDetails buisnessInfo(BuisnessInfo buisnessInfo) {
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
        if (!(o instanceof GstinDetails)) {
            return false;
        }
        return id != null && id.equals(((GstinDetails) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GstinDetails{" +
            "id=" + getId() +
            ", gstin='" + getGstin() + "'" +
            ", consent='" + getConsent() + "'" +
            ", mid='" + getMid() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
