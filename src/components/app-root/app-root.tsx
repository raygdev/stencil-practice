import { Component, h, State } from '@stencil/core';
import { createRouter, Route, href, Router, match } from 'stencil-router-v2'
import { authService } from '../../services/auth';
import { IUser } from '../../api/users/user-service';

const Router = createRouter()

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @State() user: IUser | null;
  @State() isLoggedIn: boolean;
  @State() errors: { errors: [{ message: string, field?: string}]} | null;

  onAuthChange = () => {
    this.isLoggedIn = authService.isLoggedIn()
    this.user = authService.getUser()
  }

  setErrors = (e) => {
    console.log("Logging", e)
    this.errors = e
  }

  componentWillLoad() {
    this.isLoggedIn = authService.isLoggedIn()
    this.user = authService.getUser()
    authService.addAuthChangeListener(this.onAuthChange)
  }

  disconnectedCallback() {
    authService.removeAuthChangeListener(this.onAuthChange)
  }

  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/profile/:name" component="repos-profile" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
