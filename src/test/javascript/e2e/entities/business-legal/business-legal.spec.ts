import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BusinessLegalComponentsPage from './business-legal.page-object';
import BusinessLegalUpdatePage from './business-legal-update.page-object';
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

describe('BusinessLegal e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let businessLegalComponentsPage: BusinessLegalComponentsPage;
  let businessLegalUpdatePage: BusinessLegalUpdatePage;

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
    businessLegalComponentsPage = new BusinessLegalComponentsPage();
    businessLegalComponentsPage = await businessLegalComponentsPage.goToPage(navBarPage);
  });

  it('should load BusinessLegals', async () => {
    expect(await businessLegalComponentsPage.title.getText()).to.match(/Business Legals/);
    expect(await businessLegalComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete BusinessLegals', async () => {
    const beforeRecordsCount = (await isVisible(businessLegalComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(businessLegalComponentsPage.table);
    businessLegalUpdatePage = await businessLegalComponentsPage.goToCreateBusinessLegal();
    await businessLegalUpdatePage.enterData();

    expect(await businessLegalComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(businessLegalComponentsPage.table);
    await waitUntilCount(businessLegalComponentsPage.records, beforeRecordsCount + 1);
    expect(await businessLegalComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await businessLegalComponentsPage.deleteBusinessLegal();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(businessLegalComponentsPage.records, beforeRecordsCount);
      expect(await businessLegalComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(businessLegalComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
