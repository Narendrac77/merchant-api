import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BusinessBankAccUpdatePage {
  pageTitle: ElementFinder = element(by.id('merchantEngineApp.businessBankAcc.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  accountNumberInput: ElementFinder = element(by.css('input#business-bank-acc-accountNumber'));
  ifscCodeInput: ElementFinder = element(by.css('input#business-bank-acc-ifscCode'));
  accountNameInput: ElementFinder = element(by.css('input#business-bank-acc-accountName'));
  buisnessInfoSelect: ElementFinder = element(by.css('select#business-bank-acc-buisnessInfo'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAccountNumberInput(accountNumber) {
    await this.accountNumberInput.sendKeys(accountNumber);
  }

  async getAccountNumberInput() {
    return this.accountNumberInput.getAttribute('value');
  }

  async setIfscCodeInput(ifscCode) {
    await this.ifscCodeInput.sendKeys(ifscCode);
  }

  async getIfscCodeInput() {
    return this.ifscCodeInput.getAttribute('value');
  }

  async setAccountNameInput(accountName) {
    await this.accountNameInput.sendKeys(accountName);
  }

  async getAccountNameInput() {
    return this.accountNameInput.getAttribute('value');
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
    await this.setAccountNumberInput('accountNumber');
    expect(await this.getAccountNumberInput()).to.match(/accountNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setIfscCodeInput('ifscCode');
    expect(await this.getIfscCodeInput()).to.match(/ifscCode/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAccountNameInput('accountName');
    expect(await this.getAccountNameInput()).to.match(/accountName/);
    await this.buisnessInfoSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
