import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import GstinverificationUpdatePage from './gstinverification-update.page-object';

const expect = chai.expect;
export class GstinverificationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('merchantEngineApp.gstinverification.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-gstinverification'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class GstinverificationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('gstinverification-heading'));
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
    await navBarPage.getEntityPage('gstinverification');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateGstinverification() {
    await this.createButton.click();
    return new GstinverificationUpdatePage();
  }

  async deleteGstinverification() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const gstinverificationDeleteDialog = new GstinverificationDeleteDialog();
    await waitUntilDisplayed(gstinverificationDeleteDialog.deleteModal);
    expect(await gstinverificationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /merchantEngineApp.gstinverification.delete.question/
    );
    await gstinverificationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(gstinverificationDeleteDialog.deleteModal);

    expect(await isVisible(gstinverificationDeleteDialog.deleteModal)).to.be.false;
  }
}
