export class JsonPatchOperation {
    constructor(
        public op:'test'|'remove'|'add'|'replace'|'move'|'copy',
        public path: string,
        public value: any,
        public from?: string
    ) {
    }
}

export class JsonPatchDocment {
    constructor(
        public opeartions: JsonPatchOperation[] = []) {
    }
}