"use server"

interface User{
    name: string;
    email: string;
}

export async function get(): Promise<User[]> {
    const response = await fetch(`${process.env.APP_URL}/users`);
    const user = await response.json();
    console.log(user);
    return user.data;
}