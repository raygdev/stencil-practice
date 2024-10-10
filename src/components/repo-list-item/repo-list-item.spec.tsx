import { RepoListItem } from "./repo-list-item";
import { newSpecPage } from "@stencil/core/testing";
import { h } from "@stencil/core";

describe('repo-list-item', () => {
    // beforeEach(() => {
    //     global.fetch = jest.fn(() => {
    //         Promise.resolve({
    //             ok: true,
    //             json: () => Promise.resolve([{name: 'Something', stargazersCount: 1, url: 'http://api.example.com'}])
    //         })
    //     }) as jest.Mock
    // })

    it('should render props appropriately', async () => {
        const page = await newSpecPage({
            components: [RepoListItem],
            template: () => <repo-list-item name='something' stargazersCount={1} url={'http://api.example.com'}></repo-list-item>
        })
        expect(page.root.textContent).toEqual('something (Stars: 1)http://api.example.com')
    })

    it('should initially have aria-expanded="false"', async () => {
        const page = await newSpecPage({
            components: [RepoListItem],
            template: () => <repo-list-item name='something' stargazersCount={1} url={'http://api.example.com'}></repo-list-item> 
        })

        expect(page.root.firstElementChild.getAttribute('aria-expanded')).toEqual('false')
    })

    it('should show aria-expanded="true" when li is clicked', async () => {
        const page = await newSpecPage({
            components: [RepoListItem],
            template: () => <repo-list-item name='something' stargazersCount={1} url={'http://api.example.com'}></repo-list-item> 
        })
        const li = page.body.querySelector('li')
        li.click()
        console.log(li)
        expect(page.root.firstElementChild.getAttribute('aria-expanded')).toEqual('true')
    })

    it.todo('should show aria-hidden="false" when aria-expanded="true"')

})