const utils =  require('../utils/utils')



exports.solve = function(){
   const polymer =  utils.readFileIntoStringArray('./puzzle_5/input.txt');
   let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

   for (let letter of alphabet){
   
         let processedPolymer = polymer[0].replace(new RegExp(letter, 'g'),'');
         processedPolymer = processedPolymer.replace(new RegExp(letter.toLocaleUpperCase(), 'g'),'');

   let elements = processedPolymer.split('');
   let resultingPolymer = [];
   //console.log(elements)
   let proccessed = false;

   console.log(letter, ' replaced');

   while(!proccessed){
      let element1;
      if(resultingPolymer.length !== 0){
         element1 = resultingPolymer[resultingPolymer.length-1];
      }
      if(element1){
         if(checkForReaction(element1, elements[0])){
            resultingPolymer.pop();
            elements = [... elements.slice(1)];
         } else {
            resultingPolymer = [...resultingPolymer, elements[0]];
            elements = [... elements.slice(1)];
         }
      } else {
         resultingPolymer = [...resultingPolymer, elements[0]];
            elements = [... elements.slice(1)];
      }
      // console.log(resultingPolymer.length , elements.length);
      proccessed = elements.length === 0;
   }

   console.log(letter, polymerToString(resultingPolymer).length);

}
 
   return "done";
}

function checkForReaction(element1, element2){
   if(element1.toLowerCase() === element2.toLowerCase()){
      if(isLowerCase(element1) && isUpperCase(element2)){
         return true
      } else if(isUpperCase(element1) && isLowerCase(element2)){
         return true
      }
   }
   return false;
}

function isLowerCase(element){
   let lowerElement = element.toLowerCase();
   return lowerElement === element;
}

function isUpperCase(element){
   return ! isLowerCase(element);
}

function polymerToString(resultingPolymer){
   return resultingPolymer.reduce((acc,element) => {
      return acc+element;
   },'');
}