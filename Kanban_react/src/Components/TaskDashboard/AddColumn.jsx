import React from "react";
import { IoIosAdd, IoIosWarning, IoIosCheckmark, IoIosClose } from "react-icons/io";
import { Container, Row, Col } from "react-bootstrap";


export default function AddColumn({projectId, handleSubmit, changeState, submitTitle, toggleForm}){
    return(
        <>
            {(projectId!==0)?
           <th className="bg-light">

           {toggleForm ?


             <IoIosAdd className="mt-1  shadow border rounded custom-hover " id="addButton" onClick={(e) => changeState(e)} style={{ fontSize: "40px", cursor: 'pointer' }} />


             :
             <form className="" onSubmit={(e)=>{handleSubmit(e)}} style={{}}>
               <input type="text" placeholder="Enter the title" onChange={(e) => { submitTitle(e) }} />
               <Row className="mt-2">
                 <Col></Col>

                 <Col></Col>
                 <Col >
                   <IoIosCheckmark onClick={handleSubmit} className="ms-1 shadow border rounded custom-hover" style={{ fontSize: "30px", cursor: 'pointer', }} />
                   <IoIosClose id="closeButton" className="ms-1 shadow border rounded custom-hover" style={{ fontSize: "30px", cursor: 'pointer', right: 0 }} onClick={(e) => {
                     changeState(e)
                   }} /></Col>
               </Row>
             </form>
           }

         </th>
           :
           <Container fluid className="">
            <h1 className="text-danger">404 INVALID REQUEST  <IoIosWarning className="text-danger mb-2"/></h1>
            
           </Container>
           } 
        </>
    )
}