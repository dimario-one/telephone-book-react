// import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState,Component } from "react";
import {Button} from 'react-bootstrap'


function App() {

  const userValues = {
    userName: "",
    userAdress: "",
    userHome: "",
    userRoom: "",
    userConclusion: "",
  };

  
  const [data, setData] = useState(userValues);
  const [users, setUsers] = useState([]);
  const[findUser,setFindUser]=useState("");

  const handleRemove = () => {
   let index = JSON.parse(localStorage.getItem("index"));
   setUsers(users.filter((user, userIndex) => userIndex !== index));
  };

  const handleFindUser=()=>{setUsers(users.filter((user) => user.userName === findUser));}

 

  const [editUser, setEditUser] = useState({
    isEdit: false,
    userIndex: null,
  });

  const isFieldEmpty =
    data.userName &&
    data.userAdress &&
    data.userHome &&
    data.userRoom &&
    data.userConclusion;

  const handleSubmitUser = (e) => {
    e.preventDefault();
    if (isFieldEmpty) {
      if (editUser.isEdit) {
        const editedUsers = users;
        editedUsers.splice(editUser.userIndex, 1, data);
        setUsers(editedUsers);
        setEditUser({
          isEdit: false,
          userIndex: null,
        });
      } else {
        setUsers((prevState) => 
          [...prevState, data]
    );
      }

      setData(userValues);
    }
  };

  const hendleReset = () => {
    return setData(userValues);
  };

  const handleEdit = (curentUser, index) => {
    setData(curentUser);
    setEditUser({
      isEdit: true,
      userIndex: index,
    });
  };

  return (
    <div className="container w-100 h-100 mt-5">
      <div className=" container w-100 h-100 d-flex flex-row justify-content-between">
        <div className="w-75">
          <table className='table table-striped table-bordered'>
            <th className='text-center'>№</th>
            <th className='text-center'>Абонент</th>
            <th className='text-center'>Адрес</th>
            <th className='text-center'>Дом</th>
            <th className='text-center'>Квартира</th>
            <th className='text-center'>Примичание</th>
            <th className='text-center'>Действия</th>
            <tbody>
              {users.map((user, index) => (
                <tr>
                  <td scope="col">{index + 1}</td>
                  <td scope="col">{user.userName}</td>
                  <td scope="col">{user.userAdress}</td>
                  <td scope="col">{user.userHome}</td>
                  <td scope="col">{user.userRoom}</td>
                  <td scope="col">{user.userConclusion}</td>
                  <td scope="col">
                    <div className='d-flex flex-row justify-content-around'>
                      <Button
                        className=""
                        id='edit-user'
                        onClick={() => handleEdit(user, index)}
                      >
                        +
                      </Button>
                      <Button
                        className="ml-1"
                        id='remove-user'
                        onClick={() => {localStorage.setItem("index",JSON.stringify(index));handleRemove()}}
                      >
                        X
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='d-flex flex-column align-items-between'>
          <form  onSubmit={handleSubmitUser} onReset={hendleReset}>
            <input
              className='form-control w-100'
              placeholder="Введите абонента"
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  userName: e.target.value,
                }))
              }
              value={data.userName}
            />
            <input
            className='form-control w-100  mt-3'
              placeholder="Введите Адрес"
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  userAdress: e.target.value,
                }))
              }
              value={data.userAdress}
            />
            <input
              className='form-control w-100  mt-3'
              placeholder="Введите Дом"
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  userHome: e.target.value,
                }))
              }
              value={data.userHome}
            />
            <input
              className='form-control  w-100  mt-3'
              placeholder="Введите Квартиру"
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  userRoom: e.target.value,
                }))
              }
              value={data.userRoom}
            />
            <input
              className='form-control  w-100 mt-3'
              placeholder="Введите Примичание"
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  userConclusion: e.target.value,
                }))
              }
              value={data.userConclusion}
            />
             <input
               className='form-control  w-100  mt-3'
              placeholder="поиск"
              onChange={(e) =>setFindUser(e.target.value)}
            />
            <div className="d-flex flex-row justify-content-between mt-3 " id='actions'>
              <Button className="button" onClick={handleFindUser}>Поиск</Button>
              <Button  disabled={!isFieldEmpty} type="submit">
                {editUser.isEdit ? "Редактировать" :"Добавить"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
