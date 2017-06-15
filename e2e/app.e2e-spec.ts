import { ChpaTestPage } from './app.po';

describe('chpa-test App', () => {
  let page: ChpaTestPage;

  beforeEach(() => {
    page = new ChpaTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
