import { IUser } from "../api/users/user-service"

 type AuthChangeListener = () => void
 
 
 class AuthService  {

   private listeners: AuthChangeListener[] = []
   async signin(credentials: { email: string, password: string}) {
    const res = await fetch('http://localhost:8080/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

    if(!res.ok) throw await res.json()

    const user = await res.json()
    localStorage.setItem('user', JSON.stringify(user))
    this.notifyAuthChange()
   }

   async logout() {
    this.clearToken()
    this.notifyAuthChange()
   }

   addAuthChangeListener(listener: AuthChangeListener) {
    this.listeners.push(listener)
   }

   removeAuthChangeListener(listener: AuthChangeListener) {
    this.listeners = this.listeners.filter(l => l !== listener)
   }

   private notifyAuthChange() {
    this.listeners.forEach((listener: AuthChangeListener) => listener())
   }

   isLoggedIn(){
    const token = this.getToken()
    return !!token && !this.isTokenExpired(token)
   }

   private isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const expiration = payload.exp * 1000
        return Date.now() > expiration
    } catch (error) {
        return true
    }
   }

   getToken(): string | null {
     const token = (JSON.parse(localStorage.getItem('user')))?.token
     return token
   }

   private clearToken() {
     localStorage.removeItem('user')
   }

   getUser(): IUser {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user) {
        delete user.token
        return user
    }
    return null
   }


}

export const authService =  new AuthService()