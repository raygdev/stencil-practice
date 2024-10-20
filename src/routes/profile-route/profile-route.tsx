import { Component, h, State } from "@stencil/core";
import { IUser } from "../../components";
import { getUser } from "../../api/users/user-service";

@Component({
    tag: 'profile-route',
    styleUrl: 'profile-route.css'
})
export class ProfileRoute {
    @State() user:IUser;
    @State() isReadOnly: boolean = true


    handleSubmit = (e) => {
        e.preventDefault()
        if(!this.isReadOnly) {
            const data = new FormData(e.target)
            const updatedUser = Object.fromEntries(data)
            console.log(data)
        }
        this.isReadOnly = !this.isReadOnly
    }

    toggleReadOnly = (e) => {
        if(this.isReadOnly) {
            e.preventDefault()
            this.isReadOnly = !this.isReadOnly
            return
        }
    }

    async componentWillLoad() {
        const user = await getUser()
        this.user = user
    }
    render() {
        const date = new Date(this.user.createdAt)
        const time = (date.toISOString()).split(":")[0].split("T")[0]
        return (
            <div class='container'>
                <h2 class='profile-heading'>Your Details</h2>
                <form method="post" onSubmit={this.handleSubmit}>
                    <label class='form-label'>
                      First Name
                      <input readOnly={this.isReadOnly} type="text" name="" id="" defaultValue={this.user.firstName} />
                    </label>
                    <label class='form-label'>
                      Last Name
                      <input defaultValue={this.user.lastName} readOnly={this.isReadOnly} type="text" />
                    </label>
                    <label class='form-label'>
                        Email
                        <input readOnly={this.isReadOnly} type="email" defaultValue={this.user.email}/>
                    </label>
                    <label class='form-label'>
                      Created On
                      <input readOnly={true} defaultValue={time} type="date" name="" id="" />
                    </label>
                    <button class='btn' onClick={this.toggleReadOnly}>{!this.isReadOnly ? "Submit" : "Edit"}</button>
                </form>
            </div>
        )
    }
}