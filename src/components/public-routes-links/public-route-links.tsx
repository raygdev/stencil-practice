import { Component, h, Prop } from "@stencil/core";
import { publicLinks } from "./public-links";

@Component({
    tag: "public-route-links",
    styleUrl: 'public-route-links.css'
})
export class PublicRouteLinks {
    @Prop() isLogged: boolean;

    render() {
        return !this.isLogged && (
            <header>
                <nav>
                    <ul>
                        {
                            publicLinks.map(link => {
                                return (
                                    <stencil-route-link url={link.url}>
                                        <button class='public-link'>{link.name}</button>
                                    </stencil-route-link>
                                )
                            })
                        }
                    </ul>
                </nav>
            </header>
        )
    }
}