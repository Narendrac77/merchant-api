package com.fss.onboard.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Panverification.
 */
@Entity
@Table(name = "panverification")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Panverification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "panverification_id")
    private Integer panverificationId;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPanverificationId() {
        return panverificationId;
    }

    public Panverification panverificationId(Integer panverificationId) {
        this.panverificationId = panverificationId;
        return this;
    }

    public void setPanverificationId(Integer panverificationId) {
        this.panverificationId = panverificationId;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Panverification)) {
            return false;
        }
        return id != null && id.equals(((Panverification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Panverification{" +
            "id=" + getId() +
            ", panverificationId=" + getPanverificationId() +
            "}";
    }
}
