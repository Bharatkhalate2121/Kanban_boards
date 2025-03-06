import  { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ctx, useData } from "../../utils/Configuration";

interface AddProjectProps {
  handleClose: () => void;
  show: boolean;
}

interface Project {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  st: number;
}

interface card{
  cardId:number;
  title:string;
  content:string;
}

interface CardColumn {
  columnId: number;
  title: string;
  cards: card[]; // Replace 'any' with a more specific type if known
}

interface CardData {
  projectId: number;
  column: CardColumn[];
}

export default function AddProject({handleClose, show }: AddProjectProps) {
  const useCtx = useContext(ctx);
  const { data, setData, cardData, setCardData }=useCtx?useCtx:useData();

  
  const getId = (): number => {
    let id = 0;
    data.forEach((row: Project) => {
      if (row.id > id) {
        id = row.id;
      }
    });
    return id + 1;
  };

  const [formData, setFormData] = useState<Project>({
    id: 2250,
    name: "",
    createdAt: "",
    updatedAt: "",
    st: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
      id: getId(),
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
    }));
    console.log("data",data);
    console.log(formData)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedData:Project[] = [...data, formData];
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));

    const tempCardData: CardData = {
      projectId: formData.id,
      column: [
        { columnId: 1, title: "To DO", cards: [] },
        { columnId: 2, title: "In Progress", cards: [] },
        { columnId: 3, title: "Completed", cards: [] },
      ],
    };

    const updatedCardData = [...cardData, tempCardData];
    setCardData(updatedCardData);
    localStorage.setItem("cardData", JSON.stringify(updatedCardData));

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} className="mt-5">
      <Modal.Header closeButton>
        <Modal.Title>Create New Project</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <input
            type="text"
            placeholder="Project Name"
            name="name"
            value={formData.name}
            className="form-control mt-2"
            onChange={handleChange}
          />
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
