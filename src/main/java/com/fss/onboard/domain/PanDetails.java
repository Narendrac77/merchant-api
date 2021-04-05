package com.fss.onboard.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A PanDetails.
 */
@Entity
@Table(name = "pan_details")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PanDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "pan_number")
    private String panNumber;

    @Column(name = "consent")
    private String consent;

    @Column(name = "name")
    private String name;

    @Column(name = "mid")
    private String mid;

    @Column(name = "status")
    private String status;

    @OneToOne(mappedBy = "panDetails")
    @JsonIgnore
    private BuisnessInfo buisnessInfo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public PanDetails panNumber(String panNumber) {
        this.panNumber = panNumber;
        return this;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public String getConsent() {
        return consent;
    }

    public PanDetails consent(String consent) {
        this.consent = consent;
        return this;
    }

    public void setConsent(String consent) {
        this.consent = consent;
    }

    public String getName() {
        return name;
    }

    public PanDetails name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMid() {
        return mid;
    }

    public PanDetails mid(String mid) {
        this.mid = mid;
        return this;
    }

    public void setMid(String mid) {
        this.mid = mid;
    }

    public String getStatus() {
        return status;
    }

    public PanDetails status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BuisnessInfo getBuisnessInfo() {
        return buisnessInfo;
    }

    public PanDetails buisnessInfo(BuisnessInfo buisnessInfo) {
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
        if (!(o instanceof PanDetails)) {
            return false;
        }
        return id != null && id.equals(((PanDetails) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PanDetails{" +
            "id=" + getId() +
            ", panNumber='" + getPanNumber() + "'" +
            ", consent='" + getConsent() + "'" +
            ", name='" + getName() + "'" +
            ", mid='" + getMid() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
