export class UserLoginMetadata {
    public client_id?: string = 'jwt-client';
    public scope?: string = 'LoverCloud openid profile';
    public username: string;
    public password: string;
    public grant_type?: string = 'password';
}
