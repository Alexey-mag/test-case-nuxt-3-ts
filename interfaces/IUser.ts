export interface IUser {
    id: number | null,
    level: 'worker' | 'boss',
    firstName: string,
    lastName: string,
    phone?: string,
}