export class Token {
    public access_token: string;
    public token_type: string;
    // token过期时间, 单位s
    public expires_in: number;  
    public scope: string;
    public authenticationTime: Date = new Date();

    /**
     * 验证token是否过期
     */
    public isExpired(): boolean {
        if(!(this.access_token && this.access_token.length > 0)) {
            return false;
        }
        if(typeof this.authenticationTime === 'string') {
            this.authenticationTime = new Date(this.authenticationTime);
        }
        if(typeof this.expires_in === 'string') {
            this.expires_in = Number.parseInt(this.expires_in);
        }

        const now = new Date();
        const timeGap = (now.valueOf() - this.authenticationTime.valueOf())/1000; // ms/1000 => s
        return timeGap > this.expires_in;
    }
}
