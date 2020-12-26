// const fs = require('fs');
// const chalk = require('chalk')

// // adding data to data base
// let addNote = (title,body)=>{
//     const notes = loadNotes();
//     console.log(notes); 
//     let dupbicateNotes = notes.filter(items=>items.title===title)
//     if(dupbicateNotes.length == 0){
//         notes.push({
//             title: title,
//             body: body
//         })   
//         saveNotes(notes);
//         console.log(chalk.green.inverse.bold('Data Save Sucessfully'));
        
//       }else{
//           console.log(chalk.red.inverse.bold('Note Title Taken!'));
          
//     }
//   }
//  // saving data to data base
//   let saveNotes = (data)=>{
//     let saveJson = JSON.stringify(data);
//      let save = fs.writeFileSync('notes.json',saveJson);
//  }
// // loading data from data base
//  let loadNotes = ()=>{
//     try {
//         let bufferNote = fs.readFileSync('notes.json')
//         let data = bufferNote.toString();
//         return JSON.parse(data);
//     } catch (error) {
//         return []
//     }

// }

// module.exports = {
//     addNote: addNote
// }

let data = [1,2,3,4,5,6,7,8,9,0]
let list = data.forEach(items=>items)
console.log('object no: ',list);