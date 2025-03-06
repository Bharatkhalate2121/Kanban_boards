import {  memo, useContext } from "react";
import { Container, Table } from "react-bootstrap";
import { IoTrashBin } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { ctx, useData} from "../../utils/Configuration";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";



function ContentTable() {
  const useCtx = useContext(ctx);
  const { data, setData, cardData, setCardData }=useCtx?useCtx:useData();

  const changeColor = (id: number) => {
    console.log(id);

    const tempData = data.map((row) => {
      if (row.id === id) {
        return { ...row, st: row.st === 0 ? 1 : 0 };
      }
      return row;
    });

    setData(tempData);
    localStorage.setItem("data", JSON.stringify(tempData));
  };

  const deleteItem = (id: number) => {
    const tempData = data.filter((row) => row.id !== id);
    setData(tempData);
    localStorage.setItem("data", JSON.stringify(tempData));

    const cardTempData = cardData.filter((row) => row.projectId !== id);
    setCardData(cardTempData);
    localStorage.setItem("cardData", JSON.stringify(cardTempData));
  };

  return (
    <Container>
      <Table borderless responsive hover className="mt-5 border-bottom">
        <thead>
          <tr className="border-bottom">
            <th>#</th>
            <th>Project Name</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th colSpan={2} className="px-5">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>
                <FaStar
                  className="fs-10"
                  style={{
                    fontSize: "23px",
                    cursor: "pointer",
                    transition: "0.3s",
                    color: row.st === 1 ? "#b38600" : "#918d89",
                  }}
                  onClick={() => changeColor(row.id)}
                />
              </td>
              <td>{row.name}</td>
              <td>{row.createdAt}</td>
              <td>{row.updatedAt}</td>
              <td className="px-5 d-flex">
                <IoTrashBin
                  className="text-danger fs-10"
                  style={{
                    fontSize: "23px",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteItem(row.id)}
                />
                <Link to={`/board/${row.id}`}>
                  <IoIosArrowForward
                    className="fs-10 ms-3 arrow-icon"
                    style={{
                      fontSize: "23px",
                      cursor: "pointer",
                      color: "#0052CC",
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
