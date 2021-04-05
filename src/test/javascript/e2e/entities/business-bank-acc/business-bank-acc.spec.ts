import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BusinessBankAccComponentsPage from './business-bank-acc.page-object';
import BusinessBankAccUpdatePage from './business-bank-acc-update.page-object';
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

describe('BusinessBankAcc e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let businessBankAccComponentsPage: BusinessBankAccComponentsPage;
  let businessBankAccUpdatePage: BusinessBankAccUpdatePage;

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
    businessBankAccComponentsPage = new BusinessBankAccComponentsPage();
    businessBankAccComponentsPage = await businessBankAccComponentsPage.goToPage(navBarPage);
  });

  it('should load BusinessBankAccs', async () => {
    expect(await businessBankAccComponentsPage.title.getText()).to.match(/Business Bank Accs/);
    expect(await businessBankAccComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete BusinessBankAccs', async () => {
    const beforeRecordsCount = (await isVisible(businessBankAccComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(businessBankAccComponentsPage.table);
    businessBankAccUpdatePage = await businessBankAccComponentsPage.goToCreateBusinessBankAcc();
    await businessBankAccUpdatePage.enterData();

    expect(await businessBankAccComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(businessBankAccComponentsPage.table);
    await waitUntilCount(businessBankAccComponentsPage.records, beforeRecordsCount + 1);
    expect(await businessBankAccComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await businessBankAccComponentsPage.deleteBusinessBankAcc();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(businessBankAccComponentsPage.records, beforeRecordsCount);
      expect(await businessBankAccComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(businessBankAccComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
