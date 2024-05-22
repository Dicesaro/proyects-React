// import axios from "axios";
import style from "./register.module.css";
import React, { useState, useEffect } from "react";

const initialForm = {
  name: "",
  email: "",
  address: "",
  price: "",
  roomtype: "",
  phoneNumber: "",
  departments: "",
};

// const domain = "http://192.168.18.104:3000";
// const getDepartments = async () => {
//   const { data } = await axios.get(`${domain}/api/departments`);
//   console.log(data);
//   return data;
// };

const InputData = ({ text, type, onChange, name, error }) => {
  return (
    <div className={style.input_data}>
      <label>{text}</label>
      <input type={type} onChange={onChange} name={name} />
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
};

export const Register = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
}) => {
  const [formData, setFormData] = useState(initialForm);
  const [imageURL, setImageURL] = useState(null);
  const [errors, setErrors] = useState({});
  // const [departaments, setDepartments] = useState([]);
  // useEffect(() => {
  //   getDepartments().then((data) => setDepartments(data));
  // }, []);

  useEffect(() => {
    if (dataToEdit) {
      setFormData(dataToEdit);
    } else {
      setFormData(initialForm);
    }
  }, [dataToEdit]);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files.length > 0) {
      const file = files[0];
      const base64 = await fileToBase64(file);
      setImageURL(base64);
      setFormData({
        ...formData,
        [name]: base64,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name) errors.name = "El nombre es requerido";
    if (!formData.email) errors.email = "El correo es requerido";
    if (!formData.address) errors.address = "La dirección es requerida";
    if (!formData.price) errors.price = "El precio es requerido";
    if (!formData.roomtype)
      errors.roomtype = "El tipo de habitación es requerido";
    if (!formData.phoneNumber)
      errors.phoneNumber = "El número de teléfono es requerido";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      if (dataToEdit) {
        updateData(formData);
      } else {
        createData(formData);
      }
      handleReset();
    } else {
      setErrors(errors);
    }
    console.log(formData);
  };

  const handleReset = () => {
    setFormData(initialForm);
    setDataToEdit(null);
    setImageURL(null);
    setErrors({});
  };

  return (
    <>
      <section className={style.section_hoteles}>
        <h1>Registro de Hotel</h1>
        <form onSubmit={handleSubmit} className={style.form_hoteles}>
          <InputData
            type="text"
            name="name"
            text="Nombre:"
            onChange={handleChange}
            error={errors.name}
          />
          <InputData
            type="email"
            name="email"
            text="Correo:"
            onChange={handleChange}
            error={errors.email}
          />
          <InputData
            type="text"
            name="address"
            text="Direccion:"
            onChange={handleChange}
            error={errors.address}
          />
          <InputData
            type="number"
            name="price"
            text="Precio:"
            onChange={handleChange}
            error={errors.price}
          />
          <InputData
            type="text"
            name="roomtype"
            text="Tipo de habitacion:"
            onChange={handleChange}
            error={errors.roomtype}
          />
          <InputData
            type="tel"
            name="phoneNumber"
            text="Numero de telefono:"
            onChange={handleChange}
            error={errors.phoneNumber}
          />
          <InputData
            type="file"
            name="photo"
            text="Foto:"
            onChange={handleChange}
            error={errors.photo}
          />

          {imageURL && <img src={imageURL} alt="Imagen" />}

          {/* <div className={style.input_data}>
            <label>Departamentos</label>
            <select name="" id="">
              <option value="1">1</option>
              {departaments?.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div> */}
          <button>Registrar</button>
        </form>
      </section>
    </>
  );
};
