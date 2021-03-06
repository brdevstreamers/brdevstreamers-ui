
export interface UserInteractionModel {
    user_login: string;
    date: Date;
    target_user: string;
    interaction_fingerprint: string;
    type: UserInteractionType;
}

export enum UserInteractionType {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    STREAM_CLICK = "STREAM_CLICK",
    VOD_CLICK = "VOD_CLICK",
}