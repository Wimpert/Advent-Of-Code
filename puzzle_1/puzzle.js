const utils =  require('../utils/utils')

exports.solve = function(){
   let numbers =  utils.readFileIntoStringArray('./puzzle_1/input.txt');
   const foundFrequencies= [];
   let currentFrequency = 0;
   let result = undefined;
   let numberIndex = 0;
   while(!result){
      currentFrequency += Number(numbers[numberIndex]);
      if(foundFrequencies.indexOf(currentFrequency) === -1){
         foundFrequencies.push(currentFrequency);
         // console.log(foundFrequencies);
      } else {
         result = currentFrequency
      }
      numberIndex++;
      if(numberIndex > numbers.length - 1){
         numberIndex = 0;
      }
   }
   return result;
}