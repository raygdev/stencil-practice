import { Component, h, State } from "@stencil/core";
import { createUser } from "../../api/users/user-service";


@Component({
    tag: 'signup-route',
    styleUrl: 'signup-route.css'
})
export class SignUpRoute {
  @State() errors: { errors: [{ message: string, field?: string }] } | null;
  @State() loading: boolean = false
  @State() success: boolean = false;

   handleSubmit = async (e) => {
    this.loading = true
    if(this.errors) {
        this.errors =  null
    }
    e.preventDefault()

    const data = new FormData(e.target)
    const newuser = Object.fromEntries(data)

    await createUser(newuser)
      .then(success => {
        e.target.reset()
        this.success = success
    })
      .catch(e => this.errors = e)
      .finally(() => this.loading = false)
    
   }

    render() {
        return (
            <div class='form-control'>
                <form method='post' encType="application/json" onSubmit={(e) => this.handleSubmit(e)}>
                    <h3>Sign Up</h3>
                    <label class='form-label'>
                        First Name
                        <input type="text" name='firstName'/>
                    </label>
                    {this.errors && 
                      this.errors.errors?.filter(e => e.field === 'firstName')
                      .map(e => (
                        <p class='error'>{e.message}</p>
                      ))
                    }
                    <label class='form-label'>
                        Last Name
                        <input type="text" name='lastName' />
                    </label>
                    {
                        this.errors &&
                        this.errors.errors?.filter(e => e.field === 'lastName')
                        .map(e => (
                            <p class='error'>{e.message}</p>
                        ))
                    }
                    <label class='form-label'>
                        Email
                        <input type="email" name='email'/>
                    </label>
                    {
                        this.errors &&
                        this.errors.errors?.filter(e => e.field === 'email')
                        .map(e => (
                            <p class="error">{e.message}</p>
                        ))
                    }
                    <label class='form-label'>
                        Password
                        <input type="password" name='password'/>
                    </label>
                    {
                        this.errors &&
                        this.errors.errors?.filter(e => e.field === 'password')
                        .map(e => (
                            <p class="error">{e.message}</p>
                        ))
                    }
                    <button disabled={this.loading} class='btn'>Submit</button>
                </form>
            </div>
        )
    }
}