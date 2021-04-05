import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BuisnessInfoUpdatePage {
  pageTitle: ElementFinder = element(by.id('merchantEngineApp.buisnessInfo.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  displayNameInput: ElementFinder = element(by.css('input#buisness-info-displayName'));
  businessTypeInput: ElementFinder = element(by.css('input#buisness-info-businessType'));
  businessCategoryInput: ElementFinder = element(by.css('input#buisness-info-businessCategory'));
  businessSubCategoryInput: ElementFinder = element(by.css('input#buisness-info-businessSubCategory'));
  countryInput: ElementFinder = element(by.css('input#buisness-info-country'));
  pincodeInput: ElementFinder = element(by.css('input#buisness-info-pincode'));
  addline1Input: ElementFinder = element(by.css('input#buisness-info-addline1'));
  addline2Input: ElementFinder = element(by.css('input#buisness-info-addline2'));
  contactNameInput: ElementFinder = element(by.css('input#buisness-info-contactName'));
  emailInput: ElementFinder = element(by.css('input#buisness-info-email'));
  mobileNumberInput: ElementFinder = element(by.css('input#buisness-info-mobileNumber'));
  websiteUrlInput: ElementFinder = element(by.css('input#buisness-info-websiteUrl'));
  ageInput: ElementFinder = element(by.css('input#buisness-info-age'));
  turnOverInput: ElementFinder = element(by.css('input#buisness-info-turnOver'));
  panDetailsSelect: ElementFinder = element(by.css('select#buisness-info-panDetails'));
  bankDetailsSelect: ElementFinder = element(by.css('select#buisness-info-bankDetails'));
  gstinDetailsSelect: ElementFinder = element(by.css('select#buisness-info-gstinDetails'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDisplayNameInput(displayName) {
    await this.displayNameInput.sendKeys(displayName);
  }

  async getDisplayNameInput() {
    return this.displayNameInput.getAttribute('value');
  }

  async setBusinessTypeInput(businessType) {
    await this.businessTypeInput.sendKeys(businessType);
  }

  async getBusinessTypeInput() {
    return this.businessTypeInput.getAttribute('value');
  }

  async setBusinessCategoryInput(businessCategory) {
    await this.businessCategoryInput.sendKeys(businessCategory);
  }

  async getBusinessCategoryInput() {
    return this.businessCategoryInput.getAttribute('value');
  }

  async setBusinessSubCategoryInput(businessSubCategory) {
    await this.businessSubCategoryInput.sendKeys(businessSubCategory);
  }

  async getBusinessSubCategoryInput() {
    return this.businessSubCategoryInput.getAttribute('value');
  }

  async setCountryInput(country) {
    await this.countryInput.sendKeys(country);
  }

  async getCountryInput() {
    return this.countryInput.getAttribute('value');
  }

  async setPincodeInput(pincode) {
    await this.pincodeInput.sendKeys(pincode);
  }

  async getPincodeInput() {
    return this.pincodeInput.getAttribute('value');
  }

  async setAddline1Input(addline1) {
    await this.addline1Input.sendKeys(addline1);
  }

  async getAddline1Input() {
    return this.addline1Input.getAttribute('value');
  }

  async setAddline2Input(addline2) {
    await this.addline2Input.sendKeys(addline2);
  }

  async getAddline2Input() {
    return this.addline2Input.getAttribute('value');
  }

  async setContactNameInput(contactName) {
    await this.contactNameInput.sendKeys(contactName);
  }

  async getContactNameInput() {
    return this.contactNameInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setMobileNumberInput(mobileNumber) {
    await this.mobileNumberInput.sendKeys(mobileNumber);
  }

  async getMobileNumberInput() {
    return this.mobileNumberInput.getAttribute('value');
  }

  async setWebsiteUrlInput(websiteUrl) {
    await this.websiteUrlInput.sendKeys(websiteUrl);
  }

  async getWebsiteUrlInput() {
    return this.websiteUrlInput.getAttribute('value');
  }

  async setAgeInput(age) {
    await this.ageInput.sendKeys(age);
  }

  async getAgeInput() {
    return this.ageInput.getAttribute('value');
  }

  async setTurnOverInput(turnOver) {
    await this.turnOverInput.sendKeys(turnOver);
  }

  async getTurnOverInput() {
    return this.turnOverInput.getAttribute('value');
  }

  async panDetailsSelectLastOption() {
    await this.panDetailsSelect.all(by.tagName('option')).last().click();
  }

  async panDetailsSelectOption(option) {
    await this.panDetailsSelect.sendKeys(option);
  }

  getPanDetailsSelect() {
    return this.panDetailsSelect;
  }

  async getPanDetailsSelectedOption() {
    return this.panDetailsSelect.element(by.css('option:checked')).getText();
  }

  async bankDetailsSelectLastOption() {
    await this.bankDetailsSelect.all(by.tagName('option')).last().click();
  }

  async bankDetailsSelectOption(option) {
    await this.bankDetailsSelect.sendKeys(option);
  }

  getBankDetailsSelect() {
    return this.bankDetailsSelect;
  }

  async getBankDetailsSelectedOption() {
    return this.bankDetailsSelect.element(by.css('option:checked')).getText();
  }

  async gstinDetailsSelectLastOption() {
    await this.gstinDetailsSelect.all(by.tagName('option')).last().click();
  }

  async gstinDetailsSelectOption(option) {
    await this.gstinDetailsSelect.sendKeys(option);
  }

  getGstinDetailsSelect() {
    return this.gstinDetailsSelect;
  }

  async getGstinDetailsSelectedOption() {
    return this.gstinDetailsSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setDisplayNameInput('displayName');
    expect(await this.getDisplayNameInput()).to.match(/displayName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBusinessTypeInput('businessType');
    expect(await this.getBusinessTypeInput()).to.match(/businessType/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBusinessCategoryInput('businessCategory');
    expect(await this.getBusinessCategoryInput()).to.match(/businessCategory/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBusinessSubCategoryInput('businessSubCategory');
    expect(await this.getBusinessSubCategoryInput()).to.match(/businessSubCategory/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCountryInput('country');
    expect(await this.getCountryInput()).to.match(/country/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPincodeInput('pincode');
    expect(await this.getPincodeInput()).to.match(/pincode/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAddline1Input('addline1');
    expect(await this.getAddline1Input()).to.match(/addline1/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAddline2Input('addline2');
    expect(await this.getAddline2Input()).to.match(/addline2/);
    await waitUntilDisplayed(this.saveButton);
    await this.setContactNameInput('contactName');
    expect(await this.getContactNameInput()).to.match(/contactName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEmailInput('email');
    expect(await this.getEmailInput()).to.match(/email/);
    await waitUntilDisplayed(this.saveButton);
    await this.setMobileNumberInput('mobileNumber');
    expect(await this.getMobileNumberInput()).to.match(/mobileNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setWebsiteUrlInput('websiteUrl');
    expect(await this.getWebsiteUrlInput()).to.match(/websiteUrl/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAgeInput('age');
    expect(await this.getAgeInput()).to.match(/age/);
    await waitUntilDisplayed(this.saveButton);
    await this.setTurnOverInput('turnOver');
    expect(await this.getTurnOverInput()).to.match(/turnOver/);
    await this.panDetailsSelectLastOption();
    await this.bankDetailsSelectLastOption();
    await this.gstinDetailsSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
