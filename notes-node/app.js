// import chalk from 'chalk';
// import yarg from 'yargs';
// import notes from './notes.js';
const notes = require('./notes.js')
const yarg = require('yargs')
const chalk = require('chalk')



console.log(chalk.blue('run the command node app.js --help'));
yarg.version('1.2.3')

yarg.command({
    command:"add",
    describe:"Add Notes",
    builder:{
        title: {
            describe:"note title",
            demandOption:true,
            type:"string"
        },
        body:{
            describe:"note body",
            demandOption:true,
            type:'string'
        }
    },
    handler:(argv)=> notes.addNote(argv.title,argv.body)
})

yarg.command({
    command:"remove",
    describe:"Remove Note",
    builder:{
        title:{
            describe:"removed note",
            demandOption:true,
            type:"string"
        }
    },
    handler:(argv)=>notes.removeData(argv.title)
})

yarg.command({
    command:"list",
    describe:"Listing Out All Note",
    handler:()=>notes.listData()
})
yarg.command({
    command:"read",
    describe:"read the note",
    builder:{
        title:{
            describe:'Read the Note',
        demandOption:true,
        type:"string"
    }
    },
    handler:(argv)=>notes.getNotes(argv.title)
})
// console.log(yarg.argv);
yarg.parse()