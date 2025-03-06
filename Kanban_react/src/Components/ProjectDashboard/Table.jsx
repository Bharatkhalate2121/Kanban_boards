import React, { useContext, useEffect, memo } from "react";
import { Container, Table } from "react-bootstrap";
import { IoTrashBin } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { ctx } from "../../utils/Configuration.jsx";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
    

function ContentTable() {

    const { data, setData, cardData, setCardData } = useContext(ctx);

    let changeColor = (id) => {
        console.log(id);

        let tempData = data.map((row) => {
            if (row.id === id) {
                return { ...row, st: row.st = (row.st == 0) ? 1 : 0 };
            }
            return row;
        });
        setData(tempData);
        localStorage.setItem('data', JSON.stringify(tempData));
        
    }

    let deleteItem = (id) => {
        let tempData = data.filter((row) => {
            if (row.id !== id) {
                return row;
            }
        });
        setData(tempData);
        localStorage.setItem('data', JSON.stringify(tempData));
        
        let cardTempdata=cardData.filter((row)=>{
            if((row.projectId!=id)){
                return row;
            }
        })
        setCardData(cardTempdata);
        localStorage.setItem('cardData',JSON.stringify(cardTempdata));
    };



    return (
        <Container>
            <Table borderless responsive hover className="mt-5  border-bottom">
                <thead>
                    <tr className="border-bottom ">
                        <th>#</th>
                        <th>Project Name</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th colSpan={2} className="px-5">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            <td>
                                <FaStar className="fs-10" style={{
                                    "fontSize": "23px",
                                    "cursor": "pointer",
                                    transition: "0.3s",
                                    color: (row.st == 1) ? "#b38600" : "#918d89"

                                }} onClick={() => changeColor(row.id)} />
                            </td>
                            <td>{row.name}</td>
                            <td>{row.createdAt}</td>
                            <td>{row.updatedAt}</td>
                            <td className="px-5 d-flex">

                                <IoTrashBin className="text-danger fs-10 " style={{
                                    "fontSize": "23px",
                                    cursor: "pointer",

                                }}
                                onClick={() => deleteItem(row.id)}
                                />
                                <Link to={"http://localhost:5173/board/"+row.id}>
                                <IoIosArrowForward className="fs-10 ms-3 arrow-icon" style={{
                                    "fontSize": "23px",
                                    cursor: "pointer",
                                    color: "#0052CC"
                                }}
                                />
                                </Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


        </Container>
    );
}


export default memo(ContentTable);