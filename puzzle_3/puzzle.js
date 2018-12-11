const utils =  require('../utils/utils')

exports.solve = function(){
   const claims =  utils.readFileIntoStringArray('./puzzle_3/input.txt');
   let result = 0;
   let fabrik = {};
   let uniqueClaimIds = new Set();
   for (let claim of claims){
      const claimValues = extractClaimValues(claim);
      const marked = markClaimInFabrik(fabrik, claimValues,uniqueClaimIds);
      fabrik = marked.fabrik;
      result = result + marked.dubbelHits;

   }
   console.log(uniqueClaimIds);
   return result;
}

function extractClaimValues (claim){
   const values = claim.split(' ');
   const id = values[0];
   
   const [x, y,  ] = values[2].split(',');
   const [width,  heigth  ] = values[3].split('x');
   return{id:id, origin:{x:Number(x),y:Number(y.substr(0,y.length-1))}, dimension:{width:Number(width), heigth:Number(heigth)}};
   
}

function markClaimInFabrik(fabrik, claimValues, uniqueClaimIds){
   let dubbelHits = 0;
   let overLapsWith = new Set();
   for(let y = claimValues.origin.y ;  y < claimValues.origin.y + claimValues.dimension.heigth; y++ ){
      if(!fabrik[y]){
         fabrik[y]  = {};
      }
      const row = fabrik[y];
      for(let x = claimValues.origin.x ; x < claimValues.origin.x + claimValues.dimension.width ; x++){
         if(!row[x]){
            row[x] = [];
         } else {
            //console.log(row[x]);
            row[x].forEach(id => overLapsWith.add(id));
         }
         const hits = row[x];
         if(hits.length === 1){
            dubbelHits++;
            // console.log('x:',x, ', y:' ,y)
         }
         hits.push(claimValues.id);
      }
   }
   
   if(overLapsWith.size === 0){
      uniqueClaimIds.add(claimValues.id);
   } else {
      overLapsWith.forEach(id => {
         uniqueClaimIds.delete(id);
      });
   }

   return {fabrik:fabrik, dubbelHits: dubbelHits};
}