const utils =  require('../utils/utils')



exports.solve = function(){
   const coordinatesStrings =  utils.readFileIntoStringArray('./puzzle_6/input.txt');
   let result = 0;

   const {locations, minX, minY, maxX, maxY} = coordinatesStrings.reduce((coordinates,stringValue,index) => {
      let [x,y] = stringValue.split(',');
      x=Number(x);
      y=Number(y)
      coordinates.locations.push( {id:index,x:x,y:y});
      return {... coordinates,
          minX:Math.min(x, coordinates.minX), 
          minY:Math.min(y, coordinates.minY),
         maxX: Math.max(x, coordinates.maxX),
         maxY: Math.max(y, coordinates.maxY)}
   }, {locations:[],
      minX:Number.MAX_SAFE_INTEGER,
      minY:Number.MAX_SAFE_INTEGER,
      maxX:Number.MIN_SAFE_INTEGER,
      maxY:Number.MIN_SAFE_INTEGER});
   
   let surfaces = {};
   let grid = {}

   // for(let location of locations){
   //    for(let y= minY;y <= maxY;y++){
   //       let row = {};
   //       if(!grid[y]){
   //          grid[y] = row;
   //       } else {
   //          row = grid[y];
   //       }
   //       for(let x = minX; x <= maxX;x++){
   //          //console.log(x,y);
   //          let cell = {distanceToClosets: Number.MAX_SAFE_INTEGER, closets:'x'};
   //          if(!row[x]){
   //             row[x] = cell;
   //          } else {
   //             cell = row[x];
   //          }
   //             const dist = getDistanceBetween(location, {x:x,y:y});
   //             //console.log('calc:',dist, 'current: ', cell.distanceToClosets);
   //             if(dist<cell.distanceToClosets){
   //                // found a closer one,
   //                // update surfaces:
   //                if(!surfaces[location.id]){
   //                   surfaces[location.id] = 0;
   //                }
   //                surfaces[location.id] = surfaces[location.id] + 1;
   //                if(cell.closets !== 'x' && cell.closets !== '.'){
   //                   surfaces[cell.closets] = surfaces[cell.closets] - 1;
   //                }
   //                cell.closets=location.id;
   //                cell.distanceToClosets=dist;
   //             } else if(dist === cell.distanceToClosets){
   //                if(cell.closets !== 'x' && cell.closets !== '.'){
   //                   surfaces[cell.closets] = surfaces[cell.closets] - 1;
   //                }
   //                cell.closets = '.';
   //             }
   //       }
   //    }
   // }
   // const surfacesOnBorder = getSurfacesOnBorder(grid,minX,minY,maxX,maxY);
   // const result = Object.keys(surfaces).reduce((acc, surfaceId) => {
   //    if(!surfacesOnBorder.has(Number(surfaceId))){
   //       //console.log(surfaceId, surfaces[surfaceId]);
   //       acc = Math.max(acc, surfaces[surfaceId]);
   //    }
   //    return acc;
   // }, Number.MIN_SAFE_INTEGER);
   

   for(let y= minY;y <= maxY;y++){
      for(let x = minX; x <= maxX;x++){
         let treshHold = 10000;
         let totalDist=0;
         for(let location of locations) {
            const dist = getDistanceBetween(location, {x:x,y:y});
            totalDist += dist;
            if(totalDist >= treshHold){
               break;
            }
         }
         if(totalDist < treshHold){
            result++;
         }
      }
   }

   return "result: " + result ;
}


function getDistanceBetween(point1, point2){
   //console.log(point1, point2);
   return Math.abs(point1.x-point2.x)+Math.abs(point1.y-point2.y);
}

function getSurfacesOnBorder(grid, minX,minY,maxX,maxY){
   const returnValue = new Set();
   for (let rowIndex in grid){
      let allValues = Number(rowIndex) === minY || Number(rowIndex) === maxY;
      for(let cellIndex in grid[rowIndex]){
         if(allValues || Number(cellIndex) === minX || Number(cellIndex) ===  maxX){
            returnValue.add(grid[rowIndex][cellIndex].closets);
         }
      }
   }
   return returnValue;

}