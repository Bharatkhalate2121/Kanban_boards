import { ReactNode } from "react";
import EditCard from "../Components/TaskDashboard/EditCard";
import { useDroppable, useDraggable, DragEndEvent, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ProjectData } from "./Configuration";

interface Card {
  cardId: number;
  title: string;
  content: string;
}

interface Column {
  columnId: number;
  title: string;
  cards: Card[];
}

interface DroppableProps {
  column: Column;
  children: ReactNode;
}

interface DraggableProps {
  column: Column;
  card: Card;
  projectId: number;
}


interface HandleDragProps {
  (projectId: number, event: DragEndEvent, cardData: ProjectData[], setCardData: (data: ProjectData[]) => void): void;
}




const sensor=function(){
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // Prevent accidental drags
    },
  });

  return useSensors(mouseSensor); 
}



const Droppable: React.FC<DroppableProps> = ({ column, children }) => {
  const { setNodeRef } = useDroppable({
    id: column.columnId,
  });

  return (
    <th ref={setNodeRef} onDragOver={(e) => e.preventDefault()}>
      {children}
    </th>
  );
};

const Draggable: React.FC<DraggableProps> = ({ column, card, projectId }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: parseInt(`${column.columnId}${card.cardId}`),
  });

  const style: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    zIndex: transform ? 9999 : "auto",
    position: transform ? "absolute" : "relative",
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <EditCard card={card} column={column} projectId={projectId.toString()} />
    </div>
  );
};

const cardId = (projectId: number, columnToMove: number, cardData: ProjectData[]): number => {
  let newCardId = 1;

  cardData.forEach((project) => {
    if (project.projectId === projectId) {
      project.column.forEach((column) => {
        if (column.columnId === columnToMove) {
          newCardId = column.cards.length === 0 ? 1 : column.cards[column.cards.length - 1].cardId + 1;
        }
      });
    }
  });

  return newCardId;
};

const handleDrag: HandleDragProps = (projectId, event, cardData, setCardData) => {




  if (!event.collisions || event.collisions.length === 0) return;



  const columnToMove: number = event.collisions[0].id;
  const columnFromMove = Math.floor(event.active.id / 10);
  const cardToMove = event.active.id % 10;
  let newCard: Card | undefined;




  if (columnToMove !== columnFromMove) {
    const newCardData: ProjectData[] = cardData.map((project: ProjectData) => {
      if (project.projectId === projectId) {
        return {
          ...project,
          column: project.column.map((column) => {
            if (column.columnId === columnFromMove) {
              newCard = column.cards.find((card) => card.cardId === cardToMove);
              return {
                ...column,
                cards: column.cards.filter((card) => card.cardId !== cardToMove),
              };
            }
            return column;
          }),
        };
      }
      return project;
    });

    if (!newCard) return;
   

    const updatedCardData: ProjectData[] = newCardData.map((project: ProjectData) => {
      if (project.projectId === projectId) {
        return {
          ...project,
          column: project.column.map((column) => {
            if (column.columnId === columnToMove && newCard) {
              return {
                ...column,
                cards: [...column.cards, { ...newCard, cardId: cardId(projectId, columnToMove, cardData) }],
              };
            }
            return column;
          }),
        };
      }
      return project;
    });

    setCardData(updatedCardData);
    localStorage.setItem("cardData", JSON.stringify(updatedCardData));
  } else {
    // console.log("dragEnded: ", event);
  }
};

export { Droppable, Draggable, handleDrag, sensor };
