import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BuisnessInfoComponentsPage from './buisness-info.page-object';
import BuisnessInfoUpdatePage from './buisness-info-update.page-object';
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

describe('BuisnessInfo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let buisnessInfoComponentsPage: BuisnessInfoComponentsPage;
  let buisnessInfoUpdatePage: BuisnessInfoUpdatePage;

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
    buisnessInfoComponentsPage = new BuisnessInfoComponentsPage();
    buisnessInfoComponentsPage = await buisnessInfoComponentsPage.goToPage(navBarPage);
  });

  it('should load BuisnessInfos', async () => {
    expect(await buisnessInfoComponentsPage.title.getText()).to.match(/Buisness Infos/);
    expect(await buisnessInfoComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete BuisnessInfos', async () => {
    const beforeRecordsCount = (await isVisible(buisnessInfoComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(buisnessInfoComponentsPage.table);
    buisnessInfoUpdatePage = await buisnessInfoComponentsPage.goToCreateBuisnessInfo();
    await buisnessInfoUpdatePage.enterData();

    expect(await buisnessInfoComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(buisnessInfoComponentsPage.table);
    await waitUntilCount(buisnessInfoComponentsPage.records, beforeRecordsCount + 1);
    expect(await buisnessInfoComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await buisnessInfoComponentsPage.deleteBuisnessInfo();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(buisnessInfoComponentsPage.records, beforeRecordsCount);
      expect(await buisnessInfoComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(buisnessInfoComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
