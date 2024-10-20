import { Component, h, Prop } from '@stencil/core'

@Component({
    tag: 'signin-route',
    styleUrl: 'signin-route.css'
})
export class SigninRoute {
    @Prop() seterrors: (e: any) => void;

    @Prop() push: (url: string) => void
    render() {
        return (
            <div class='container'>
              <signin-form push={this.push} seterrors={this.seterrors}></signin-form>
            </div>
        )
    }
}