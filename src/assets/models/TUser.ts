export type TUser = {
    email: string;
    password: string;
    nickname: string;
    post_ids?: string[]; // my post id list
    reply_ids?: string[]; // my reply id list
}