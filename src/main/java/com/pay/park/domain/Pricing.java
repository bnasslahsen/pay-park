package com.pay.park.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A Pricing.
 */
@Entity
@Table(name = "pricing")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Pricing implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amoount", precision = 10, scale = 2)
    private BigDecimal amoount;

    @Column(name = "currency")
    private String currency;

    @OneToOne    @JoinColumn(unique = true)
    private Location location;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getAmoount() {
        return amoount;
    }

    public Pricing amoount(BigDecimal amoount) {
        this.amoount = amoount;
        return this;
    }

    public void setAmoount(BigDecimal amoount) {
        this.amoount = amoount;
    }

    public String getCurrency() {
        return currency;
    }

    public Pricing currency(String currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Location getLocation() {
        return location;
    }

    public Pricing location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Pricing pricing = (Pricing) o;
        if (pricing.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pricing.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pricing{" +
            "id=" + getId() +
            ", amoount=" + getAmoount() +
            ", currency='" + getCurrency() + "'" +
            "}";
    }
}
