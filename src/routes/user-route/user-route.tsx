import { Component, h, Prop} from '@stencil/core'
import { IUser } from '../../api/users/user-service'

@Component({
    tag: 'user-route',
    styleUrl: './user-route.css'
})
export class UserRoute {
    @Prop() user: IUser;
    render() {
        return (
            <h2>Welcome, {this.user.firstName}</h2>
        )
    }
}