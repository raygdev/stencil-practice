import { Component, h, State, Prop } from '@stencil/core'

@Component({
    tag: 'post-create',
    styleUrl: 'post-create.css'
})
export class PostCreate {
    render() {
        return (
            <h2>
                Post Create Page
            </h2>
        )
    }
}