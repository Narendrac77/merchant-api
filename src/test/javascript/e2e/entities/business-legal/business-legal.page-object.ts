import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BusinessLegalUpdatePage from './business-legal-update.page-object';

const expect = chai.expect;
export class BusinessLegalDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('merchantEngineApp.businessLegal.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-businessLegal'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BusinessLegalComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('business-legal-heading'));
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
    await navBarPage.getEntityPage('business-legal');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBusinessLegal() {
    await this.createButton.click();
    return new BusinessLegalUpdatePage();
  }

  async deleteBusinessLegal() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const businessLegalDeleteDialog = new BusinessLegalDeleteDialog();
    await waitUntilDisplayed(businessLegalDeleteDialog.deleteModal);
    expect(await businessLegalDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/merchantEngineApp.businessLegal.delete.question/);
    await businessLegalDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(businessLegalDeleteDialog.deleteModal);

    expect(await isVisible(businessLegalDeleteDialog.deleteModal)).to.be.false;
  }
}
