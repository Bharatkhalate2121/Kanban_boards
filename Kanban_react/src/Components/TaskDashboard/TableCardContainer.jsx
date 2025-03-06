import React, { useState, useContext, useEffect } from "react";
import { Container, Card, Table } from "react-bootstrap";
import { ctx } from "../../utils/Configuration.jsx";
import { useParams } from "react-router-dom";
import AddColumn from "./AddColumn.jsx";
import AddCardForm from "./AddCardForm.jsx";
import EditColumn from "./EditColumn.jsx";
import { DndContext } from "@dnd-kit/core";
import {Droppable,Draggable, handleDrag} from '../../utils/DragableUtils.jsx';




export default function TableCardContainer() {
  let id = parseInt(useParams().id);
  const { data, cardData, setCardData } = useContext(ctx);
  const [toggleForm, setToggleForm] = React.useState(true);
  const [title, setTitle] = React.useState("");
  const [projectId, setProjectId] = useState(0);

  useEffect(() => {
    data.map(project => {
      if (project.id == id) {
        setProjectId(id);
      }
    })
  }
    , [id]);

  let handleSubmit = (e) => {
    console.log(title);
    e.preventDefault();
    let updatedData = cardData.map((project) => {
      if (project.projectId === projectId) {
        return {
          ...project,
          column: [
            ...project.column,
            { columnId: project.column[project.column.length - 1].columnId + 1, title: title, cards: [] }
          ]
        };
      }
      return project;
    });

    setCardData(updatedData);
    localStorage.setItem("cardData", JSON.stringify(updatedData));
    changeState();
  };


  let changeState = (e = undefined) => {

    let id = e?.target?.id;

    if (id === "addButton") {
      setToggleForm(false);
    }
    else {
      setToggleForm(true);
    }
  }

  let submitTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);

  }


  return (

    <Container className=" mt-5 ms-5 p-5 gap-3 d-flex justify-content-start">

      <Table borderless responsive size="sm" className="bg-light">
        <tbody className="bg-light">
          <DndContext onDragStart={(event) => console.log("Drag started:", event)}
            onDragEnd={(event) => handleDrag(projectId, event, cardData, setCardData)}>
            <tr className="bg-light">

              {cardData.map((project) => {

                if (project.projectId === projectId) {
                  return project.column.map((column) => {
                    return (
                      <Droppable key={column.columnId} column={column} >
                        <Card onDragOver={(e) => e.preventDefault()}
                          key={column.columnId} className="col-1" draggable="false" style={{ width: '18rem', }}>

                          <EditColumn column={column} projectId={projectId} />


                          <Card.Body className="">
                            {column.cards.map((card) => {
                              return (
                                <Draggable key={column.columnId + "" + card.cardId} card={card} column={column} projectId={projectId} />

                              )
                            }) || null}
                            <AddCardForm column={column} projectId={project.projectId} />
                          </Card.Body>
                        </Card>
                      </Droppable>
                    )
                  })



                }
              })}

              <AddColumn projectId={projectId} handleSubmit={handleSubmit} changeState={changeState} submitTitle={submitTitle} toggleForm={toggleForm} />


            </tr>
          </DndContext>
        </tbody>
      </Table>
    </Container>

  )
}
