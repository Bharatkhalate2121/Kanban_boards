import { useState } from "react";
import { Navbar, Button, Breadcrumb } from "react-bootstrap";
import AddProject from "./AddProject";
import { useLocation, Link } from "react-router-dom";

export default function Header() {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const location = useLocation();


  return (

    <>
      <Navbar bg="dark" variant="dark" className="justify-content-between px-3">
        {/* Navbar Brand */}
        <Navbar.Brand href="#home">Projects</Navbar.Brand>



        {/* New Project Button */}
        <Button style={{ backgroundColor: "#0052CC" }} onClick={handleShow}>
          New Project
        </Button>
      </Navbar>

      {/* Modal for Adding a Project */}
      <AddProject handleClose={handleClose} show={show} />



      <Navbar bg="white" variant="light" className="justify-content-start ps-5">



        <Breadcrumb className="ms-5">
          <Breadcrumb.Item style={{ textDecoration: "none", color: "white" }}>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}> <span className="fs-6" style={{ textDecoration: "none", color: "black" }}>Projects</span></Link>
          </Breadcrumb.Item>
          {location.pathname.includes("/board/") && (
            <Breadcrumb.Item style={{ textDecoration: "none", color: "black" }} >
              <span className="fs-6" style={{ textDecoration: "none", color: "black" }}>Board</span>
            </Breadcrumb.Item>
          )}
        </Breadcrumb>

      </Navbar>

    </>
  );
}
