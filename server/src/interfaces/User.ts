export interface IUser {
    id?: number;
    photoUrl: string;
    birthDate: Date;
    name: string;
    email: string;
    password: string;
}

export interface IUserSelect {
    id?: number;
    photoUrl: string;
    birthDate: Date;
    name: string;
    email: string;
    password?: string;
}

export interface IUserUpdate {
    photoUrl?: string;
    birthDate?: Date;
    name?: string;
    email?: string;
    password?: string;
}
