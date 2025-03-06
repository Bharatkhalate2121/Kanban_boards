import React from "react";
import EditCard from "../Components/TaskDashboard/EditCard.jsx";
import {  useDroppable, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";






function Droppable(props) {
  const { setNodeRef, over } = useDroppable({
    id: props.column.columnId,
  });

  return (
    <th
      ref={setNodeRef}
      onDragOver={(e) => e.preventDefault()} // Allow drop
      over={over}
    >
      {props.children}
    </th>

  );
}

function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${props.column.columnId}${props.card.cardId}`,
    listeners: {
      onDragStart: (event) => {
        console.log("Drag started: ", event);
      }
    }
  });
  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    zIndex: transform ? 9999 : "auto", // Ensures dragged card stays on top
    position: transform ? "absolute" : "relative", // Helps with layering
  };
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <EditCard card={props.card} column={props.column} projectId={props.projectId} />
    </div>
  );
}



let cardId = (projectId, columnToMove, cardData) => {

  let cardId;
  let id = cardData.map(project => {
    if (project.projectId == projectId) {
      project.column.map(column => {
        if (column.columnId == columnToMove) {
          (column.cards.length == 0) ?
            cardId = 1
            :
            cardId = column.cards[column.cards.length - 1].cardId + 1;
        }
      })

    }
  });

  return cardId;

}


let handleDrag = function (projectId, event, cardData, setCardData) {

  let columnToMove = event.collisions[0].id;
  let columnFromMove = parseInt(event.active.id[0]);
  let cardToMove = parseInt(event.active.id[1]);
  let newCard;
  if (columnToMove != columnFromMove) {

    let newCardData = cardData.map(project => {
      if (project.projectId == projectId) {
        return {
          ...project,
          column: project.column.map(column => {
            if (column.columnId == columnFromMove) {
              // Get the card to move
              newCard = column.cards.find(card => card.cardId == cardToMove);

              return {
                ...column,
                // Remove the card using filter instead of map
                cards: column.cards.filter(card => card.cardId !== cardToMove)
              };
            } else {
              return column;
            }
          }),
        };
      } else {
        return project;
      }
    });
    let updatedCardData = newCardData.map(project => {
      if (project.projectId == projectId) {
        return {
          ...project,
          column: project.column.map(column => {
            if (column.columnId == columnToMove) {
              return {
                ...column,
                cards: [...column.cards, { ...newCard, cardId: cardId(projectId, columnToMove, cardData) }]
              }
            } else {
              return column;
            }
          }),
        }
      }
      else {
        return project;
      }
    });
    setCardData(updatedCardData);
    localStorage.setItem('cardData', JSON.stringify(updatedCardData))
  }
  else {
    console.log("dragEnded: " , event);
  }
};

export  {Droppable,Draggable, handleDrag};