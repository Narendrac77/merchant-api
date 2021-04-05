import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PanverificationUpdatePage {
  pageTitle: ElementFinder = element(by.id('merchantEngineApp.panverification.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  panverificationIdInput: ElementFinder = element(by.css('input#panverification-panverificationId'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPanverificationIdInput(panverificationId) {
    await this.panverificationIdInput.sendKeys(panverificationId);
  }

  async getPanverificationIdInput() {
    return this.panverificationIdInput.getAttribute('value');
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
    await this.setPanverificationIdInput('5');
    expect(await this.getPanverificationIdInput()).to.eq('5');
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
