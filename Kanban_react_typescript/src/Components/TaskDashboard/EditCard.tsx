import { useState, forwardRef, FormEvent, ChangeEvent, MouseEvent, useContext } from "react";
import { ctx,useData, ProjectData} from "../../utils/Configuration";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
import { GrFormEdit } from "react-icons/gr";
import { Card, Form, Alert } from "react-bootstrap";

// Define types for props
interface CardProps {
  cardId: number;
  title: string;
  content: string;
}

interface ColumnProps {
  columnId: number;
  cards: CardProps[];
}

interface EditCardProps {
  card: CardProps;
  column: ColumnProps;
  projectId: string;
}

// Convert the component to TypeScript
const EditCard = forwardRef<HTMLDivElement, EditCardProps>(({ card, column, projectId }, ref) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [data, setData] = useState<{ title: string; content: string }>({
    title: card.title,
    content: card.content
  });

  const useCtx = useContext(ctx);
  const {cardData, setCardData }=useCtx?useCtx:useData();

  const handleDelete = () => {
    const updatedCardData = cardData.map((project: ProjectData) => {
      if (project.projectId === parseInt(projectId)) {
        return {
          ...project,
          column: project.column.map((itrColumn) =>
            itrColumn.columnId === column.columnId
              ? {
                  ...itrColumn,
                  cards: itrColumn.cards.filter((itrCard) => itrCard.cardId !== card.cardId)
                }
              : itrColumn
          )
        };
      }
      return project;
    });

    setCardData(updatedCardData);
    localStorage.setItem("cardData", JSON.stringify(updatedCardData));
    setAlert(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const updatedCardData = cardData.map((project) => {
      if (project.projectId === parseInt(projectId)) {
        return {
          ...project,
          column: project.column.map((itrColumn) =>
            itrColumn.columnId === column.columnId
              ? {
                  ...itrColumn,
                  cards: itrColumn.cards.map((itrCard) =>
                    itrCard.cardId === card.cardId ? { ...itrCard, ...data } : itrCard
                  )
                }
              : itrColumn
          )
        };
      }
      return project;
    });

    setCardData(updatedCardData);
    localStorage.setItem("cardData", JSON.stringify(updatedCardData));
    setEdit(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      {edit ? (
        <Card
          ref={ref}
          key={card.cardId}
          className="col-1 mt-1"
          draggable="true"
          style={{ width: "14rem" }}
          onDragStart={(e: React.DragEvent) => {
            if (e.currentTarget.closest("[data-no-dnd]")) {
              e.preventDefault();
            }
            e.dataTransfer.setData("cardId", card.cardId.toString());
            e.dataTransfer.setData("fromColumnId", column.columnId.toString());
            e.dataTransfer.setData("projectId", projectId);
          }}
        >
          <Card.Header data-no-dnd="true" className="d-flex justify-content-between">
            <Form data-no-dnd="true" className="d-flex justify-content-between" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={data.title}
                autoFocus
                className="w-50 border-0"
                onChange={handleChange}
                onPointerDown={(e: MouseEvent) => e.stopPropagation()}
              />
              <button type="submit" style={{ display: "none" }}></button>
              <div>
                <IoIosCheckmark
                  className="me-1 custom-hover"
                  style={{ fontSize: "25px", cursor: "pointer" }}
                  onClick={handleSubmit}
                  onPointerDown={(e: MouseEvent) => e.stopPropagation()}
                />
                <IoIosClose
                  className="custom-hover"
                  style={{ fontSize: "25px", cursor: "pointer" }}
                  onClick={() => setEdit(false)}
                  onPointerDown={(e: MouseEvent) => e.stopPropagation()}
                />
              </div>
            </Form>
          </Card.Header>
          <Card.Body data-no-dnd="true">
            <Card.Text>
              <Form className="d-flex justify-content-between" onSubmit={handleSubmit}>
                <textarea
                  name="content"
                  style={{ height: "100px", resize: "vertical" }}
                  value={data.content}
                  className="w-100 border-0"
                  onChange={handleChange}
                  onPointerDown={(e: MouseEvent) => e.stopPropagation()}
                />
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card
          ref={ref}
          key={card.cardId}
          className="col-1 mt-1"
          draggable="true"
          style={{ width: "14rem" }}
          onDragStart={(e: React.DragEvent) => {
            if (e.currentTarget.closest("[data-no-dnd]")) {
              e.preventDefault();
            }
          }}
        >
          <Card.Header data-no-dnd="true" className="d-flex justify-content-between">
            <span>{card.title}</span>
            <div>
              <GrFormEdit
                data-no-dnd="true"
                className="me-1 ms-5 fs-4 custom-hover-pen"
                style={{ cursor: "pointer" }}
                onClick={() => setEdit(true)}
                onPointerDown={(e: MouseEvent) => e.stopPropagation()}
              />
              <IoIosClose
                data-no-dnd="true"
                className="fs-3 custom-hover-bin"
                style={{ cursor: "pointer" }}
                onClick={() => setAlert(true)}
                onPointerDown={(e: MouseEvent) => e.stopPropagation()}
              />
            </div>
            {alert &&
                            <Alert variant="danger" className={`pt-1 w-100 d-flex justify-content-between alert-transition ${alert ? "alert-show" : ""}`}
                                style={{ position: "absolute", fontSize: "20px", top: 0, height: "45px", left: 0, transitionDelay: "5ms" }}
                                onPointerDown={(e) => e.stopPropagation()}
                            >
                                <Alert.Heading className="fs-6 ms-4 mt-2">Are You Sure</Alert.Heading>
                                <div className="mb-5 pb-5">
                                    <IoIosCheckmark className="ms-1 custom-hover" style={{ fontSize: "30px", cursor: "pointer" }} onClick={handleDelete} onPointerDown={(e) => e.stopPropagation()} />
                                    <IoIosClose className="ms-1 custom-hover" style={{ fontSize: "30px", cursor: "pointer" }} onClick={() => setAlert(false)} onPointerDown={(e) => e.stopPropagation()} />
                                </div>
                            </Alert>
                        }
          </Card.Header>
          <Card.Body data-no-dnd="true">
            <Card.Text>{card.content}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
});

export default EditCard;
