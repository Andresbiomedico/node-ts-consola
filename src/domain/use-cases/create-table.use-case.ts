export interface CreateTableUseCase{
    execute:(options: CreateTableOptions) => string;
}

interface CreateTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase{

    constructor() { }

    execute({ base, limit = 10 } : CreateTableOptions) {
        let outPutMessage = '';
        for (let i = 1; i <= limit; i++) {
            outPutMessage += `${base} X ${i} = ${base * i}\n`;
        }

        return outPutMessage;
    }
}