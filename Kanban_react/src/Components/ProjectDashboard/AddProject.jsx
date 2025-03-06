import React from "react";
import { Modal, Button } from "react-bootstrap";
import { ctx } from "../../utils/Configuration.jsx";
import { useContext } from "react";


export default function AddProject({ handleShow, handleClose, show }) {

    const { data, setData, cardData, setCardData } = useContext(ctx);

    let getId = () => {
        let id = 0;
        data.map((row) => {
            if (row.id > id) {
                id = row.id;
            }
        });
        return id + 1;
    }

    const [formData, setFormData] = React.useState({
        id: 2250,
        name: "",
        createdAt: "",
        updatedAt: "",
        st: 0
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            id: getId(),
            createdAt: new Date().toLocaleDateString(),
            updatedAt: new Date().toLocaleDateString()
        });



    }

    const handleSubmit = (e) => {

        e.preventDefault();
        setData([...data, formData]);
        let json_data = JSON.stringify([...data, formData]);
        localStorage.setItem('data', json_data);
        let tempCardData = {
            projectId: formData.id,
            column: [
                {
                    columnId: 1,
                    title: "To DO",
                    cards: []
                },
                {
                    columnId: 2,
                    title: "In Progress",
                    cards: []
                },
                {
                    columnId: 3,
                    title: "Completed",
                    cards: []
                }
            ]
        };
        setCardData([...cardData, tempCardData]);
        let jsonCardData = [...cardData, tempCardData];
        localStorage.setItem("cardData", JSON.stringify(jsonCardData));
        handleClose();
    }


    return (
        <Modal show={show} onHide={handleClose} className="mt-5">
            <Modal.Header closeButton>
                <Modal.Title>Create New Project</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>

                    <input type="text" placeholder="Project Name" name="name" value={formData.name} className="form-control mt-2" onChange={(e) => { handleChange(e) }} />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <input type="submit" className="btn btn-success" />


                </Modal.Footer>
            </form>
        </Modal>
    );
}