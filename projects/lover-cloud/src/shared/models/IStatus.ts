type StatusType = 'none'|'clicked'|'deleting'|'error_delete'|'loading'|'error_load'|'updating'|'error_update';


export interface IStatus {
    status: StatusType;
}

export abstract class StatusImplement {

    protected _status: 'none'|'clicked'|'deleting'|'error_delete'|'loading'|'error_load'|'updating'|'error_update';
    protected _statusDescription: string;


    public get status() {
        return this._status;
    }

    public set status(value: StatusType) {
        if(this._status !== value)  {
            this._status = value;
        }
    }

    
    public get statusDescription() : string {
        return this._statusDescription;
    }
    
    public set statusDescription(v : string) {
        this._statusDescription = v;
    }
}
