import { useState,  FormEvent, useContext } from "react";
import { IoIosAdd, IoIosClose, IoIosCheckmark } from "react-icons/io";
import { Button, Card, Form } from "react-bootstrap";
import { ctx , useData} from "../../utils/Configuration";

interface CardItem {
  cardId: number;
  content: string;
  title: string;
}

interface Column {
  columnId: number;
  cards: CardItem[];
}

interface Props {
  column: Column;
  projectId: number;
}

export default function AddCardForm({ column, projectId }: Props) {
  const useCtx = useContext(ctx);
  const { cardData, setCardData }=useCtx?useCtx:useData();

  const [renderInputCard, setRenderInputCard] = useState(false);
  const [formData, setFormData] = useState<CardItem>({
    cardId: 0,
    content: "",
    title: "",
  });

  const getId = (): number => {
    if (column.cards.length !== 0) {
      return column.cards[column.cards.length - 1].cardId + 1;
    }
    return 1;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, cardId: getId(), [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill in both title and content.");
      return;
    }

    const updatedCardData = cardData.map((project) => {
      if (project.projectId === projectId) {
        return {
          ...project,
          column: project.column.map((itrColumn) => {
            if (itrColumn.columnId === column.columnId) {
              return {
                ...itrColumn,
                cards: [...itrColumn.cards, formData],
              };
            }
            return itrColumn;
          }),
        };
      }
      return project;
    });

    setCardData(updatedCardData);
    localStorage.setItem("cardData", JSON.stringify(updatedCardData));
    setRenderInputCard(false);
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
                                <IoIosClose className="ms-2 custom-hover" style={{ fontSize: "35px", cursor: "pointer" }} onClick={() => { setRenderInputCard(false) }} />

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
                    <Button className="mt-5 border rounded-1 custom-hover d-flex" variant="white" style={{ width: "100%" }} onClick={() => { setRenderInputCard(true) }}>
                        <IoIosAdd style={{ color: "black", fontSize: "25px" }} />
                        <h6 className="ms-2 mt-1">Add Task</h6>
                    </Button>

            }

        </>
  );
}
