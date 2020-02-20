import { IEntity } from './ientity';
import { StatusImplement } from './IStatus';


export class Entity extends StatusImplement implements IEntity  {
    public id: string;
}
