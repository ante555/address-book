import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { collection } from "firebase/firestore";
import Header from "../Header/Header";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import "./details.scss";

const Details = () => {
  const { detailId } = useParams();

  const [contacts, setContacts] = useState([]);
  // const usersCollectionRef = collection(db, "contacts");
  const navigate = useNavigate();

  const handleFavorite = async (id, favorite) => {
    const userDoc = doc(db, "contacts", id);
    const newField = { favorite: !favorite };
    await updateDoc(userDoc, newField).then(
      setContacts((prevState) =>
        prevState.map((contact) =>
          contact.id === id
            ? { ...contact, favorite: !contact.favorite }
            : contact
        )
      )
    );
  };

  const deleteContact = async (id) => {
    const userDoc = doc(db, "contacts", id);
    await deleteDoc(userDoc);
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== id)
    );
    navigate("/adresar");
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(collection(db, "contacts"));
      setContacts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div className="details--page">
      <Header />
      <button className="sort--button" onClick={() => navigate("/adresar")}>
        Natrag
      </button>
      <div className="wrapper-items">
        {contacts.map((contact) => {
          if (contact.id !== detailId) {
            return null;
          } else {
            return (
              <div className="container-items" key={contact.id}>
                <div className="card-item-details">
                  <div className="text--container">
                    <h3 className="item-text--details">
                      {" "}
                      Prezime: {contact.lastName}
                    </h3>
                  </div>
                  <div className="text--container">
                    <h3 className="item-text--details">
                      {" "}
                      Ime: {contact.firstName}
                    </h3>
                  </div>
                  <div className="text--container">
                    <h3 className="item-text--details">
                      {" "}
                      Email: {contact.email}
                    </h3>
                  </div>
                  <div className="text--container">
                    <h3 className="item-text--details">
                      {" "}
                      Uređaj: {contact.numberType}
                    </h3>
                  </div>
                  <div className="text--container">
                    <h3 className="item-text--details">
                      Broj: {contact.number}
                    </h3>
                  </div>
                  <div className="text--container">
                    <h3 className="item-text--details">
                      Datum rođenja: {contact.birthDate}
                    </h3>
                  </div>
                  <div className="icons-container-details">
                    <IconButton
                      id="star-icon-button"
                      onClick={() =>
                        handleFavorite(contact.id, contact.favorite)
                      }
                    >
                      {contact.favorite === false ? (
                        <StarBorderOutlinedIcon />
                      ) : (
                        <StarIcon sx={{ color: "yellow" }} />
                      )}
                    </IconButton>

                    <EditOutlinedIcon
                      onClick={() => navigate(`/kontakt/${contact.id}`)}
                    />
                    <CloseOutlinedIcon
                      onClick={() => deleteContact(contact.id)}
                    />
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Details;
