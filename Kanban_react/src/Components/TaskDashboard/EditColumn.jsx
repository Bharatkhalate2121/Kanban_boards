import React, { useState, useContext } from "react";
import { Card, Form, Alert } from "react-bootstrap";
import { ctx } from "../../utils/Configuration.jsx";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoTrashBin } from "react-icons/io5";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";


export default function EditColumn({ column, projectId }) {

    const { cardData, setCardData } = useContext(ctx);
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState("");
    const [alert, setAlert] = useState(false);

    let handleChange = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    let handleSubmit = (e) => {
        e.preventDefault();

        let tempCardData = cardData.map((project) => {
            if (project.projectId === projectId) {
                return {
                    ...project,
                    column: project.column.map((itrColumn) =>
                        itrColumn.columnId === column.columnId
                            ? { ...itrColumn, title: title } // Correctly updating title
                            : itrColumn
                    ),
                };
            }
            else{
                return project;
            }

        });


        setCardData(tempCardData);
        localStorage.setItem('cardData', JSON.stringify(tempCardData));
        setEdit(false);
    };


    let handleDelete = () => {
        let tempCardData = cardData.map((project) => {
            if (project.projectId === projectId) {
                return {
                    ...project,
                    column: project.column.filter(itrColumn => itrColumn.columnId !== column.columnId) // Removes the matching column
                }
            }
            else {
                return project;
            }
        });

        // Update state (if using React state)
        setCardData(tempCardData);
        localStorage.setItem("cardData", JSON.stringify(tempCardData));
        setAlert(false); // Close alert after deletion
    };



    return (
        <>
            {edit ? (
                <Card.Header className="d-flex justify-content-between"     >
                    <Form className="d-flex justify-content-between" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            defaultValue={column.title}
                            autoFocus
                            className="w-75"
                            onChange={handleChange}
                        />
                        <div>
                            <IoIosCheckmark className=" me-1 custom-hover" style={{ fontSize: "29px" }} type="submit" onClick={handleSubmit} />
                            <IoIosClose className=" custom-hover" style={{ fontSize: "29px" }} onClick={() => setEdit(false)} />
                        </div>
                    </Form>
                </Card.Header>
            ) : (
                <Card.Header className="d-flex justify-content-between">
                    <span>{column.title}</span> {/* Wrapped column.title in a span */}
                    <div>
                        <AiTwotoneEdit
                            className="me-3 fs-5 custom-hover-pen"
                            style={{ cursor: "pointer" }}
                            onClick={() => setEdit(true)} // Enable edit mode
                        />
                        <IoTrashBin className="fs-5 custom-hover-bin" style={{ cursor: "pointer" }} onClick={() => setAlert(true)} />

                    </div>
                    {alert &&
                        <Alert variant="danger" className={`pt-0 w-100 d-flex justify-content-between alert-transition ${alert ? "alert-show" : ""}`} style={{ position: "absolute", fontSize: "20px", top: 0, height: "40px", left: 0, transitionDelay: "5ms", }} >
                            <Alert.Heading className="fs-6 ms-4 mt-2"  >Confirm deletion</Alert.Heading>
                            <div className="mb-5 pb-5">
                                <IoIosCheckmark className="  ms-3  custom-hover" style={{ fontSize: "40px", cursor: "pointer" }} onClick={handleDelete} />
                                <IoIosClose className="ms-1 custom-hover " style={{ fontSize: "40px", cursor: "pointer" }} onClick={() => setAlert(false)} />
                            </div>
                        </Alert>
                    }

                </Card.Header>
            )}
        </>
    )
}