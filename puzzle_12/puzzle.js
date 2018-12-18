const utils =  require('../utils/utils')


exports.solve = function(){

   const inputs =  utils.readFileIntoStringArray('./puzzle_12/input.txt');
   
   
 
   const initialStateString = inputs[0].replace('initial state: ','');
   let expandedStateString =  '....'+initialStateString+'....';
   const patterns = [];
   for(let i = 2; i < inputs.length;i++){
      const [pattern , result] = inputs[i].split(' => ');
      patterns.push({pattern,result});
   }
   let potZeroPosition = 4;

   utils.emptyFile('./data')


   const numberOfloops = 2000;

   for(let i = 0; i < numberOfloops ; i++){

      let tempState = expandedStateString;
      const indexesReplaced = [];
      for(let pattern of patterns){
            let endReached = false;
            let startIndex = -1;
            while(!endReached){
               const index = expandedStateString.indexOf(pattern.pattern, startIndex+1);
               //console.log(i+1,index, pattern, states[i]);
               if(index !== -1){
                  startIndex = index;
                  const indexToReplace = index+2;
                  indexesReplaced.push(indexToReplace),
                  tempState = tempState.substring(0,indexToReplace) + pattern.result + tempState.substring(indexToReplace+1);
                  //console.log(tempState, pattern);
               } else{
                  endReached = true;
               }
         }
      }

      for(let index = 0; index < tempState.length ; index++ ){
         if(indexesReplaced.indexOf(index) === -1 ){
            tempState = tempState.substring(0,index) + '.' + tempState.substring(index+1);
         }
      }


      //add to the front
      while(tempState.indexOf('#')<4){
         potZeroPosition++;
         tempState = '.' +tempState;
      }

      //add to the back
      while(tempState.lastIndexOf("#") > tempState.length -5){
         tempState = tempState + '.';
      }

      expandedStateString = tempState;
      // console.log(getSolution(expandedStateString, potZeroPosition), i); 
      utils.appendToFile('./data', '' + getSolution(expandedStateString, potZeroPosition) +', '+ (i+1) + '\n');
      
      

      // if(expectedStates[i+1] !== tempState){
      //    console.log("****" + i);
      //    console.log('before  ' , expectedStates[i]);
      //    console.log('expected' , expectedStates[i+1]);
      //    console.log('got     ', tempState);
        
      // }
      //console.log('temp ',i,getStateStartingFromPotZero(tempState, potZeroPosition));
   }


   //console.log(getSolution(states[states.length - 1], potZeroPosition));
   

   
}



function getStateStartingFromPotZero(state, potZeroPosition){
   let returnValue = '';
   for(let i = potZeroPosition ; i < state.length; i++){
      returnValue = returnValue + state[i];
   }
   return returnValue;
}


function getSolution(state, potZeroPosition){
   let returnVal = 0;
   for(let i = 0; i <state.length ; i ++){
      if(state[i] === '#'){
         returnVal += i - potZeroPosition;
      }
   }
   return returnVal;
}