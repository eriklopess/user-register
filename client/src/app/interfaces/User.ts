
export interface IUser {
    id: string;
    name: string;
    email: string;
    birthDate: string;
    photoUrl: string;
}

export interface IUsersResponse {
    info: {
        limit: number;
        page: number;
        totalPages: number;
        nextPage: string
    },
    data: IUser[];
}