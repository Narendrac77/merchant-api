import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PanverificationComponentsPage from './panverification.page-object';
import PanverificationUpdatePage from './panverification-update.page-object';
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

describe('Panverification e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let panverificationComponentsPage: PanverificationComponentsPage;
  let panverificationUpdatePage: PanverificationUpdatePage;

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
    panverificationComponentsPage = new PanverificationComponentsPage();
    panverificationComponentsPage = await panverificationComponentsPage.goToPage(navBarPage);
  });

  it('should load Panverifications', async () => {
    expect(await panverificationComponentsPage.title.getText()).to.match(/Panverifications/);
    expect(await panverificationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Panverifications', async () => {
    const beforeRecordsCount = (await isVisible(panverificationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(panverificationComponentsPage.table);
    panverificationUpdatePage = await panverificationComponentsPage.goToCreatePanverification();
    await panverificationUpdatePage.enterData();

    expect(await panverificationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(panverificationComponentsPage.table);
    await waitUntilCount(panverificationComponentsPage.records, beforeRecordsCount + 1);
    expect(await panverificationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await panverificationComponentsPage.deletePanverification();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(panverificationComponentsPage.records, beforeRecordsCount);
      expect(await panverificationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(panverificationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
