import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class FileModelUpdatePage {
  pageTitle: ElementFinder = element(by.id('merchantEngineApp.fileModel.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  fileIdInput: ElementFinder = element(by.css('input#file-model-fileId'));
  fileNameInput: ElementFinder = element(by.css('input#file-model-fileName'));
  fileTypeInput: ElementFinder = element(by.css('input#file-model-fileType'));
  imageDataInput: ElementFinder = element(by.css('input#file_imageData'));
  buisnessInfoSelect: ElementFinder = element(by.css('select#file-model-buisnessInfo'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFileIdInput(fileId) {
    await this.fileIdInput.sendKeys(fileId);
  }

  async getFileIdInput() {
    return this.fileIdInput.getAttribute('value');
  }

  async setFileNameInput(fileName) {
    await this.fileNameInput.sendKeys(fileName);
  }

  async getFileNameInput() {
    return this.fileNameInput.getAttribute('value');
  }

  async setFileTypeInput(fileType) {
    await this.fileTypeInput.sendKeys(fileType);
  }

  async getFileTypeInput() {
    return this.fileTypeInput.getAttribute('value');
  }

  async setImageDataInput(imageData) {
    await this.imageDataInput.sendKeys(imageData);
  }

  async getImageDataInput() {
    return this.imageDataInput.getAttribute('value');
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
    await this.setFileIdInput('fileId');
    expect(await this.getFileIdInput()).to.match(/fileId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setFileNameInput('fileName');
    expect(await this.getFileNameInput()).to.match(/fileName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setFileTypeInput('fileType');
    expect(await this.getFileTypeInput()).to.match(/fileType/);
    await waitUntilDisplayed(this.saveButton);
    await this.setImageDataInput(absolutePath);
    await this.buisnessInfoSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
