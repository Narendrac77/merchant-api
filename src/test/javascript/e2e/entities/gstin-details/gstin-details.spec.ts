import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import GstinDetailsComponentsPage from './gstin-details.page-object';
import GstinDetailsUpdatePage from './gstin-details-update.page-object';
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

describe('GstinDetails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let gstinDetailsComponentsPage: GstinDetailsComponentsPage;
  let gstinDetailsUpdatePage: GstinDetailsUpdatePage;

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
    gstinDetailsComponentsPage = new GstinDetailsComponentsPage();
    gstinDetailsComponentsPage = await gstinDetailsComponentsPage.goToPage(navBarPage);
  });

  it('should load GstinDetails', async () => {
    expect(await gstinDetailsComponentsPage.title.getText()).to.match(/Gstin Details/);
    expect(await gstinDetailsComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete GstinDetails', async () => {
    const beforeRecordsCount = (await isVisible(gstinDetailsComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(gstinDetailsComponentsPage.table);
    gstinDetailsUpdatePage = await gstinDetailsComponentsPage.goToCreateGstinDetails();
    await gstinDetailsUpdatePage.enterData();

    expect(await gstinDetailsComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(gstinDetailsComponentsPage.table);
    await waitUntilCount(gstinDetailsComponentsPage.records, beforeRecordsCount + 1);
    expect(await gstinDetailsComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await gstinDetailsComponentsPage.deleteGstinDetails();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(gstinDetailsComponentsPage.records, beforeRecordsCount);
      expect(await gstinDetailsComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(gstinDetailsComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
