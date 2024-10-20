import { Component, h , State, Prop } from "@stencil/core";
import { getPostById, IPost } from "../../api/posts/posts-service";

@Component({
    tag: 'post-info',
    styleUrl: 'post-info.css'
})
export class PostInfo {
    @Prop() id: any;

    @State() post: IPost;

    async componentWillLoad() {
        const post = await getPostById(this.id)
        this.post = post
    }

    render() {
        return (
            <div class="container">
                <h2>{this.post.note}</h2>
                <p>Date Created {(new Date(this.post.createdAt)).toDateString()}</p>
            </div>
        )
    }
}