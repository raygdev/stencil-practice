import { Component, h, Prop, State } from "@stencil/core";
import { authService } from "../../services/auth";


@Component({
    tag: 'signin-form',
    styleUrl: 'signin-form.css'
})
export class SigninForm {

    @Prop() seterrors: (e: any) => void;

    @Prop() push: (url: string) => void;

    @State() loading: boolean = false

    handleSubimt(e) {
        this.loading = true
        e.preventDefault()
        const form = new FormData(e.target)
        const data = Object.fromEntries(form.entries()) as { email: string, password: string }

        authService.signin(data)
         .then(() => {
            this.push('/user')
         })
         .catch(e => this.seterrors(e))
         .finally(() => this.loading = false)

        
    }
    render() {
        return (
            <div class='form-control'>
                <form encType="application/json" onSubmit={(e) => this.handleSubimt(e)}>
                    <h2 class='form-header'>Sign In</h2>
                    <label class='form-label'>
                        Email
                        <input type="email" name="email" />
                    </label>
                    <label class='form-label'>
                        Password
                        <input type="password" name="password" />
                    </label>
                    <button class='btn' disabled={this.loading}>Submit</button>
                </form>
            </div>
        )
    }
}