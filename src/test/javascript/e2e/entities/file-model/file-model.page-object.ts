import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import FileModelUpdatePage from './file-model-update.page-object';

const expect = chai.expect;
export class FileModelDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('merchantEngineApp.fileModel.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-fileModel'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class FileModelComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('file-model-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('file-model');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateFileModel() {
    await this.createButton.click();
    return new FileModelUpdatePage();
  }

  async deleteFileModel() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const fileModelDeleteDialog = new FileModelDeleteDialog();
    await waitUntilDisplayed(fileModelDeleteDialog.deleteModal);
    expect(await fileModelDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/merchantEngineApp.fileModel.delete.question/);
    await fileModelDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(fileModelDeleteDialog.deleteModal);

    expect(await isVisible(fileModelDeleteDialog.deleteModal)).to.be.false;
  }
}
