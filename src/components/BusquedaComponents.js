import React, {useState, useEffect} from "react";
import './Busqueda.css'
const BusquedaComponents = () => {
    //setear los hooks de useState
    const [ users, setUsers ] = useState([]);
    const [ search, setSearch ] = useState("");

    //funcion para traer los datos de la API
    const URL = 'https://jsonplaceholder.typicode.com/users';//Direcion con archivo json de datos

    const showData = async () => {
        const respuesta = await fetch(URL);
        const data = await respuesta.json();
        //console.log(data);
        setUsers(data);
    }
    
    //Funcion de Busqueda
    const searcher = (e) => {
        setSearch(e.target.value);
        //console.log(e.target.value)
    }

    //Metodo de filtrado
    //const results = !search ? users : users.filter((dato)=> dato.name.toLowerCase().includes(search.toLocaleLowerCase));
    let results = []
    if(!search)
    {
        results = users
    }else{
        results = users.filter( (dato) =>
        dato.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    useEffect( () =>{
        showData();
    }, []);
   
    //Renderizo la vista de nuestro componente
    return (
        <div>
            <input value={search} onChange={searcher} type="text" placeholder="Busqueda" className="form-control"></input>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        results.map( (user) =>(
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default BusquedaComponents;

