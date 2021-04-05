import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BusinessLegalContactComponentsPage from './business-legal-contact.page-object';
import BusinessLegalContactUpdatePage from './business-legal-contact-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('BusinessLegalContact e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let businessLegalContactComponentsPage: BusinessLegalContactComponentsPage;
  let businessLegalContactUpdatePage: BusinessLegalContactUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    businessLegalContactComponentsPage = new BusinessLegalContactComponentsPage();
    businessLegalContactComponentsPage = await businessLegalContactComponentsPage.goToPage(navBarPage);
  });

  it('should load BusinessLegalContacts', async () => {
    expect(await businessLegalContactComponentsPage.title.getText()).to.match(/Business Legal Contacts/);
    expect(await businessLegalContactComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete BusinessLegalContacts', async () => {
    const beforeRecordsCount = (await isVisible(businessLegalContactComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(businessLegalContactComponentsPage.table);
    businessLegalContactUpdatePage = await businessLegalContactComponentsPage.goToCreateBusinessLegalContact();
    await businessLegalContactUpdatePage.enterData();

    expect(await businessLegalContactComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(businessLegalContactComponentsPage.table);
    await waitUntilCount(businessLegalContactComponentsPage.records, beforeRecordsCount + 1);
    expect(await businessLegalContactComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await businessLegalContactComponentsPage.deleteBusinessLegalContact();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(businessLegalContactComponentsPage.records, beforeRecordsCount);
      expect(await businessLegalContactComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(businessLegalContactComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
