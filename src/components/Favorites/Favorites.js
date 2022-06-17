import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "../Address-book/address-book.scss";
import SearchBar from "../Searchbar/Searchbar";
import { Pagination } from "../Pagination/Pagination";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const Favorites = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [descending, setDescending] = useState(false);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const lastPost = currentPage * postsPerPage;
  const firstPost = lastPost - postsPerPage;

  // pagination function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //load more contacts function
  const handleLoadMore = () => {
    if (postsPerPage === 5) {
      setPostsPerPage(15);
    } else {
      setPostsPerPage(5);
    }
  };

  //bookmark favorites function
  const handleFavorite = async (id, favorite) => {
    const userDoc = doc(db, "contacts", id);
    const newField = { favorite: !favorite };
    await updateDoc(userDoc, newField).then(
      setFilteredContacts((prevState) =>
        prevState.map((contact) =>
          contact.id === id
            ? { ...contact, favorite: !contact.favorite }
            : contact
        )
      )
    );
  };

  //deleting contact function
  const deleteContact = async (id) => {
    const userDoc = doc(db, "contacts", id);
    await deleteDoc(userDoc);
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== id)
    );
  };

  // frontend searchbar filter
  useEffect(() => {
    if (text) {
      const filter = contacts.filter(
        (contact) =>
          contact.lastName.toLowerCase().includes(text.toLowerCase()) ||
          contact.firstName.toLowerCase().includes(text.toLowerCase()) ||
          contact.email.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContacts(filter);
    } else {
      setFilteredContacts(contacts);
    }
  }, [text, contacts]);

  // sort ascending and descending function
  const handleSort = () => {
    const getUsersDesc = async () => {
      const data = await getDocs(
        query(collection(db, "contacts"), orderBy("lastName", "desc"))
      );
      const cont = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setFilteredContacts(cont.filter((c) => c.favorite === true));
      setContacts(cont.filter((c) => c.favorite === true));
    };

    const getUsersAsc = async () => {
      const data = await getDocs(
        query(collection(db, "contacts"), orderBy("lastName", "asc"))
      );
      const cont = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setFilteredContacts(cont.filter((c) => c.favorite === true));
      setContacts(cont.filter((c) => c.favorite === true));
    };

    if (descending === false) {
      getUsersDesc();
      setDescending(true);
    } else {
      getUsersAsc();
      setDescending(false);
    }
  };

  //cloud firestore fetch contacts function
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(
        query(collection(db, "contacts"), orderBy("lastName"))
      );

      const cont = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setContacts(cont.filter((c) => c.favorite === true));
      setFilteredContacts(cont.filter((c) => c.favorite === true));
    };

    getUsers();
  }, []);

  return (
    <>
      <Header />
      <SearchBar text={text} setText={setText} />
      <div>
        <button className="sort--button" onClick={handleSort}>
          {descending === false ? "Sortiraj Z-A" : "Sortiraj A-Z"}
        </button>
        <button className="sort--button" onClick={() => navigate("/adresar")}>
          Natrag
        </button>
      </div>
      <div className="wrapper-items">
        {filteredContacts.slice(firstPost, lastPost).map((contact) => {
          return (
            <div className="container-items" key={contact.id}>
              <div className="card-item">
                <div className="text--container">
                  <h3
                    className="item-text"
                    onClick={() => navigate(`/kontakt/detalji/${contact.id}`)}
                  >
                    {contact.lastName}
                  </h3>
                </div>
                <div className="text--container">
                  <h3 className="item.text">{contact.firstName}</h3>
                </div>
                <div className="text--container">
                  <h3 className="item-text">{contact.email}</h3>
                </div>
                <div className="icons-container">
                  <IconButton
                    id="star-icon-button"
                    onClick={() => handleFavorite(contact.id, contact.favorite)}
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
        })}
      </div>
      <button className="sort--button" onClick={handleLoadMore}>
        {postsPerPage < 6 ? "Učitaj više" : "Učitaj manje"}
      </button>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={
          filteredContacts.filter((contact) => contact.favorite === true).length
        }
        paginate={paginate}
      />
    </>
  );
};

export default Favorites;
