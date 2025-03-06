import React, { useState, useContext, forwardRef } from "react";
import { ctx } from "../../utils/Configuration.jsx";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
import { GrFormEdit } from "react-icons/gr";
import { Card, Form, Alert } from "react-bootstrap";

let EditCard = forwardRef(({ card, column, projectId, ...props }, ref) => {
    const [edit, setEdit] = useState(false);
    const [alert, setAlert] = useState(false);
    const [data, setData] = useState({
        title: card.title,
        content: card.content
    });

    let { cardData, setCardData } = useContext(ctx);

    let handleDelete = () => {
        let tempFormData = cardData.map((project) => {
            if (project.projectId === projectId) {
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
            } else {
                return project;
            }
        });

        setCardData(tempFormData);
        localStorage.setItem("cardData", JSON.stringify(tempFormData));
        setAlert(false);
    };

    let handleSubmit = (e) => {
        e.preventDefault();

        let tempCardData = cardData.map((project) => {
            if (project.projectId === projectId) {
                return {
                    ...project,
                    column: project.column.map((itrColumn) =>
                        itrColumn.columnId === column.columnId
                            ? {
                                ...itrColumn,
                                cards: itrColumn.cards.map((itrCard) =>
                                    itrCard.cardId === card.cardId
                                        ? { ...itrCard, ...data }
                                        : itrCard
                                ),
                            }
                            : itrColumn
                    ),
                };
            } else {
                return project;
            }
        });

        setCardData(tempCardData);
        localStorage.setItem("cardData", JSON.stringify(tempCardData));
        setEdit(false);
    };

    let handleChange = (e) => {
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
                    style={{ width: '14rem' }}
                    
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
                                onPointerDown={(e) => e.stopPropagation()} // Stop drag when interacting
                            />
                            <button type="submit" style={{ display: "none" }}></button>
                            <div>
                                <IoIosCheckmark className="me-1 custom-hover" style={{ fontSize: "25px", cursor: "pointer" }} onClick={handleSubmit} onPointerDown={(e) => e.stopPropagation()} />
                                <IoIosClose className="custom-hover" style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => setEdit(false)} onPointerDown={(e) => e.stopPropagation()} />
                            </div>
                        </Form>
                    </Card.Header>
                    <Card.Body data-no-dnd="true">
                        <Card.Text>
                            <Form className="d-flex justify-content-between" onSubmit={handleSubmit}>
                                <textarea
                                    type="text"
                                    name="content"
                                    style={{ height: "100px", resize: "vertical" }}
                                    value={data.content}
                                    className="w-100 border-0 "
                                    onChange={handleChange}
                                    onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when clicking textarea
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
                    style={{ width: '14rem' }}
                    onDragStart={(e) => {
                        if (e.target.closest("[data-no-dnd]")) {
                            e.preventDefault();
                        }
                    }}
                >
                    <Card.Header data-no-dnd="true" className="d-flex justify-content-between">
                        <span>{card.title}</span>
                        <div>
                            <GrFormEdit data-no-dnd="true" className="me-1 ms-5 fs-4 custom-hover-pen" style={{ cursor: "pointer" }} onClick={() => setEdit(true)} onPointerDown={(e) => e.stopPropagation()} />
                            <IoIosClose data-no-dnd="true" className="fs-3 custom-hover-bin" style={{ cursor: "pointer" }} onClick={() => setAlert(true)} onPointerDown={(e) => e.stopPropagation()} />
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