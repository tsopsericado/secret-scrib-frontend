
interface ApiRes {
    data: {
        user: IUser,
        token: string,
    }
}

interface IUser {
    _id: string;
    // id: string;
    email: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    password?: string;
}

interface IBucket {
    _id: string;
    title: string;
    message_ids: string[];
    creator_id: string;
}

interface IMessage {
    _id: string;
    bucket_id: string;
    content: string;
    createdAt: Date | string;
}

export type { ApiRes, IUser, IBucket, IMessage };
