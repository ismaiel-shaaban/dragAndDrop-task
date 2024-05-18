import React from 'react';
import "./sideBar.css"
export default () => {
  const onDragStart = (event, nodeType) => {
    console.log(';;;;;;;;;;;;;;;;' ,nodeType ,event);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className='sidebar'>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'custom')} draggable>
        Input Node
      </div>
      <div className="dndnode square" onDragStart={(event) => onDragStart(event, 'custom2')} draggable>
        Stage Node
      </div>
      {/* <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div> */}
    </aside>
  );
};
