import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PanDetailsUpdatePage {
  pageTitle: ElementFinder = element(by.id('merchantEngineApp.panDetails.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  panNumberInput: ElementFinder = element(by.css('input#pan-details-panNumber'));
  consentInput: ElementFinder = element(by.css('input#pan-details-consent'));
  nameInput: ElementFinder = element(by.css('input#pan-details-name'));
  midInput: ElementFinder = element(by.css('input#pan-details-mid'));
  statusInput: ElementFinder = element(by.css('input#pan-details-status'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPanNumberInput(panNumber) {
    await this.panNumberInput.sendKeys(panNumber);
  }

  async getPanNumberInput() {
    return this.panNumberInput.getAttribute('value');
  }

  async setConsentInput(consent) {
    await this.consentInput.sendKeys(consent);
  }

  async getConsentInput() {
    return this.consentInput.getAttribute('value');
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
    await this.setPanNumberInput('panNumber');
    expect(await this.getPanNumberInput()).to.match(/panNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setConsentInput('consent');
    expect(await this.getConsentInput()).to.match(/consent/);
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
