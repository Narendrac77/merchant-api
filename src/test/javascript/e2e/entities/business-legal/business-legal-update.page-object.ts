import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BusinessLegalUpdatePage {
  pageTitle: ElementFinder = element(by.id('merchantEngineApp.businessLegal.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  legalNameInput: ElementFinder = element(by.css('input#business-legal-legalName'));
  regAddressInput: ElementFinder = element(by.css('input#business-legal-regAddress'));
  incorporationInput: ElementFinder = element(by.css('input#business-legal-incorporation'));
  panNumberInput: ElementFinder = element(by.css('input#business-legal-panNumber'));
  gstInNumberInput: ElementFinder = element(by.css('input#business-legal-gstInNumber'));
  buisnessInfoSelect: ElementFinder = element(by.css('select#business-legal-buisnessInfo'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLegalNameInput(legalName) {
    await this.legalNameInput.sendKeys(legalName);
  }

  async getLegalNameInput() {
    return this.legalNameInput.getAttribute('value');
  }

  async setRegAddressInput(regAddress) {
    await this.regAddressInput.sendKeys(regAddress);
  }

  async getRegAddressInput() {
    return this.regAddressInput.getAttribute('value');
  }

  async setIncorporationInput(incorporation) {
    await this.incorporationInput.sendKeys(incorporation);
  }

  async getIncorporationInput() {
    return this.incorporationInput.getAttribute('value');
  }

  async setPanNumberInput(panNumber) {
    await this.panNumberInput.sendKeys(panNumber);
  }

  async getPanNumberInput() {
    return this.panNumberInput.getAttribute('value');
  }

  async setGstInNumberInput(gstInNumber) {
    await this.gstInNumberInput.sendKeys(gstInNumber);
  }

  async getGstInNumberInput() {
    return this.gstInNumberInput.getAttribute('value');
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
    await this.setLegalNameInput('legalName');
    expect(await this.getLegalNameInput()).to.match(/legalName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setRegAddressInput('regAddress');
    expect(await this.getRegAddressInput()).to.match(/regAddress/);
    await waitUntilDisplayed(this.saveButton);
    await this.setIncorporationInput('incorporation');
    expect(await this.getIncorporationInput()).to.match(/incorporation/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPanNumberInput('panNumber');
    expect(await this.getPanNumberInput()).to.match(/panNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setGstInNumberInput('gstInNumber');
    expect(await this.getGstInNumberInput()).to.match(/gstInNumber/);
    await this.buisnessInfoSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
