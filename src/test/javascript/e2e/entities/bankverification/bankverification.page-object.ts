import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BankverificationUpdatePage from './bankverification-update.page-object';

const expect = chai.expect;
export class BankverificationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('merchantEngineApp.bankverification.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-bankverification'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BankverificationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('bankverification-heading'));
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
    await navBarPage.getEntityPage('bankverification');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBankverification() {
    await this.createButton.click();
    return new BankverificationUpdatePage();
  }

  async deleteBankverification() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const bankverificationDeleteDialog = new BankverificationDeleteDialog();
    await waitUntilDisplayed(bankverificationDeleteDialog.deleteModal);
    expect(await bankverificationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /merchantEngineApp.bankverification.delete.question/
    );
    await bankverificationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bankverificationDeleteDialog.deleteModal);

    expect(await isVisible(bankverificationDeleteDialog.deleteModal)).to.be.false;
  }
}
