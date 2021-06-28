//1. Importing COre modules

// const fs = require('fs')

// // fs.writeFileSync('notes.txt', 'Welcome to NodeJS')


// fs.appendFileSync('note.txt','Hello World')

//2. Importing own files

// const notes = require('./notes')

// console.log(notes());

//3. importing npm module

// const validator = require('validator')

// console.log(validator.isEmail('niksgyani98@gmail.com'));  //true

// console.log(validator.isURL('sjvvqvqvv'));//false


// 
//4. Arguments parsing with Yargs

const yargs = require('yargs')
const { readNote } = require('./notes')

//1. Create add command
const notes = require('./notes')


 yargs.command({
     command: 'add',
     describe: 'Add a Note',
     builder:{
        title:{
            describe: 'Add a Title', //Set the title
            demandOption: true ,      //always required
            type:'string'
        },
        body:{
            describe: 'Add the body of note',
            demandOption: true,
            type:'string'
        }
     },
     handler: function(argv){
            notes.addNote(argv.title,argv.body)
     }
 })

 //2. Create remove command

 yargs.command({
    command: 'remove',
    describe: 'Remove a Note',
    builder:{
        title:{
            describe: 'Add a Title', //Set the title
            demandOption: true ,      //always required
            type:'string'
        }
    },
    handler: function(argv){
        notes.removeNote(argv.title)
    }
})

//3. Read Notes command

yargs.command({
    command: 'read',
    describe: 'Read a Note',
    handler: function(argv){
        readNote(argv.title)
    }
})

//4. Listing Notes command

yargs.command({
    command: 'list',
    describe: 'Lists all Notes',
    handler: function(){
        notes.listNotes()
    }
})

yargs.parse()