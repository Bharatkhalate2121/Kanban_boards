import { useState, useEffect, useContext } from "react";
import { Container, Card, Table } from "react-bootstrap";
import { ctx, ProjectData, useData } from "../../utils/Configuration";
import { useParams } from "react-router-dom";
import AddColumn from "./AddColumn";
import AddCardForm from "./AddCardForm";
import EditColumn from "./EditColumn";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Droppable, Draggable, handleDrag, sensor } from "../../utils/DragableUtils";

// Define types for columns and cards




export default function TableCardContainer() {
    const sensors = sensor(); // No KeyboardSensor here
    const { id } = useParams<{ id: string }>();
    const useCtx = useContext(ctx);
    const { data, cardData, setCardData } = useCtx ? useCtx : useData();

    const [toggleForm, setToggleForm] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("");
    const [projectId, setProjectId] = useState<number | null>(null);

    // Set project ID based on route param
    useEffect(() => {
        if (id) {
            const foundProject = data.find((project: { id: number }) => project.id == parseInt(id));
            if (foundProject) {
                setProjectId(foundProject.id);
            }
        }
    }, [id, data]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!projectId) return;

        const updatedData = cardData.map((project: ProjectData) => {
            if (project.projectId === projectId) {
                return {
                    ...project,
                    column: [
                        ...project.column,
                        {
                            columnId: project.column.length > 0
                                ? project.column[project.column.length - 1].columnId + 1
                                : 1,
                            title: title,
                            cards: [],
                        },
                    ],
                };
            }
            return project;
        });

        setCardData(updatedData);
        localStorage.setItem("cardData", JSON.stringify(updatedData));
        changeState();
    };

    const changeState = (e?: React.MouseEvent) => {
        setToggleForm(e?.currentTarget?.id === "addButton" ? false : true);
    };

    const submitTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    return (
        <Container className="mt-5 ms-5 p-5 gap-3 d-flex justify-content-start">
            <Table borderless responsive size="sm" className="bg-light">
                <tbody className="bg-light">





                    <DndContext sensors={sensors}
                        onDragEnd={(event: DragEndEvent) =>
                            handleDrag(projectId ?? 0, event, cardData, setCardData)
                        }
                    >
                        <tr className="bg-light">
                            {cardData.map((project: ProjectData) => {
                                if (project.projectId === projectId) {
                                    return project.column.map((column) => (
                                        <Droppable key={column.columnId} column={column}>
                                            <Card
                                                onDragOver={(e) => e.preventDefault()}
                                                key={column.columnId}
                                                className="col-1"
                                                draggable={false}
                                                style={{ width: "18rem" }}
                                            >
                                                <EditColumn column={column} projectId={projectId!} />
                                                <Card.Body>
                                                    {column.cards.map((card) => (
                                                        <Draggable
                                                            key={`${column.columnId}-${card.cardId}`}
                                                            card={card}
                                                            column={column}
                                                            projectId={projectId!}
                                                        />
                                                    ))}
                                                    <AddCardForm column={column} projectId={projectId!} />
                                                </Card.Body>
                                            </Card>
                                        </Droppable>
                                    ));
                                }
                                return null;
                            })}
                            <AddColumn
                                projectId={projectId ?? 0}
                                handleSubmit={handleSubmit}
                                changeState={changeState}
                                submitTitle={submitTitle}
                                toggleForm={toggleForm}
                            />
                        </tr>
                    </DndContext>
                </tbody>
            </Table>
        </Container>
    );
}
