import { UserInterface  } from "../user/user-interface";

export interface TodoInterface {
    _id?: any;
    id: number;
    title: string;
    desc: string;
    tags: string[];
    created_date: string;
    updated_date?: string;
    is_completed: boolean;
    create_by?: UserInterface;
    like_by?: string[];
    retweet_by?: string[]
}