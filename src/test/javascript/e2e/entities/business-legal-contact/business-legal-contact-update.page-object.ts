import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BusinessLegalContactUpdatePage {
  pageTitle: ElementFinder = element(by.id('merchantEngineApp.businessLegalContact.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  contactNameInput: ElementFinder = element(by.css('input#business-legal-contact-contactName'));
  contactMobileInput: ElementFinder = element(by.css('input#business-legal-contact-contactMobile'));
  contactEmailInput: ElementFinder = element(by.css('input#business-legal-contact-contactEmail'));
  aadharNumberInput: ElementFinder = element(by.css('input#business-legal-contact-aadharNumber'));
  buisnessInfoSelect: ElementFinder = element(by.css('select#business-legal-contact-buisnessInfo'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setContactNameInput(contactName) {
    await this.contactNameInput.sendKeys(contactName);
  }

  async getContactNameInput() {
    return this.contactNameInput.getAttribute('value');
  }

  async setContactMobileInput(contactMobile) {
    await this.contactMobileInput.sendKeys(contactMobile);
  }

  async getContactMobileInput() {
    return this.contactMobileInput.getAttribute('value');
  }

  async setContactEmailInput(contactEmail) {
    await this.contactEmailInput.sendKeys(contactEmail);
  }

  async getContactEmailInput() {
    return this.contactEmailInput.getAttribute('value');
  }

  async setAadharNumberInput(aadharNumber) {
    await this.aadharNumberInput.sendKeys(aadharNumber);
  }

  async getAadharNumberInput() {
    return this.aadharNumberInput.getAttribute('value');
  }

  async buisnessInfoSelectLastOption() {
    await this.buisnessInfoSelect.all(by.tagName('option')).last().click();
  }

  async buisnessInfoSelectOption(option) {
    await this.buisnessInfoSelect.sendKeys(option);
  }

  getBuisnessInfoSelect() {
    return this.buisnessInfoSelect;
  }

  async getBuisnessInfoSelectedOption() {
    return this.buisnessInfoSelect.element(by.css('option:checked')).getText();
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
    await this.setContactNameInput('contactName');
    expect(await this.getContactNameInput()).to.match(/contactName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setContactMobileInput('contactMobile');
    expect(await this.getContactMobileInput()).to.match(/contactMobile/);
    await waitUntilDisplayed(this.saveButton);
    await this.setContactEmailInput('contactEmail');
    expect(await this.getContactEmailInput()).to.match(/contactEmail/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAadharNumberInput('aadharNumber');
    expect(await this.getAadharNumberInput()).to.match(/aadharNumber/);
    await this.buisnessInfoSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
