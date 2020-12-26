
function add(a,b,c){
    setTimeout(()=>{
       let addition = a+b;
    return c(`addition of ${a} and ${b} is ${addition}`) 
    },2000)
}

add(1,4,(sum)=>{
    console.log(sum);
})

// let setTime = (cb,timeout=0) => {return new Promise((res)=>{
//     setTimeout(() => {
//        cb();
//        res(); 
//     }, timeout);
// })};

// let out = async ()=>{
//    await setTime(()=>{
//         console.log('object1');
//     },3000);
// await    setTime(()=>{
//         console.log('object2');
//     },2000);
//     setTime(()=>{
//         console.log('object3');
//     },1000);
// }

// out()

// let time =  (cb,timeout=0)=>{
//     return new Promise(res=>{
//         setTimeout(() => {
//             cb();
//             res ();
//         }, timeout);
//     })
// }

// let set =async ()=>{
//    await time(
//     () => {
//        console.log('time1');
//     },3000),
//    await time(() => {
//        console.log('time2');
//     },2000),
//  await    time(() => {
//     console.log('time3');
//     },1000)
    
// }

// set()

// let late =async ()=>{
//     let t1 = ()=>{
//         return new Promise(res=>{

//             setTimeout( () => {
//                res('time11');
//             }, 3000);
//         })
//     }
//     let t2 = ()=>{
//         return new Promise(res=>{

//             setTimeout( () => {
//                res( console.log('time22'));
//             }, 2000);
//         })
//     }
//     let t3 = ()=>{
//         return new Promise(res=>{

//             setTimeout( () => {
//                res( console.log('time33'));
//             }, 1000);
//         })
//     }

//     console.log(await t1())
//     console.log(await t2()) 
//     console.log(await t3()) 
    
// }

// late()