import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PanDetailsComponentsPage from './pan-details.page-object';
import PanDetailsUpdatePage from './pan-details-update.page-object';
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

describe('PanDetails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let panDetailsComponentsPage: PanDetailsComponentsPage;
  let panDetailsUpdatePage: PanDetailsUpdatePage;

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
    panDetailsComponentsPage = new PanDetailsComponentsPage();
    panDetailsComponentsPage = await panDetailsComponentsPage.goToPage(navBarPage);
  });

  it('should load PanDetails', async () => {
    expect(await panDetailsComponentsPage.title.getText()).to.match(/Pan Details/);
    expect(await panDetailsComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PanDetails', async () => {
    const beforeRecordsCount = (await isVisible(panDetailsComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(panDetailsComponentsPage.table);
    panDetailsUpdatePage = await panDetailsComponentsPage.goToCreatePanDetails();
    await panDetailsUpdatePage.enterData();

    expect(await panDetailsComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(panDetailsComponentsPage.table);
    await waitUntilCount(panDetailsComponentsPage.records, beforeRecordsCount + 1);
    expect(await panDetailsComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await panDetailsComponentsPage.deletePanDetails();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(panDetailsComponentsPage.records, beforeRecordsCount);
      expect(await panDetailsComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(panDetailsComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
