import { User } from "./user"

export interface Register {
    username: string,
    email: string,
    password: string
}

export interface Login {
    username: string,
    password: string
}

export interface LoginResponse {
    token: Token,
    user: User
}

interface Token {
    jwt: string
}