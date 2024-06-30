export interface User{
    userId: string,
    firstname: string,
    lastname: string,
    phoneNumber: string,
    address: string,
    email: string,
    password: string,
    createdAt: string
}

export interface LoginDetails{
    email: string,
    password: string
}