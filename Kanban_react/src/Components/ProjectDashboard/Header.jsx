import React from "react";
import { Button, Navbar } from "react-bootstrap";
import AddProject from "./AddProject";
import  { useState } from "react";
import {  Modal } from "react-bootstrap";


export default function Header() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar bg="dark" variant="dark" className="justify-content-between">
                <Navbar.Brand href="#home" className="ms-3">Projects</Navbar.Brand>
                <Button style={{ backgroundColor: "#0052CC" }} onClick={handleShow} className="me-3">
                    New Project
                </Button>
                <AddProject handleShow={handleShow} handleClose={handleClose} show={show}/>
            </Navbar>

            
        </>
    );
}

