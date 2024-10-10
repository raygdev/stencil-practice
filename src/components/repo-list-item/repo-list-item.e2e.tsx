import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe('repo-list-item e2e', () => {
  let page: E2EPage;
  let el: E2EElement;
  beforeAll(async () => {
    page = await newE2EPage({ html: '<repo-list-item></repo-list-item>'})
    el = await page.find('repo-list-item');
    el.setProperty('name', "something");
    el.setProperty('stargazersCount', 1);
    el.setProperty('url', "http://api.example.com")
    await page.waitForChanges()
  })
  
  it('should toggle aria-expanded when button is clicked', async () => {
    const li = await el.find('li')
    li.click()
    await page.waitForChanges()
    expect(li.getAttribute('aria-expanded')).toEqual('true')
  })

  it('should have an anchor element with a url', async () => {
    const anchor = await el.find('a')
    expect(anchor.textContent).toEqual('http://api.example.com')
  })

  it('should have a visible p element with aria-hidden="false"', async () => {
    const p = await el.find('p')
    expect(p.getAttribute('aria-hidden')).toEqual('false')
    expect(await p.isVisible()).toBe(true)
  })

  it('should toggle aria-expanded="true" to false', async () => {
    const li = await el.find('li')
    li.click()
    await page.waitForChanges()
    expect(li.getAttribute('aria-expanded')).toEqual('false')
  })

  it('should not have a visible p element when aria-hidden="true"', async () => {
    // find the element
    const p = await el.find('p')
    // wait for it to be hidden (transition is .5s so there is a delay)
    await page.waitForSelector('p', { hidden: true })
    expect(p.getAttribute('aria-hidden')).toEqual('true')
    expect(await p.isVisible()).toBe(false)
  })

  it('should have an anchor element that is not visible when parent has aria-hidden="true"', async () => {
    const anchor = await el.find('a')
    expect(await anchor.isVisible()).toBe(false)
  })


})