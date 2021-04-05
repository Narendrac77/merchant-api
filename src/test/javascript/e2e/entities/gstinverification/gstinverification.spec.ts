import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import GstinverificationComponentsPage from './gstinverification.page-object';
import GstinverificationUpdatePage from './gstinverification-update.page-object';
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

describe('Gstinverification e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let gstinverificationComponentsPage: GstinverificationComponentsPage;
  let gstinverificationUpdatePage: GstinverificationUpdatePage;

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
    gstinverificationComponentsPage = new GstinverificationComponentsPage();
    gstinverificationComponentsPage = await gstinverificationComponentsPage.goToPage(navBarPage);
  });

  it('should load Gstinverifications', async () => {
    expect(await gstinverificationComponentsPage.title.getText()).to.match(/Gstinverifications/);
    expect(await gstinverificationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Gstinverifications', async () => {
    const beforeRecordsCount = (await isVisible(gstinverificationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(gstinverificationComponentsPage.table);
    gstinverificationUpdatePage = await gstinverificationComponentsPage.goToCreateGstinverification();
    await gstinverificationUpdatePage.enterData();

    expect(await gstinverificationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(gstinverificationComponentsPage.table);
    await waitUntilCount(gstinverificationComponentsPage.records, beforeRecordsCount + 1);
    expect(await gstinverificationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await gstinverificationComponentsPage.deleteGstinverification();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(gstinverificationComponentsPage.records, beforeRecordsCount);
      expect(await gstinverificationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(gstinverificationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
