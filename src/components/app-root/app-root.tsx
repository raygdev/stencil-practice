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
        {this.isLoggedIn && <auth-route-links user={this.user} isLogged={this.isLoggedIn}></auth-route-links>}
        <public-route-links isLogged={this.isLoggedIn}></public-route-links>
        {this.errors &&  (
          <div>
            <ul>
              {
                this.errors.errors.map(e => {
                  return (
                    <li>
                      <p>{e.message}</p>
                      {e.field && <p>{e.field}</p>}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )}

        <main>
          <Router.Switch>
              <Route path={'/'}>
                <app-home></app-home>
                <a {...href('/signin')}>Sign In</a>
                <a {...href('/signup')}>Sign Up</a>
              </Route>
              <Route path={'/signin'}>
                <signin-route push={Router.push} seterrors={this.setErrors}></signin-route>
              </Route>
              <Route path={'/signup'}>
                <signup-route></signup-route>
              </Route>
              {this.isLoggedIn &&
              <Route path={'/user'} render={() => {
                return <user-route user={this.user} ></user-route>
              }} />
              ||
              <Route path={'/user'} to={'/signin'} />
              }
              {this.isLoggedIn &&
              <Route path={'/profile'}  render={() => {
                return <profile-route></profile-route>
              }} />
              ||
              <Route path={'/profile'} to={'/signin'} />
              }
              {this.isLoggedIn &&
              <Route path={'/posts'} render={() => {
                return <posts-info></posts-info>
              }} />
              ||
              <Route path={'/posts'} to={"/signin"} />
              }
              {this.isLoggedIn &&
              <Route path={'/posts/create'} render={() => {
                return <post-create></post-create>
              }}/>
              ||
              <Route path={'/posts/create'} to={'/signin'} />
              }
              {this.isLoggedIn &&
              <Route path={match('/posts/:id')}  render={({ id }) => {
                return <post-info id={id} ></post-info>
              }} />
              ||
              <Route path={match('/posts/:id')} to={'/signin'} />
              }
          </Router.Switch>
        </main>
      </div>
    );
  }
}
