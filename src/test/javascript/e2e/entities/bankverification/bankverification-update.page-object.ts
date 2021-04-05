import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BankverificationUpdatePage {
  pageTitle: ElementFinder = element(by.id('merchantEngineApp.bankverification.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  bankverificationIdInput: ElementFinder = element(by.css('input#bankverification-bankverificationId'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setBankverificationIdInput(bankverificationId) {
    await this.bankverificationIdInput.sendKeys(bankverificationId);
  }

  async getBankverificationIdInput() {
    return this.bankverificationIdInput.getAttribute('value');
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
    await this.setBankverificationIdInput('5');
    expect(await this.getBankverificationIdInput()).to.eq('5');
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
