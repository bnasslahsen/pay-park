package com.pay.park.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Card.
 */
@Entity
@Table(name = "card")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Card implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "credit_card_number")
    private Long creditCardNumber;

    @Column(name = "cvv")
    private Long cvv;

    @Column(name = "expiration_month")
    private Long expirationMonth;

    @Column(name = "expiration_year")
    private Long expirationYear;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public Card type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFullName() {
        return fullName;
    }

    public Card fullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Long getCreditCardNumber() {
        return creditCardNumber;
    }

    public Card creditCardNumber(Long creditCardNumber) {
        this.creditCardNumber = creditCardNumber;
        return this;
    }

    public void setCreditCardNumber(Long creditCardNumber) {
        this.creditCardNumber = creditCardNumber;
    }

    public Long getCvv() {
        return cvv;
    }

    public Card cvv(Long cvv) {
        this.cvv = cvv;
        return this;
    }

    public void setCvv(Long cvv) {
        this.cvv = cvv;
    }

    public Long getExpirationMonth() {
        return expirationMonth;
    }

    public Card expirationMonth(Long expirationMonth) {
        this.expirationMonth = expirationMonth;
        return this;
    }

    public void setExpirationMonth(Long expirationMonth) {
        this.expirationMonth = expirationMonth;
    }

    public Long getExpirationYear() {
        return expirationYear;
    }

    public Card expirationYear(Long expirationYear) {
        this.expirationYear = expirationYear;
        return this;
    }

    public void setExpirationYear(Long expirationYear) {
        this.expirationYear = expirationYear;
    }

    public User getUser() {
        return user;
    }

    public Card user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        Card card = (Card) o;
        if (card.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), card.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Card{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", fullName='" + getFullName() + "'" +
            ", creditCardNumber=" + getCreditCardNumber() +
            ", cvv=" + getCvv() +
            ", expirationMonth=" + getExpirationMonth() +
            ", expirationYear=" + getExpirationYear() +
            "}";
    }
}
