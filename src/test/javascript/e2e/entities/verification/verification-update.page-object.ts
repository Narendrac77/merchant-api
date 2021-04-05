import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class VerificationUpdatePage {
  pageTitle: ElementFinder = element(by.id('merchantEngineApp.verification.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  midInput: ElementFinder = element(by.css('input#verification-mid'));
  panStatusInput: ElementFinder = element(by.css('input#verification-panStatus'));
  bankStatusInput: ElementFinder = element(by.css('input#verification-bankStatus'));
  gstinStatusInput: ElementFinder = element(by.css('input#verification-gstinStatus'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMidInput(mid) {
    await this.midInput.sendKeys(mid);
  }

  async getMidInput() {
    return this.midInput.getAttribute('value');
  }

  async setPanStatusInput(panStatus) {
    await this.panStatusInput.sendKeys(panStatus);
  }

  async getPanStatusInput() {
    return this.panStatusInput.getAttribute('value');
  }

  async setBankStatusInput(bankStatus) {
    await this.bankStatusInput.sendKeys(bankStatus);
  }

  async getBankStatusInput() {
    return this.bankStatusInput.getAttribute('value');
  }

  async setGstinStatusInput(gstinStatus) {
    await this.gstinStatusInput.sendKeys(gstinStatus);
  }

  async getGstinStatusInput() {
    return this.gstinStatusInput.getAttribute('value');
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
    await this.setMidInput('mid');
    expect(await this.getMidInput()).to.match(/mid/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPanStatusInput('panStatus');
    expect(await this.getPanStatusInput()).to.match(/panStatus/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBankStatusInput('bankStatus');
    expect(await this.getBankStatusInput()).to.match(/bankStatus/);
    await waitUntilDisplayed(this.saveButton);
    await this.setGstinStatusInput('gstinStatus');
    expect(await this.getGstinStatusInput()).to.match(/gstinStatus/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
