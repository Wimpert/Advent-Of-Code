const utils =  require('../utils/utils')


exports.solve = function(){

   let coordinates = {x: undefined, y:undefined};
   const inputs =  utils.readFileIntoStringArray('./puzzle_11/example.txt');

   // console.log(calcCellPowerlevel(3,5,8));
   // console.log(calcCellPowerlevel(122,79,57));
   // console.log(calcCellPowerlevel(217,196,39));
   // console.log(calcCellPowerlevel(101,153,71));
   for(let input of inputs){
      const serialNumber = Number(input);
      console.log('serialNumber', serialNumber);
   

   const fuelUnit = []
   fuelUnit.length = 300;
   let currentMax = Number.MIN_SAFE_INTEGER;
   
   
   for(let rowIndex = 0; rowIndex < 300 ; rowIndex++){
      let cells = []
      cells.length = 300;
      for(let cellIndex = 0; cellIndex < 300 ; cellIndex++){
         fuelUnit[rowIndex] = cells;
         const power = calcCellPowerlevel(cellIndex+1, rowIndex+1, serialNumber);
         const powers = {1: power};
         fuelUnit[rowIndex][cellIndex] = {powers:powers};
      }
   } 

   for(let size = 2; size <= 300; size++){
      let maxForSize = Number.MIN_SAFE_INTEGER;
      let coordinatesForThisSize = {x:undefined, y:undefined};
      for(let rowIndex = 0; rowIndex < 300 ; rowIndex++){
      for(let cellIndex = 0; cellIndex < 300 ; cellIndex++){
         fuelUnit[rowIndex][cellIndex].powers[size] = caclMatrixPowerLevelForOriginAndSize(cellIndex,rowIndex,fuelUnit, size);
         if(fuelUnit[rowIndex][cellIndex].powers[size] > maxForSize){
            //found a bigger one for this Size:
            maxForSize = fuelUnit[rowIndex][cellIndex].powers[size];
            coordinatesForThisSize = {x:cellIndex+1, y: rowIndex+1};
         }
      }
   }
   // console.log({size},{coordinatesForThisSize}, {maxForSize}); 
   }
   
}
   return coordinates;

}


function calcCellPowerlevel(x,y, serialNumber){
   
   const rackId = (x+10);
   const powerString =  ((rackId*y+serialNumber)*rackId).toString();
   if(powerString.length >= 3){
      const hunderd = Number(powerString.charAt(powerString.length-3));
      return hunderd-5;
   }
   return -5;
}


function caclMatrixPowerLevelForOriginAndSize(x,y, fuelUnit, matrixSize){
  
   if(x === 32 && y === 44 && matrixSize === 3){
      console.log('for debug')
   }


  let returnValue =  fuelUnit[y][x].powers[matrixSize-1];

  // add the row below:
  const rowBelowIndex = y + matrixSize-1;
  if(rowBelowIndex <= 299){
     for(let i  = 0 ; i < matrixSize && x+i <= 299; i++){
        returnValue += fuelUnit[rowBelowIndex][x+i].powers[1];
     }
  }

  const collumnAfterIndex = x + matrixSize-1;
  if(collumnAfterIndex <= 299){
     for(let i = 0; i < matrixSize-1 && y+i <= 299; i++){
        returnValue += fuelUnit[y+i][collumnAfterIndex].powers[1];
     }
  }

 
  return returnValue;
}

function calcRowCellsPowerLevel(x,y,serialNumber, fuelUnit, matrixSize){

   let returnVal = 0;
   for(let i = 0; i < matrixSize ; i++){
      if(x+i < fuelUnit.length){
         returnVal += calcCellPowerlevel(x+i,y, serialNumber, fuelUnit);
      }
   }
   return returnVal;
}

function calcMatrixCellsPowerLevel(x,y,serialNumber, fuelUnit, matrixSize){

   
   let returnVal = 0;
   for(let i = 0; i < matrixSize ; i++){
      if(x+i < fuelUnit.length){
         returnVal += calcRowCellsPowerLevel(x,y+i,serialNumber, fuelUnit, matrixSize);
      }
   }

   return returnVal;
}