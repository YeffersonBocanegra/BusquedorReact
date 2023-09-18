import React, { useState, useEffect } from "react";
import './Busqueda.css';

const BusquedaComponents = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const URL = 'https://jsonplaceholder.typicode.com/users';

    const showData = async () => {
        try {
            const respuesta = await fetch(URL);
            const data = await respuesta.json();
            setUsers(data);
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
            (searchText === "" || user.name.toLowerCase().includes(searchText)) &&
            !selectedUsers.includes(user.id)
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

    useEffect(() => {
        showData();
    }, []);

    return (
        <div>
            <input value={search} onChange={searcher} type="text" placeholder="Búsqueda" className="form-control" />

            {isLoading ? (
                <p>Cargando datos...</p>
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BusquedaComponents;




