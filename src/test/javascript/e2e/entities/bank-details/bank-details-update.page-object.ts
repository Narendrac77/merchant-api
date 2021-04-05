import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BankDetailsUpdatePage {
  pageTitle: ElementFinder = element(by.id('merchantEngineApp.bankDetails.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  accountNumberInput: ElementFinder = element(by.css('input#bank-details-accountNumber'));
  iFSCCodeInput: ElementFinder = element(by.css('input#bank-details-iFSCCode'));
  nameInput: ElementFinder = element(by.css('input#bank-details-name'));
  midInput: ElementFinder = element(by.css('input#bank-details-mid'));
  statusInput: ElementFinder = element(by.css('input#bank-details-status'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAccountNumberInput(accountNumber) {
    await this.accountNumberInput.sendKeys(accountNumber);
  }

  async getAccountNumberInput() {
    return this.accountNumberInput.getAttribute('value');
  }

  async setIFSCCodeInput(iFSCCode) {
    await this.iFSCCodeInput.sendKeys(iFSCCode);
  }

  async getIFSCCodeInput() {
    return this.iFSCCodeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setMidInput(mid) {
    await this.midInput.sendKeys(mid);
  }

  async getMidInput() {
    return this.midInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return this.statusInput.getAttribute('value');
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
    await this.setAccountNumberInput('accountNumber');
    expect(await this.getAccountNumberInput()).to.match(/accountNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setIFSCCodeInput('iFSCCode');
    expect(await this.getIFSCCodeInput()).to.match(/iFSCCode/);
    await waitUntilDisplayed(this.saveButton);
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(this.saveButton);
    await this.setMidInput('mid');
    expect(await this.getMidInput()).to.match(/mid/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStatusInput('status');
    expect(await this.getStatusInput()).to.match(/status/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
