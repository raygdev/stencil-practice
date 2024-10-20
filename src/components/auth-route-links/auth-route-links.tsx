import { Component, h, Prop, State, Element } from '@stencil/core'
import { authLinks } from './auth-links';
import { href } from 'stencil-router-v2';
import { IUser } from '../../components';
import { authService } from '../../services/auth';


@Component({
    tag: "auth-route-links",
    styleUrl: "auth-route-links.css",
})
export class AuthRouteLinks {

    @Prop() isLogged: boolean;
    @Prop() user: IUser;
    @Element() el: HTMLElement;
    @State() isActive: boolean

    togglePopOver() {
        this.isActive = !this.isActive
    }

    handleClick = (e) => {
        this.togglePopOver()
        if(!this.isActive) {
            e.target.focus()
        } else {
            setTimeout(() => {
                (this.el.querySelector('.close-btn') as HTMLButtonElement).focus()
            },10)
        }
    }

    handleLogOut() {
        authService.logout()
    }

    handleClosePopOver = () => {
        this.isActive = false;
        (this.el.querySelector('.badge') as HTMLButtonElement).focus() 
    }


    normalizeInitials() {
        const initials = this.user.firstName?.substring(0,1).toUpperCase() + 
        this.user.lastName?.substring(0,1).toUpperCase()

        return initials
    }

    render() {
        const initials = this.normalizeInitials()
        return this.isLogged && (
            <header>
                <nav class='nav'>
                    <ul class='nav-list'>
                        {
                            authLinks.map(link => {
                                return (
                                    <a class='link' {...href(link.url)}>{link.name}</a>
                                )
                            })
                        }
                    </ul>
                </nav>
                <div class='wrapper'>
                    <button class='badge' onClick={this.handleClick}>
                        {initials}
                    </button>
                    <pop-over classes={`pop-over ${this.isActive && 'active'}`}>
                        <div class='button-wrapper'>
                            <button onClick={this.handleClosePopOver} class='close-btn'>X</button>
                            <button onClick={this.handleLogOut} class='logout-btn'>Logout</button>
                        </div>
                    </pop-over>
                </div>
            </header>
        )
        
    }
}