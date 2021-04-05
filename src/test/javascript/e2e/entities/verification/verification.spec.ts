import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VerificationComponentsPage from './verification.page-object';
import VerificationUpdatePage from './verification-update.page-object';
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

describe('Verification e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let verificationComponentsPage: VerificationComponentsPage;
  let verificationUpdatePage: VerificationUpdatePage;

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
    verificationComponentsPage = new VerificationComponentsPage();
    verificationComponentsPage = await verificationComponentsPage.goToPage(navBarPage);
  });

  it('should load Verifications', async () => {
    expect(await verificationComponentsPage.title.getText()).to.match(/Verifications/);
    expect(await verificationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Verifications', async () => {
    const beforeRecordsCount = (await isVisible(verificationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(verificationComponentsPage.table);
    verificationUpdatePage = await verificationComponentsPage.goToCreateVerification();
    await verificationUpdatePage.enterData();

    expect(await verificationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(verificationComponentsPage.table);
    await waitUntilCount(verificationComponentsPage.records, beforeRecordsCount + 1);
    expect(await verificationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await verificationComponentsPage.deleteVerification();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(verificationComponentsPage.records, beforeRecordsCount);
      expect(await verificationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(verificationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
