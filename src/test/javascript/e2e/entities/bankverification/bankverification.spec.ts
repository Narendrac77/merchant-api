import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BankverificationComponentsPage from './bankverification.page-object';
import BankverificationUpdatePage from './bankverification-update.page-object';
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

describe('Bankverification e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bankverificationComponentsPage: BankverificationComponentsPage;
  let bankverificationUpdatePage: BankverificationUpdatePage;

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
    bankverificationComponentsPage = new BankverificationComponentsPage();
    bankverificationComponentsPage = await bankverificationComponentsPage.goToPage(navBarPage);
  });

  it('should load Bankverifications', async () => {
    expect(await bankverificationComponentsPage.title.getText()).to.match(/Bankverifications/);
    expect(await bankverificationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Bankverifications', async () => {
    const beforeRecordsCount = (await isVisible(bankverificationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(bankverificationComponentsPage.table);
    bankverificationUpdatePage = await bankverificationComponentsPage.goToCreateBankverification();
    await bankverificationUpdatePage.enterData();

    expect(await bankverificationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(bankverificationComponentsPage.table);
    await waitUntilCount(bankverificationComponentsPage.records, beforeRecordsCount + 1);
    expect(await bankverificationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await bankverificationComponentsPage.deleteBankverification();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(bankverificationComponentsPage.records, beforeRecordsCount);
      expect(await bankverificationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(bankverificationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
