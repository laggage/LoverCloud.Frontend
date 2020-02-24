type Status = 'none'|'clicked'|'deleting'|'error_delete'|'loading'|'loaded'|'error_load'|'updating'|'error_update'|'active'|'inactive';


export interface IStatus {
    status: Status;
}

export abstract class StatusImplement {

    protected _status: Status;
    protected _statusDescription: string;
    private _progress : number;
   
    public get status() {
        return this._status;
    }

    public set status(value: Status) {
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

    public get progress() : number {
        return this._progress;
    }
    public set progress(v : number) {
        this._progress = v;
    }
}
