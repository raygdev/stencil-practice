import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'repo-list-item',
  styleUrl: 'repo-list-item.css'
})
export class RepoListItem {
  @Prop() name: string = '';

  @Prop() stargazersCount: number;

  @Prop() url: string;

  @State() hidden: boolean = true;

  handleHidden() {
    this.hidden = !this.hidden;
  }

  render() {
    return (
      <li class="repo-list-item" aria-controls={`${this.name}-url-disclosure`} aria-expanded={(!this.hidden).toString()} onClick={() => this.handleHidden()} >
          {this.name} (Stars: {this.stargazersCount})
        <p class="repo-url" id={`${this.name}-url-disclosure`} aria-hidden={(this.hidden).toString()}>
          <a href={this.url} target="_blank">
            {this.url}
          </a>
        </p>
      </li>
    );
  }
}
