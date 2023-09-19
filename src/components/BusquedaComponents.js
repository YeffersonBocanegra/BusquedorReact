import React, { useState, useEffect } from "react";//Define y Gestiona el estado en los componentes de React
import './Busqueda.css';// Importo estilos CSS
import usuarios from '../base.json'; // Importa el archivo JSON local

const BusquedaComponents = () => {
    const [users, setUsers] = useState([]);//para almacenar datos de usuarios inicia vacia
    const [search, setSearch] = useState("");//para almacenar el valor del cuadro de búsqueda
    const [filteredUsers, setFilteredUsers] = useState([]);//para almacenar los usuarios que coinciden con la búsqueda
    const [selectedUsers, setSelectedUsers] = useState([]);//para almacenar los usuarios seleccionados
    const [isLoading, setIsLoading] = useState(true);

    const showData = async () => {
        try {            
            setUsers(usuarios);
            setIsLoading(false);
        } catch (error) {
            console.error("Error al obtener datos:", error);
            setIsLoading(false);
        }
    }

    const searcher = (e) => {
        const searchText = e.target.value.toLowerCase();
        setSearch(searchText);

        const filteredResults = users.filter((user) =>
            searchText === "" || (user.name.toLowerCase().includes(searchText) && !selectedUsers.includes(user.id))
        );

        setFilteredUsers(filteredResults);
    };

    // Función para manejar la selección de una tarjeta
    const toggleSelection = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    // Función para manejar la eliminación de un usuario seleccionado
    const handleRemoveUser = (userId) => {
        setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    };

    useEffect(() => {
        showData();
    }, []);

    return (
        <div>
            <input value={search} onChange={searcher} type="text" placeholder="Búsqueda" className="form-control" />

            {(isLoading || search === "") ? (
                isLoading ? <p>Cargando datos...</p> : <p>Ingresa un término de búsqueda</p>
            ) : (
                <div className="user-cards">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className={`user-card ${selectedUsers.includes(user.id) ? "selected" : ""}`}
                            onClick={() => toggleSelection(user.id)}
                        >
                            <h3>{user.name}</h3>
                            <p>Usuario: {user.username}</p>
                            <p>Correo: {user.email}</p>
                            <p>Teléfono: {user.phone}</p>
                            {selectedUsers.includes(user.id) && (
                                <button onClick={() => handleRemoveUser(user.id)}>Eliminar</button>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {/* Tarjetas seleccionadas debajo del input de búsqueda */}
            <div className="selected-cards">
                {selectedUsers.map((userId) => {
                    // Encuentra el usuario seleccionado por su ID
                    const selectedUser = users.find((user) => user.id === userId);
                    return (
                        <div
                            key={userId}
                            className="user-card selected"
                        >
                            <h3>{selectedUser.name}</h3>
                            <p>Usuario: {selectedUser.username}</p>
                            <p>Correo: {selectedUser.email}</p>
                            <p>Teléfono: {selectedUser.phone}</p>
                            <button  className="user-card" onClick={() => handleRemoveUser(userId)}>Eliminar</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BusquedaComponents;






