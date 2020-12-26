const fs = require('fs');
const chalk = require('chalk')

// reading the notes...
let getNotes = (title)=>{
    const notes = loadNotes();
    let note = notes.find(note=>note.title === title)
    if(note){
        console.log(chalk.inverse(note.title));
        console.log((note.body));
    }else{
        console.log(chalk.red.inverse('No Note found!!'));
    }

}
// adding data to data base
let addNote = (title,body)=>{
  const notes = loadNotes();
  console.log(notes); 
  let dupbicateNotes = notes.filter(items=>items.title===title)

  debugger
  
  if(dupbicateNotes.length == 0){
      notes.push({
          title: title,
          body: body
      })   
      saveNotes(notes);
      console.log(chalk.green.inverse.bold('Data Save Sucessfully'));
      
    }else{
        console.log(chalk.red.inverse.bold('Note Title Taken!'));
        
  }
}
 // saving data to data base
let saveNotes = (data)=>{
   let saveJson = JSON.stringify(data);
    let save = fs.writeFileSync('notes.json',saveJson);
}

// loading data from data base
let loadNotes = ()=>{
    try {
        let bufferNote = fs.readFileSync('notes.json')
        let data = bufferNote.toString();
        return JSON.parse(data);
    } catch (error) {
        return []
    }

}

// removing data from data base

let removeData = (title)=>{
    let data = loadNotes()
    let desiredata1 = data.filter(data=>data.title !== title)
    saveNotes(desiredata1)
    let desiredata = data.filter(data=>data.title === title)

    if(desiredata.length != 0){
        try {
            console.log(chalk.bold.yellow.inverse('Data removed: ',title));
        } catch (error) {
            return []
        }
       
    }else{
        console.log(chalk.bold.redBright.inverse('NO SUCH DATA FOUND: ',title));

    }
}

// showing all the data to console

let listData = ()=>{
   let list = loadNotes()
   console.log(chalk.blueBright.bold.inverse('your All Notes Listed below'));
     list.forEach(items=>console.log(items.title))
 
}

module.exports = {
    getNotes : getNotes,
    addNote: addNote,
    removeData: removeData,
    listData:listData
}