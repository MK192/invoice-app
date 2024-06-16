// Components
import Main from './components/Main/Main';
import { Form } from './components/Form';
import { Nav } from './components/Nav';
// Css
import './App.css';
import { useState } from 'react';

function App() {
    const [showForm, setShowForm] = useState<boolean>(false);
    return (
        <>
            <div
                className={`flex h-full lg:flex-col 
             transition-all ease-in-out duration-700 dark:bg-vulkan `}
            >
                <div className="w-[103px] relative">
                    <Nav />

                    {showForm && <Form setShowForm={setShowForm} />}
                </div>
                <Main setShowForm={setShowForm} />
            </div>
        </>
    );
}

export default App;
