import React, {useEffect, useState} from "react";

import "./styles.css";

import api from './services/api';

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        const initialLoad = async () => {
            const res = await api.get('repositories');

            if ( res.status === 200 ) {
                const repositories = res.data;
                setRepositories(repositories);
            }
        }

        initialLoad();
    }, []);

    async function handleAddRepository() {
        const payload = {
            title: `Rockeseat Bootcamp - ${Date.now()}`,
            url: 'https://app.rocketseat.com.br',
            techs: ['Node.js', 'ReactJS', 'React Native']
        };

        const res = await api.post('repositories', payload);

        if ( res.status === 200 ) {
            const repository = res.data;
            setRepositories([...repositories, repository]);
        }
    }

    async function handleRemoveRepository(id) {
        const res = await api.delete(`repositories/${id}`);

        if ( res.status === 204 ) {
            const repos = repositories.filter(r => r.id !== id);
            setRepositories(repos); 
        }
    }

    return (
        <div>
            <ul data-testid="repository-list">
                {repositories.map(r => (
                    <li key={r.id}>
                        <h3>{r.title}</h3>

                        <button onClick={() => handleRemoveRepository(r.id)}>
                            Remover
                        </button>
                    </li>

                ))}
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
