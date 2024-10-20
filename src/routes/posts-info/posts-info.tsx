import { Component, h, Host, State } from '@stencil/core'
import { getAllPosts, IPost } from '../../api/posts/posts-service'
import { href } from 'stencil-router-v2';

@Component({
    tag: 'posts-info',
    styleUrl: 'posts-info.css'
})
export class PostInfo {
    @State() posts: IPost[];

    async componentWillLoad() {
        const posts = await getAllPosts()
        this.posts = posts
    }

    render() {
        if(!this.posts[0]) return (
          <Host>
              <h2 class='no-posts'>No Posts Found</h2>
              <a {...href('/posts/create')}>Create A Post</a>
          </Host>
        )
        return (
            <ul>
                {
                    this.posts.map(post => {
                        return (
                            <li>
                                <p>{post.note}</p>
                                {(new Date(post.createdAt)).toDateString()}
                                <a {...href(`/posts/${post.id}`)}>Go to post</a>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}
