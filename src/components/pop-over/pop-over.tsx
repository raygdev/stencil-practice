import { Component, h, Prop, Element } from "@stencil/core";

@Component({
    tag: 'pop-over',
    styleUrl: 'pop-over.css'
})

export class PopOver {
    @Prop() isVisible: boolean
    @Prop() ariaLive: boolean;
    @Element() el: HTMLElement;
    @Prop() triggerElement: HTMLButtonElement
    @Prop() classes: string
    componentDidLoad() {
        const button = this.el.querySelector('button')
        button.focus()
    }

    disconnectedCallback() {
        this.triggerElement.focus()
    }

    render() {
        return (
            <div class={this.classes} id='popover' role="dialog" >
                <slot></slot>
            </div>
        )
    }
}