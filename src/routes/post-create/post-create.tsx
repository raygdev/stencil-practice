import { Component, h, State, Prop, Fragment } from '@stencil/core'
import { createPost } from '../../api/posts/posts-service';
import { href } from 'stencil-router-v2';

@Component({
    tag: 'post-create',
    styleUrl: 'post-create.css'
})
export class PostCreate {
    @State() errors: { errors: [ { message: string, field?: string } ] };
    onSubmit = async (e) => {
        try {
            this.errors = null
            e.preventDefault()
            const note = (new FormData(e.target)).get('note') as never as string
            const createdPost = await createPost({ note })
            href(`/posts/${createdPost.id}`).onClick(e)
        } catch (error) {
            console.log(error)
            this.errors = error
        }
    }
    render() {
        return (
            <div class='container'>
                <h2>Create A Post</h2>
                <form onSubmit={this.onSubmit}>
                    <label class='form-label'>
                        Note
                        <textarea name='note' cols={20} rows={20}></textarea>
                    </label>
                    {this.errors && (
                        <Fragment>
                            <div>{this.errors.errors[0].field}</div>
                            <div>{this.errors.errors[0].message}</div>
                        </Fragment>
                    )}
                    <button class='btn'>Submit</button>
                </form>
            </div>
        )
    }
}