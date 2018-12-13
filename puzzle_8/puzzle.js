const utils =  require('../utils/utils')

const NODE_READ_MODE = 0;
const METADATA_READ_MODE = 1

exports.solve = function(){
   const input =  utils.readFileIntoStringArray('./puzzle_8/input.txt')[0];

   let numbers = input.split(' ');
   numbers = numbers.map((numberString) => {
      return Number(numberString);
   });
   
   let index = 0;
   let currentReadMode = NODE_READ_MODE;
   const data = [];
   let currentDataPointer = -1;
   let metaData = [];
   let nodeId = 0;
   let nodes = {};

   while(index < numbers.length){
      if(currentReadMode === NODE_READ_MODE){
         // read data for node:
         const numberOfchildNodes  = numbers[index];
         index++;
         const numberOfMetadataForNodes = numbers[index];
         data.push({nodeId,numberOfchildNodes, numberOfMetadataForNodes});
         const parentId = data[currentDataPointer] ? data[currentDataPointer].nodeId : undefined;
         // add itself
         nodes[nodeId]={nodeId,metaData:[], children:[], parentNode: parentId};
         if(parentId !== undefined){
             // add itself to its parent as a child;
            nodes[parentId].children.push(nodeId);
         }
         nodeId++;
         currentDataPointer++;
         //we read a node so let see what our next mode is:
         if(data[currentDataPointer].numberOfchildNodes !== 0){
            //this means we will read another node:
            data[currentDataPointer].numberOfchildNodes = data[currentDataPointer].numberOfchildNodes -1;
         } else {
            //this mean the next loop we will read meta data:
            currentReadMode = METADATA_READ_MODE;
         }
         index++;
      } else if(currentReadMode === METADATA_READ_MODE){
         //let find out how many ?:
         let dataObject = data[currentDataPointer];
         for(let i = 0; i < dataObject.numberOfMetadataForNodes; i++){
           metaData.push(numbers[index]);
           nodes[dataObject.nodeId].metaData.push(numbers[index]);
            index++;
         }
         
         data.pop();
         //movePointer:
         currentDataPointer--;
         if(currentDataPointer !== -1  && data.lenght !== 0 && data[currentDataPointer].numberOfchildNodes !== 0){
            //done READING META DATA, next will be a node again:
            currentReadMode = NODE_READ_MODE;
            data[currentDataPointer].numberOfchildNodes = data[currentDataPointer].numberOfchildNodes -1;
         }
         //if not we keep on reading
      }
   }
   // console.log(nodes);
   //return "result:" + metaData.reduce((acc, number) => acc + number, 0) ;
   return getNodeValue(nodes[0], nodes);
}



function getNodeValue(node, nodes){
   let returnValue = 0;
   if(node.children.length === 0){
      returnValue = node.metaData.reduce((acc, number) => acc + number, 0);
   } else {
      for(let metaData of node.metaData){
         if(node.children[metaData-1]){
            //this exists:
            returnValue = returnValue + getNodeValue(nodes[node.children[metaData-1]],nodes);
         }
      }
   }
   return returnValue;
}