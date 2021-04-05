import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BuisnessInfoUpdatePage from './buisness-info-update.page-object';

const expect = chai.expect;
export class BuisnessInfoDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('merchantEngineApp.buisnessInfo.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-buisnessInfo'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BuisnessInfoComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('buisness-info-heading'));
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
    await navBarPage.getEntityPage('buisness-info');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBuisnessInfo() {
    await this.createButton.click();
    return new BuisnessInfoUpdatePage();
  }

  async deleteBuisnessInfo() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const buisnessInfoDeleteDialog = new BuisnessInfoDeleteDialog();
    await waitUntilDisplayed(buisnessInfoDeleteDialog.deleteModal);
    expect(await buisnessInfoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/merchantEngineApp.buisnessInfo.delete.question/);
    await buisnessInfoDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(buisnessInfoDeleteDialog.deleteModal);

    expect(await isVisible(buisnessInfoDeleteDialog.deleteModal)).to.be.false;
  }
}
