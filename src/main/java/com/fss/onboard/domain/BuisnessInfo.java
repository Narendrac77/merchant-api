package com.fss.onboard.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A BuisnessInfo.
 */
@Entity
@Table(name = "buisness_info")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BuisnessInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "display_name")
    private String displayName;

    @Column(name = "business_type")
    private String businessType;

    @Column(name = "business_category")
    private String businessCategory;

    @Column(name = "business_sub_category")
    private String businessSubCategory;

    @Column(name = "country")
    private String country;

    @Column(name = "pincode")
    private String pincode;

    @Column(name = "addline_1")
    private String addline1;

    @Column(name = "addline_2")
    private String addline2;

    @Column(name = "contact_name")
    private String contactName;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "website_url")
    private String websiteUrl;

    @Column(name = "age")
    private String age;

    @Column(name = "turn_over")
    private String turnOver;

    @OneToOne
    @JoinColumn(unique = true)
    private PanDetails panDetails;

    @OneToOne
    @JoinColumn(unique = true)
    private BankDetails bankDetails;

    @OneToOne
    @JoinColumn(unique = true)
    private GstinDetails gstinDetails;

    @OneToMany(mappedBy = "buisnessInfo")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BusinessLegal> businessLegals = new HashSet<>();

    @OneToMany(mappedBy = "buisnessInfo")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BusinessLegalContact> businessLegalContacts = new HashSet<>();

    @OneToMany(mappedBy = "buisnessInfo")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BusinessBankAcc> businessBankAccs = new HashSet<>();

    @OneToMany(mappedBy = "buisnessInfo")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<FileModel> fileModels = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public BuisnessInfo displayName(String displayName) {
        this.displayName = displayName;
        return this;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getBusinessType() {
        return businessType;
    }

    public BuisnessInfo businessType(String businessType) {
        this.businessType = businessType;
        return this;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public String getBusinessCategory() {
        return businessCategory;
    }

    public BuisnessInfo businessCategory(String businessCategory) {
        this.businessCategory = businessCategory;
        return this;
    }

    public void setBusinessCategory(String businessCategory) {
        this.businessCategory = businessCategory;
    }

    public String getBusinessSubCategory() {
        return businessSubCategory;
    }

    public BuisnessInfo businessSubCategory(String businessSubCategory) {
        this.businessSubCategory = businessSubCategory;
        return this;
    }

    public void setBusinessSubCategory(String businessSubCategory) {
        this.businessSubCategory = businessSubCategory;
    }

    public String getCountry() {
        return country;
    }

    public BuisnessInfo country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPincode() {
        return pincode;
    }

    public BuisnessInfo pincode(String pincode) {
        this.pincode = pincode;
        return this;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getAddline1() {
        return addline1;
    }

    public BuisnessInfo addline1(String addline1) {
        this.addline1 = addline1;
        return this;
    }

    public void setAddline1(String addline1) {
        this.addline1 = addline1;
    }

    public String getAddline2() {
        return addline2;
    }

    public BuisnessInfo addline2(String addline2) {
        this.addline2 = addline2;
        return this;
    }

    public void setAddline2(String addline2) {
        this.addline2 = addline2;
    }

    public String getContactName() {
        return contactName;
    }

    public BuisnessInfo contactName(String contactName) {
        this.contactName = contactName;
        return this;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getEmail() {
        return email;
    }

    public BuisnessInfo email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public BuisnessInfo mobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
        return this;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public BuisnessInfo websiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
        return this;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    public String getAge() {
        return age;
    }

    public BuisnessInfo age(String age) {
        this.age = age;
        return this;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getTurnOver() {
        return turnOver;
    }

    public BuisnessInfo turnOver(String turnOver) {
        this.turnOver = turnOver;
        return this;
    }

    public void setTurnOver(String turnOver) {
        this.turnOver = turnOver;
    }

    public PanDetails getPanDetails() {
        return panDetails;
    }

    public BuisnessInfo panDetails(PanDetails panDetails) {
        this.panDetails = panDetails;
        return this;
    }

    public void setPanDetails(PanDetails panDetails) {
        this.panDetails = panDetails;
    }

    public BankDetails getBankDetails() {
        return bankDetails;
    }

    public BuisnessInfo bankDetails(BankDetails bankDetails) {
        this.bankDetails = bankDetails;
        return this;
    }

    public void setBankDetails(BankDetails bankDetails) {
        this.bankDetails = bankDetails;
    }

    public GstinDetails getGstinDetails() {
        return gstinDetails;
    }

    public BuisnessInfo gstinDetails(GstinDetails gstinDetails) {
        this.gstinDetails = gstinDetails;
        return this;
    }

    public void setGstinDetails(GstinDetails gstinDetails) {
        this.gstinDetails = gstinDetails;
    }

    public Set<BusinessLegal> getBusinessLegals() {
        return businessLegals;
    }

    public BuisnessInfo businessLegals(Set<BusinessLegal> businessLegals) {
        this.businessLegals = businessLegals;
        return this;
    }

    public BuisnessInfo addBusinessLegal(BusinessLegal businessLegal) {
        this.businessLegals.add(businessLegal);
        businessLegal.setBuisnessInfo(this);
        return this;
    }

    public BuisnessInfo removeBusinessLegal(BusinessLegal businessLegal) {
        this.businessLegals.remove(businessLegal);
        businessLegal.setBuisnessInfo(null);
        return this;
    }

    public void setBusinessLegals(Set<BusinessLegal> businessLegals) {
        this.businessLegals = businessLegals;
    }

    public Set<BusinessLegalContact> getBusinessLegalContacts() {
        return businessLegalContacts;
    }

    public BuisnessInfo businessLegalContacts(Set<BusinessLegalContact> businessLegalContacts) {
        this.businessLegalContacts = businessLegalContacts;
        return this;
    }

    public BuisnessInfo addBusinessLegalContact(BusinessLegalContact businessLegalContact) {
        this.businessLegalContacts.add(businessLegalContact);
        businessLegalContact.setBuisnessInfo(this);
        return this;
    }

    public BuisnessInfo removeBusinessLegalContact(BusinessLegalContact businessLegalContact) {
        this.businessLegalContacts.remove(businessLegalContact);
        businessLegalContact.setBuisnessInfo(null);
        return this;
    }

    public void setBusinessLegalContacts(Set<BusinessLegalContact> businessLegalContacts) {
        this.businessLegalContacts = businessLegalContacts;
    }

    public Set<BusinessBankAcc> getBusinessBankAccs() {
        return businessBankAccs;
    }

    public BuisnessInfo businessBankAccs(Set<BusinessBankAcc> businessBankAccs) {
        this.businessBankAccs = businessBankAccs;
        return this;
    }

    public BuisnessInfo addBusinessBankAcc(BusinessBankAcc businessBankAcc) {
        this.businessBankAccs.add(businessBankAcc);
        businessBankAcc.setBuisnessInfo(this);
        return this;
    }

    public BuisnessInfo removeBusinessBankAcc(BusinessBankAcc businessBankAcc) {
        this.businessBankAccs.remove(businessBankAcc);
        businessBankAcc.setBuisnessInfo(null);
        return this;
    }

    public void setBusinessBankAccs(Set<BusinessBankAcc> businessBankAccs) {
        this.businessBankAccs = businessBankAccs;
    }

    public Set<FileModel> getFileModels() {
        return fileModels;
    }

    public BuisnessInfo fileModels(Set<FileModel> fileModels) {
        this.fileModels = fileModels;
        return this;
    }

    public BuisnessInfo addFileModel(FileModel fileModel) {
        this.fileModels.add(fileModel);
        fileModel.setBuisnessInfo(this);
        return this;
    }

    public BuisnessInfo removeFileModel(FileModel fileModel) {
        this.fileModels.remove(fileModel);
        fileModel.setBuisnessInfo(null);
        return this;
    }

    public void setFileModels(Set<FileModel> fileModels) {
        this.fileModels = fileModels;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BuisnessInfo)) {
            return false;
        }
        return id != null && id.equals(((BuisnessInfo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BuisnessInfo{" +
            "id=" + getId() +
            ", displayName='" + getDisplayName() + "'" +
            ", businessType='" + getBusinessType() + "'" +
            ", businessCategory='" + getBusinessCategory() + "'" +
            ", businessSubCategory='" + getBusinessSubCategory() + "'" +
            ", country='" + getCountry() + "'" +
            ", pincode='" + getPincode() + "'" +
            ", addline1='" + getAddline1() + "'" +
            ", addline2='" + getAddline2() + "'" +
            ", contactName='" + getContactName() + "'" +
            ", email='" + getEmail() + "'" +
            ", mobileNumber='" + getMobileNumber() + "'" +
            ", websiteUrl='" + getWebsiteUrl() + "'" +
            ", age='" + getAge() + "'" +
            ", turnOver='" + getTurnOver() + "'" +
            "}";
    }
}
