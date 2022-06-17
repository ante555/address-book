import { useEffect, useState } from "react";
import "../Signup/formInput.scss";
import FormInput from "../Signup/FormInput";
import { collection, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";

const Contact = () => {
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    number: "",
    numberType: "",
    favorite: false,
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email adresa mora biti validna!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "firstName",
      type: "text",
      placeholder: "Ime",
      errorMessage: "Ime mora sadrzavati manje od 100 znakova!",
      label: "Ime",
      pattern: `^.{0,100}$`,
      required: true,
    },
    {
      id: 3,
      name: "lastName",
      type: "text",
      placeholder: "Prezime",
      errorMessage: "Prezime mora sadrzavati manje od 300 znakova!",
      label: "Prezime",
      pattern: `^.{0,300}$`,
      required: true,
    },
    {
      id: 4,
      name: "number",
      type: "text",
      placeholder: "+3859x xxx xxxx",
      errorMessage: "Nije validan broj!",
      label: "Broj",
      pattern: `^(+{1,2})?{3}?[.-]{3}[.-]{4}$`,
      required: true,
    },
    {
      id: 5,
      name: "numberType",
      type: "select",
      placeholder: "Telefon, Mobilni ili Pager",
      errorMessage: "Vrsta kontakta može biti Telefon, Mobilni ili Pager!",
      label: "Vrsta kontakta",
      pattern: `(Telefon)|(Mobilni)|(Pager)`,
      required: true,
    },
    {
      id: 8,
      name: "birthDate",
      type: "date",
      placeholder: "Datum rođenja",
      errorMessage: "Datum rođenja mora biti validan!",
      label: "Datum rođenja",
      required: true,
    },
  ];

  console.log(values);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { updateId } = useParams();
  const usersCollectionRef = collection(db, "contacts");
  const navigate = useNavigate();

  useEffect(() => {
    if (updateId) {
      const userCollectionRef = doc(db, "contacts", updateId);
      const getUsers = async () => {
        return await getDoc(userCollectionRef);
      };
      getUsers().then((res) => setValues(res.data()));
    }
  }, [updateId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!updateId) {
      await addDoc(usersCollectionRef, {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        birthDate: values.birthDate,
        numberType: values.numberType,
        number: values.number,
        favorite: false,
      });
      navigate("/adresar");
    } else {
      const userDoc = doc(db, "contacts", updateId);
      const newField = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        birthDate: values.birthDate,
        numberType: values.numberType,
        number: values.number,
      };
      await updateDoc(userDoc, newField);
      navigate("/adresar");
    }
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>{!updateId ? "Novi kontakt" : "Ažuriraj kontakt"}</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>{!updateId ? "Dodaj kontakt" : "Ažuriraj"}</button>
      </form>
    </div>
  );
};

export default Contact;
