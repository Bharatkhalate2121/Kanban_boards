import React, { useContext, useState } from "react";
import { IoIosAdd, IoIosClose, IoIosCheckmark } from "react-icons/io";
import { Button, Card, Form } from "react-bootstrap";
import { ctx } from "../../utils/Configuration";

export default function AddCardForm({ column, projectId }) {
    const { cardData, setCardData } = useContext(ctx);
    const [renderInputCard, setrenderInputCard] = useState(false);
    const [formData, setFormData] = useState({
        cardId: 0,
        content: "",
        title: ""
    });


    let getId = () => {
        if (column.cards.length !== 0) {
            let cardId = column.cards[column.cards.length - 1].cardId + 1;
            console.log(cardId);
            return cardId;
        }
        else {
            return 1;
        }
    }


    let handleChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, cardId: getId(), [e.target.name]: e.target.value })
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
        let updatedCardData = cardData.map(project => {
            if (project.projectId === projectId) {
                return {
                    ...project,
                    column: project.column.map(itrColumn => {
                        if (itrColumn.columnId === column.columnId) {
                            return {
                                ...itrColumn,
                                cards: [...itrColumn.cards, formData] // Adding new card
                            };
                        }
                        return itrColumn;
                    })
                };
            }
            return project;
        });

        
        setCardData(updatedCardData); // Assuming setCardData updates state
        localStorage.setItem("cardData",JSON.stringify(updatedCardData));
        setrenderInputCard(false)
    };


    return (
        <>
            {
                renderInputCard ?
                    <Form onSubmit={handleSubmit}>
                        <Card key={123} className="col-1 mt-1" draggable="true" style={{ width: '14rem' }}>
                            <Card.Header>
                                <input name="title" onChange={handleChange} className=" border-0 bg-white" style={{ outline: "none", boxShadow: "none", width: "75%" }} placeholder="Type title here..." type="text" />
                                {/* <IoIosCheckmark className="ms-2 custom-hover" style={{fontSize: "35px", cursor: "pointer"}} onClick={() => { setrenderInputCard(false) }}/> */}
                                <IoIosClose className="ms-2 custom-hover" style={{ fontSize: "35px", cursor: "pointer" }} onClick={() => { setrenderInputCard(false) }} />

                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <input name="content"  className="w-75 border-0" onChange={handleChange} style={{ outline: "none", boxShadow: "none" }} placeholder="enter description..." type="text" />
                                    <IoIosCheckmark type="submit" className="ms-2 custom-hover" style={{ fontSize: "35px", cursor: "pointer" }} onClick ={handleSubmit} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Form>

                    :
                    <Button className="mt-5 border rounded-1 custom-hover d-flex" variant="white" style={{ width: "100%" }} onClick={() => { setrenderInputCard(true) }}>
                        <IoIosAdd style={{ color: "black", fontSize: "25px" }} />
                        <h6 className="ms-2 mt-1">Add Task</h6>
                    </Button>

            }

        </>
    )

}