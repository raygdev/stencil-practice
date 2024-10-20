import { authService } from "../../services/auth"

export interface IUser {
    id: number
    firstName: string
    lastName: string
    email: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}

const BASE_URL = 'http://localhost:8080/api'

export const getUser = async (): Promise<IUser> => {
    const res = await fetch(`${BASE_URL}/users/get`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authService.getToken()}`
        }
    })

    if(!res.ok) {
        if(res.status === 401) {
            authService.logout()
        }
        throw await res.json()
    }

    const user = await res.json()

    return user
}

export const deleteUser = async () => {
    const res = await fetch(`${BASE_URL}/users/delete`, {
        headers: {
            "Content-Type": "application/json",
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

export const createUser = async (user) => {
    const res = await fetch(`${BASE_URL}/users/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    if(!res.ok) throw await res.json()

    // @ts-ignore
    const data = await res.json()

    return true
}