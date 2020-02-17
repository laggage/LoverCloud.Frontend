import { IEntity } from './ientity';

export class Entity implements IEntity {
    public id: string;
    public status: 'none'|'deleting'|'error_delete'|'loading'|'error_load'|'updating'|'error_update' = 'none';
}
