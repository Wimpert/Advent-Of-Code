const utils =  require('../utils/utils')

exports.solve = function(){
   const codes =  utils.readFileIntoStringArray('./puzzle_2/input.txt');
   let for2 = 0
   let for3 = 0;
   const codeLength = codes[0].length;
   for (let i = 0 ;  i < codeLength ; i++){
      let reducedCodes = [];
      for(let code of codes){
         const reducedCode = reduceCode(code,i);
         if(reducedCodes[reducedCode]){
            return reducedCode;
         } else {
            reducedCodes[reducedCode] = reducedCode;
         }
      }
   }
   return for2 * for3;
}

function reduceCode(code, positionToTakeOut){
   if(positionToTakeOut == 0){
      return code.slice(1);
   }
   return code.slice(0,positionToTakeOut)+code.slice(positionToTakeOut+1);
}

function countLetters(string){
   const letterCount = {};
   for( let char of string){
      if(letterCount[char] !== undefined){
         letterCount[char] = ++letterCount[char];
      } else {
         letterCount[char] = 1;
      }
   }
  return letterCount;
}

function meetsCriteria(string){
   const countedLetters = countLetters(string);
   const returnVal= {
      for3: false,
      for2: false
   }
   const letters = Object.keys(countedLetters);
   for(let letter of letters){
     if(countedLetters[letter] === 2){
         returnVal.for2 = true;
      } else if(countedLetters[letter] === 3){
         returnVal.for3 = true;
      } 
      if(returnVal.for2 && returnVal.for3){
         break;
      }
   }
   return returnVal;
}