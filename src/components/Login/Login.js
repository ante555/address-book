import { useState } from "react";
import "../Signup/signup.scss";
import FormInput from "../Signup/FormInput";
import { UseAuth } from "../../AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { logIn } = UseAuth();

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Nije validna email adresa!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Zaporka",
      errorMessage:
        "Zaporka treba biti duga 8-20 znakova i uključivati barem 1 veliko slovo, 1 broj i 1 posebni znak!",
      label: "Zaporka",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logIn(values.email, values.password);
      navigate("/adresar");
    } catch {
      setError("Prijava nije uspjela");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Prijava</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button disabled={loading}>Potvrdi</button>
        <span>
          Trebate račun? <Link to="/signup">Registrirajte se</Link>
        </span>
        <br></br>
        <span className="span--error">{error}</span>
      </form>
    </div>
  );
};

export default Login;
