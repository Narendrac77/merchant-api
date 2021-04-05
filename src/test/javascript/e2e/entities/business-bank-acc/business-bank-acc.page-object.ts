import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BusinessBankAccUpdatePage from './business-bank-acc-update.page-object';

const expect = chai.expect;
export class BusinessBankAccDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('merchantEngineApp.businessBankAcc.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-businessBankAcc'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BusinessBankAccComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('business-bank-acc-heading'));
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
    await navBarPage.getEntityPage('business-bank-acc');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBusinessBankAcc() {
    await this.createButton.click();
    return new BusinessBankAccUpdatePage();
  }

  async deleteBusinessBankAcc() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const businessBankAccDeleteDialog = new BusinessBankAccDeleteDialog();
    await waitUntilDisplayed(businessBankAccDeleteDialog.deleteModal);
    expect(await businessBankAccDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /merchantEngineApp.businessBankAcc.delete.question/
    );
    await businessBankAccDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(businessBankAccDeleteDialog.deleteModal);

    expect(await isVisible(businessBankAccDeleteDialog.deleteModal)).to.be.false;
  }
}
