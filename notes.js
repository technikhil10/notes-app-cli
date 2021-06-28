const fs = require('fs')

const chalk = require('chalk')

const getNotes = function(){
    return 'Your notes are ..........'
}


const addNote = function(title,body){
    const notes = loadNotes()

    //check duplicacy
    const duplicateNotes = notes.filter(note => note.title === title)

    if(duplicateNotes.length === 0){
        notes.push({
            title:title,
            body:body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse.bold('New Note Added'));
    }
    else{
        console.log(chalk.red.inverse.bold('Note Title is Taken, Please add different Title'));
    }

    
}


const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(err){
        return []
    }    
}

/*************************************************************************/

//removing Notes

const removeNote = function(title){
    const notes = loadNotes()

    const titleExists = checkTitle(title)

    if(!titleExists){
        console.log(chalk.red.inverse.bold('Enter valid title! No Note Found'))
        return
    }

    const notesToKeep = notes.filter(note => note.title !== title)

    saveNotes(notesToKeep)
    console.log(chalk.green.inverse.bold(`Note Removed with title : ${title}`));
}

const checkTitle = function(title){
    const notes = loadNotes()
    return notes.find(note=> note.title === title)
}
/**************************************************************************************** */

//Listing Notes


    const listNotes = () =>{
        const notes = loadNotes()
        console.log(chalk.cyan.bold.inverse('Your Notes are below:\n'));
        notes.forEach(note=> console.log(`Title: ${note.title}, Description: ${note.body}\n`))
    }



/** ***************************************************************************************/

//Reading Notes

    const readNote = (title) =>{
        const notes = loadNotes()

        const titleExists = checkTitle(title)


        if(!titleExists){
            console.log(chalk.red.inverse.bold('Enter valid title! No Note Found'))
            return
        }

        const noteReaded = notes.find(note=> note.title === title)

        console.log(`Title: ${noteReaded.title}, Description: ${noteReaded.body}`);
    }

/* **************************************************************************************** */
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote:removeNote,
    listNotes: listNotes,
    readNote:readNote
}

