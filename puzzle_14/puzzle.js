const utils =  require('../utils/utils')

exports.solve = function(){


   const inputs =  utils.readFileIntoStringArray('./puzzle_14/example.txt')[0];
   
   const numbers = inputs.split('');
   
   for(let i in numbers){
      numbers[i] = Number(numbers[i]);
   }

   let elfOneIndex = 0;
   let elftwoIndex = 1;

  // const numberOfRecipies = 864801;

   // while(numbers.length < numberOfRecipies+10){
   //    addToArray(elfOneIndex, elftwoIndex, numbers);
   //    //console.log(numbers);
   //    elfOneIndex = moveElf(elfOneIndex, numbers);
   //    elftwoIndex = moveElf(elftwoIndex,numbers);
   //    //console.log('after move', elfOneIndex, elftwoIndex);
   // }

  


   // console.log(numbers.length);

   // if(numbers.length>numberOfRecipies+10){
   //    numbers.pop();
   // }
   // const result = numbers.slice(numbers.length-10).reduce((acc, number) => acc + number, '');
   // console.log(result);


   const seqToFind = '864801';
   let found = false;
   let index = 0;
   while(!found){
      addToArray(elfOneIndex, elftwoIndex, numbers);
      elfOneIndex = moveElf(elfOneIndex, numbers);
      elftwoIndex = moveElf(elftwoIndex,numbers);
      index = numbers.slice(numbers.length-(seqToFind.length+1)).reduce((acc, number) => acc + number, '').indexOf(seqToFind); 
      if(index !== -1){
         found = true;
      }
   }
   if(index === 1){
      index = 0;
   } else {
      index = 1;
   }
   console.log(numbers.length-seqToFind.length-index);

}


function moveElf(index, array){
   let ammountToMove = array[index] + 1;
   ammountToMove = ammountToMove - Math.floor(ammountToMove/array.length)*array.length;
   if(ammountToMove+index >= array.length) {
      return (ammountToMove+index) - array.length;
   } 
   return index + ammountToMove;
}

function addToArray(index1, index2, array){
   const sum = array[index1] + array[index2];
   //console.log('sum was', sum)
   array.push(Number(String(sum).split('')[0]));
   //console.log('adding', Number(String(sum).split('')[0]));
   if(sum > 9){
      array.push(Number(String(sum).split('')[1]));
      //console.log('adding', Number(String(sum).split('')[1]));
   }
}
