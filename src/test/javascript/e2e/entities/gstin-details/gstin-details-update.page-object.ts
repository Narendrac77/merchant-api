import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class GstinDetailsUpdatePage {
  pageTitle: ElementFinder = element(by.id('merchantEngineApp.gstinDetails.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  gstinInput: ElementFinder = element(by.css('input#gstin-details-gstin'));
  consentInput: ElementFinder = element(by.css('input#gstin-details-consent'));
  midInput: ElementFinder = element(by.css('input#gstin-details-mid'));
  statusInput: ElementFinder = element(by.css('input#gstin-details-status'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setGstinInput(gstin) {
    await this.gstinInput.sendKeys(gstin);
  }

  async getGstinInput() {
    return this.gstinInput.getAttribute('value');
  }

  async setConsentInput(consent) {
    await this.consentInput.sendKeys(consent);
  }

  async getConsentInput() {
    return this.consentInput.getAttribute('value');
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
    await this.setGstinInput('gstin');
    expect(await this.getGstinInput()).to.match(/gstin/);
    await waitUntilDisplayed(this.saveButton);
    await this.setConsentInput('consent');
    expect(await this.getConsentInput()).to.match(/consent/);
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
