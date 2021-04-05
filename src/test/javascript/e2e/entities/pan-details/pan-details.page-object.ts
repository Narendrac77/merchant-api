import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PanDetailsUpdatePage from './pan-details-update.page-object';

const expect = chai.expect;
export class PanDetailsDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('merchantEngineApp.panDetails.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-panDetails'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PanDetailsComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('pan-details-heading'));
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
    await navBarPage.getEntityPage('pan-details');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePanDetails() {
    await this.createButton.click();
    return new PanDetailsUpdatePage();
  }

  async deletePanDetails() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const panDetailsDeleteDialog = new PanDetailsDeleteDialog();
    await waitUntilDisplayed(panDetailsDeleteDialog.deleteModal);
    expect(await panDetailsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/merchantEngineApp.panDetails.delete.question/);
    await panDetailsDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(panDetailsDeleteDialog.deleteModal);

    expect(await isVisible(panDetailsDeleteDialog.deleteModal)).to.be.false;
  }
}
