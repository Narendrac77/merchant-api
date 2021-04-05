import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FileModelComponentsPage from './file-model.page-object';
import FileModelUpdatePage from './file-model-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('FileModel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fileModelComponentsPage: FileModelComponentsPage;
  let fileModelUpdatePage: FileModelUpdatePage;

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
    fileModelComponentsPage = new FileModelComponentsPage();
    fileModelComponentsPage = await fileModelComponentsPage.goToPage(navBarPage);
  });

  it('should load FileModels', async () => {
    expect(await fileModelComponentsPage.title.getText()).to.match(/File Models/);
    expect(await fileModelComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete FileModels', async () => {
    const beforeRecordsCount = (await isVisible(fileModelComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(fileModelComponentsPage.table);
    fileModelUpdatePage = await fileModelComponentsPage.goToCreateFileModel();
    await fileModelUpdatePage.enterData();

    expect(await fileModelComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(fileModelComponentsPage.table);
    await waitUntilCount(fileModelComponentsPage.records, beforeRecordsCount + 1);
    expect(await fileModelComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await fileModelComponentsPage.deleteFileModel();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(fileModelComponentsPage.records, beforeRecordsCount);
      expect(await fileModelComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(fileModelComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
