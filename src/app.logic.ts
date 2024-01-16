import fs from 'fs'
import { yarg } from './config/plugins/yargs.plugin';

const { b:base, l:limit, s:show } = yarg


let outPutMessage: string = '';
// const base: number = 5;
const headerMessage: string = `
==================================================
                Tabla del ${base}
==================================================\n
`

for (let i = 1; i <= limit; i++) {
   outPutMessage += `${base} X ${i} = ${base * i}\n`;
}

outPutMessage += headerMessage + outPutMessage;
if (show) console.log(outPutMessage);

const outputPath = `outputs/`
// la recusividad es por si el directorio tiene otras carptetas para crear ejemplo outputs/folder1/folder2/folder3
// crearia todas las  subfolders. por eso va el recursive:true
fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outPutMessage)