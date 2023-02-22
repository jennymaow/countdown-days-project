import { useEffect, useState } from "react";
import Countdown from "./Countdown/Countdown";
import Card from "../ui components/Card";
import Button from "../ui components/Button";
import GridLayout from "../Layout/GridLayout";
import "./Form.css";
const Form = () => {
  const [error, setError] = useState("");
  const [editError, setEditError] = useState("");
  const [dates, setDates] = useState([]);
  const [newDate, setNewDate] = useState({
    projectname: "",
    date: "",
    image: "",
  });

  const [editDate, setEditDate] = useState({
    projectname: "",
    date: "",
    image: "",
  });

  const createDate = (ev) => {
    ev.preventDefault();
    if (!newDate.projectname || !newDate.date || !newDate.image) {
      setError("Introduce un valor válido");
    } else {
      setError("");
      //POST
      fetch(
        "https://63ecf23b32a0811723a597c4.mockapi.io/blinddates/countdown",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDate),
        }
      ).then((res) => {
        getDates();
      });
    }
  };

  //GET
  const getDates = async () => {
    const res = await fetch(
      "https://63ecf23b32a0811723a597c4.mockapi.io/blinddates/countdown"
    );
    const data = await res.json();
    setDates(data);
  };

  //DELETE
  const deleteDates = (id) => {
    fetch(
      `https://63ecf23b32a0811723a597c4.mockapi.io/blinddates/countdown/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      getDates();
    });
  };

  //EDIT

  const handleEditSubmit = (ev, id) => {
    ev.preventDefault();
    fetch(
      `https://63ecf23b32a0811723a597c4.mockapi.io/blinddates/countdown/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editDate),
      }
    ).then((res) => {
      getDates();
    });
  };
  useEffect(() => {
    getDates();
  }, []);

  return (
    <GridLayout>
      <section className="countdowns">
        {dates.map((date) => (
          <Card key={date.id} className="card" image={date.image}>
            <div className="card-buttons">
              <Button
                action={() => setEditDate(date)}
                source="https://res.cloudinary.com/dnb4ujbgr/image/upload/v1677098463/edit_FILL0_wght400_GRAD0_opsz48_fbrpgt.png"
                name="edit icon"
              />
              <Button
                action={() => deleteDates(date.id)}
                source="https://res.cloudinary.com/dnb4ujbgr/image/upload/v1677098032/delete_FILL0_wght400_GRAD0_opsz48_bxxqky.svg"
                name="delete icon"
              />
            </div>
            <div className="card-content">
              <h1 className="projectname">{date.projectname}</h1>
              <Countdown SelCountDownDate={date.date} />
            </div>
          </Card>
        ))}
      </section>
      <section className="forms">
      <form onSubmit={(ev) => createDate(ev)}>
      <h2>Create new project</h2>
        <input
          type="text"
          placeholder="Project name"
          onChange={(ev) =>
            setNewDate({ ...newDate, projectname: ev.target.value })
          }
        />
        <input
          type="date"
          onChange={(ev) => setNewDate({ ...newDate, date: ev.target.value })}
        />
        <input
          type="text"
          placeholder="image url"
          onChange={(ev) => setNewDate({ ...newDate, image: ev.target.value })}
        />
        <button type="submit">Create Date</button>
        <h1>{error}</h1>
      </form>

      <form onSubmit={(ev) => handleEditSubmit(ev, editDate.id)}>
      <h2>Edit project</h2>
        <input
          type="text"
          placeholder="City name"
          value={editDate.projectname}
          onChange={(ev) =>
            setEditDate({ ...editDate, projectname: ev.target.value })
          }
        />
        <input
          type="date"
          value={editDate.date}
          onChange={(ev) => setEditDate({ ...editDate, date: ev.target.value })}
        />
        <input
          type="text"
          placeholder="Image url"
          value={editDate.image}
          onChange={(ev) =>
            setEditDate({ ...editDate, image: ev.target.value })
          }
        />
        <button type="submit">Edit Date</button>
        <h1>{editError}</h1>
      </form>
      </section>
    </GridLayout>
  );
};

export default Form;
