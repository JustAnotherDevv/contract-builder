export const isNameDuplicate = (objArray, id) => objArray.some(obj => obj.Id === id);

/**
 * 
 * const newNodeHandler = newNode => {
    setNodes(nds => {
      const updatedNodes = nds.concat(newNode);
      console.log("Current nodes after drop:", updatedNodes);
      //   nds.concat(newNode);
      return updatedNodes;
    });
  };
  
 */
