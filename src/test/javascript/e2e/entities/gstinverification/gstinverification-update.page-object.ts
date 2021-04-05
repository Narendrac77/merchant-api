import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class GstinverificationUpdatePage {
  pageTitle: ElementFinder = element(by.id('merchantEngineApp.gstinverification.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  gstinverificationIdInput: ElementFinder = element(by.css('input#gstinverification-gstinverificationId'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setGstinverificationIdInput(gstinverificationId) {
    await this.gstinverificationIdInput.sendKeys(gstinverificationId);
  }

  async getGstinverificationIdInput() {
    return this.gstinverificationIdInput.getAttribute('value');
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
    await this.setGstinverificationIdInput('5');
    expect(await this.getGstinverificationIdInput()).to.eq('5');
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
