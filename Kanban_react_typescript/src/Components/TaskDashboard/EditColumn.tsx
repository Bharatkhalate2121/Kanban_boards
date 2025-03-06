import { useState, useRef, useEffect, useContext } from "react";
import { Card, Form, Alert } from "react-bootstrap";
import { ctx, ProjectData, useData } from "../../utils/Configuration";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoTrashBin } from "react-icons/io5";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";

// Define TypeScript props
interface ColumnProps {
    column: {
        columnId: number;
        title: string;
    };
    projectId: number;
}

export default function EditColumn({ column, projectId }: ColumnProps) {
    const useCtx = useContext(ctx);
  const {  cardData, setCardData }=useCtx?useCtx:useData();

    const [edit, setEdit] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(column.title);
    const [alert, setAlert] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when edit mode is activated
    useEffect(() => {
        if (edit && inputRef.current) {
            inputRef.current.focus();
        }
    }, [edit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (title.trim() === "") {
            setEdit(false);
            return;
        }

        const updatedCardData = cardData.map((project: ProjectData) =>
            project.projectId === projectId
                ? {
                    ...project,
                    column: project.column.map((itrColumn) =>
                        itrColumn.columnId === column.columnId
                            ? { ...itrColumn, title: title }
                            : itrColumn
                    ),
                }
                : project
        );

        setCardData(updatedCardData);
        localStorage.setItem("cardData", JSON.stringify(updatedCardData));
        setEdit(false);
    };

    const handleDelete = () => {
        const updatedCardData = cardData.map((project: ProjectData) =>
            project.projectId === projectId
                ? {
                    ...project,
                    column: project.column.filter(
                        (itrColumn) => itrColumn.columnId !== column.columnId
                    ),
                }
                : project
        );

        setCardData(updatedCardData);
        localStorage.setItem("cardData", JSON.stringify(updatedCardData));
        setAlert(false);
    };

    return (
        <>
            {edit ? (
                <Card.Header className="d-flex justify-content-between">
                    <Form className="d-flex justify-content-between w-100" onSubmit={handleSubmit}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={title}
                            className="w-75 border-0"
                            onChange={handleChange}
                        />
                        <div>
                            <IoIosCheckmark
                                className="me-1 custom-hover"
                                style={{ fontSize: "29px", cursor: "pointer" }}
                                onClick={handleSubmit}
                            />
                            <IoIosClose
                                className="custom-hover"
                                style={{ fontSize: "29px", cursor: "pointer" }}
                                onClick={() => setEdit(false)}
                            />
                        </div>
                    </Form>
                </Card.Header>
            ) : (
                <Card.Header className="d-flex justify-content-between">
                    <span>{column.title}</span>
                    <div>
                        <AiTwotoneEdit
                            className="me-3 fs-5 custom-hover-pen"
                            style={{ cursor: "pointer" }}
                            onClick={() => setEdit(true)}
                        />
                        <IoTrashBin
                            className="fs-5 custom-hover-bin"
                            style={{ cursor: "pointer" }}
                            onClick={() =>{
                                console.log("cliccked");
                                 setAlert(true)}}
                        />
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
    );
}
