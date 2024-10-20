import { authService } from "../../services/auth"

export interface IPost {
    id: number
    note: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    userId: number
}

const BASE_URL = 'http://localhost:8080/api'

export const createPost = async (post: { note: string }): Promise<IPost> => {
    const res = await fetch(`${BASE_URL}/posts/create`, {
        method:"POST",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${authService.getToken()}`
        },
        body: JSON.stringify(post)
    })

    if(!res.ok) {
        if(res.status === 401) {
            authService.logout()
        }
        throw await res.json()
    }

    const newPost = await res.json()

    return newPost
}

export const deletePost = async (id: number): Promise<boolean> => {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json",
            "Authorization": `Bearer ${authService.getToken()}`
        }
    })

    if(!res.ok) {
        if(res.status === 401) {
            authService.logout()
        }
        throw await res.json()
    }

    return res.status === 204
}

export const getPostById = async (id: number): Promise<IPost> => {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${authService.getToken()}`
        }
    })
    
    if(!res.ok) {
        if(res.status === 401) {
            authService.logout()
        }
        throw await res.json()
    }

    const post = await res.json()

    return post
}

export const getAllPosts = async (): Promise<IPost[]> => {
  const res = await fetch(`${BASE_URL}/posts/get`, {
    headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${authService.getToken()}`
    }
  })

  if(!res.ok) {
    if(res.status === 401) {
        authService.logout()
    }
    throw await res.json()
  }

  const posts = await res.json()

  return posts 
}