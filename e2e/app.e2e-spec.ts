import { MIYIYAKEPage } from './app.po';

describe('miyiyake App', () => {
  let page: MIYIYAKEPage;

  beforeEach(() => {
    page = new MIYIYAKEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
