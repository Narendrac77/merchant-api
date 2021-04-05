import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BusinessLegalContactUpdatePage from './business-legal-contact-update.page-object';

const expect = chai.expect;
export class BusinessLegalContactDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('merchantEngineApp.businessLegalContact.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-businessLegalContact'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BusinessLegalContactComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('business-legal-contact-heading'));
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
    await navBarPage.getEntityPage('business-legal-contact');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBusinessLegalContact() {
    await this.createButton.click();
    return new BusinessLegalContactUpdatePage();
  }

  async deleteBusinessLegalContact() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const businessLegalContactDeleteDialog = new BusinessLegalContactDeleteDialog();
    await waitUntilDisplayed(businessLegalContactDeleteDialog.deleteModal);
    expect(await businessLegalContactDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /merchantEngineApp.businessLegalContact.delete.question/
    );
    await businessLegalContactDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(businessLegalContactDeleteDialog.deleteModal);

    expect(await isVisible(businessLegalContactDeleteDialog.deleteModal)).to.be.false;
  }
}
