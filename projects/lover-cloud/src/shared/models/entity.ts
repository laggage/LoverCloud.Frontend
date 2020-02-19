import { IEntity } from './ientity';
import {  IStatus, StatusImplement } from './IStatus';


export class Entity extends StatusImplement implements IEntity  {
   
    public id: string;


}
