import yargs  from 'yargs';
import { hideBin } from 'yargs/helpers'

// las opciones nos ayudan a configurar la bandera
//demanOption:se le indica a la badera que es requerido
//default:es el valor por defecto cuando no se envia la bandera 
// ejemplo de como se enviaria npx ts-node src/app.ts -b 67 -s solo con colocar la s el asume q es verdaero por q es de tipo boolean
export const yarg = yargs(hideBin(process.argv))    
    .option('b',{
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe:'Multiplication table base'
    })
    .option('l',{
        alias: 'limit',
        type: 'number',
        default: 10,
        describe:'Multiplication table limit'
    })
    .option('s',{
        alias: 'show',
        type: 'boolean',
        default: false,
        describe:'Show Multiplication table'
    })
    .option('n',{
        alias: 'name',
        type: 'string',
        default: 'table',
        describe:'FileName'
    })
    .option('d',{
        alias: 'destination',
        type: 'string',
        default: './outputs',
        describe:'File destination'
    })
    
    .check((argv,options) => {
        if (argv.b < 1 ) throw 'Error: base must be greater than 0'
        return true
    })
    .parseSync()

    //El check sirve para realizar validaciones de la entrada de los valores en este caso es q no sea negativo
