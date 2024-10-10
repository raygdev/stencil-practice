import { Component, Prop, State, h, Fragment } from '@stencil/core';
import { MatchResults } from '@stencil-community/router';

interface Repo {
  name: string;
  stargazers_count: number;
  url: string;
}

interface RepoResponse {
  name: string
  stargazers_count: number
  html_url: string
}

async function getRepos(username = 'facebook'): Promise<Repo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await res.json() as RepoResponse[];
    const repos = data?.map((repo) => ({
      name: repo.name,
      stargazers_count: repo.stargazers_count,
      url: repo.html_url
    }));
    return repos;
  } catch (e) {
    console.log(e);
  }
}

@Component({
  tag: 'repos-profile',
  styleUrl: 'app-profile.css',
  shadow: true,
})
export class RepoProfile {
  @Prop() match: MatchResults;

  @State() repos: Repo[] = [{ name: 'something', stargazers_count: 1, url: 'https://github.com/ragdev/repair-order-tracker' }];

  @State() submittedUsername: string = '';

  @State() username: string = 'facebook';

  async handleClick() {
    this.submittedUsername = this.username;
    const repos = await getRepos(this.submittedUsername);
    this.repos = repos;
  }

  handleChange(e) {
    this.username = e.target.value;
  }

  // async componentWillLoad(): Promise<any> {
  //   const repos = await getRepos(this.username);
  //   this.repos = repos;
  // }

  render() {
    if (this.match && this.match.params.name) {
      const list = this.repos?.map(repo => <repo-list-item name={repo.name} stargazersCount={repo.stargazers_count} url={repo.url}></repo-list-item>);
      return (
        <Fragment>
          <input defaultValue={this.username} onInput={e => this.handleChange(e)} type="text" />
          <button onClick={() => this.handleClick()}>Submit</button>
          <ul class={'repos-list'}>{list}</ul>
        </Fragment>
      );
    }
  }
}
