import { Component, h, Prop, Fragment} from '@stencil/core'
import { href } from 'stencil-router-v2';
import { IUser } from '../../api/users/user-service'

@Component({
    tag: 'user-route',
    styleUrl: './user-route.css'
})
export class UserRoute {
    @Prop() user: IUser;
    render() {
        return (
            <Fragment>
              <h2>Welcome, {this.user.firstName}</h2>
              <div>
                <p>Whenever you would like, please <a {...href('/posts/create')}>create a post</a></p>
              </div>
            </Fragment>
        )
    }
}