import { useEffect, useState } from 'react';
import './logStyle.css'
import { useNavigate } from 'react-router-dom';
import './Event.css'

const NAVIGATION_EVENT = 'pushstate'

function navigate(href) {
    window.history.pushState({},'', href)
    const navigationEvent = new Event(NAVIGATION_EVENT)
    window.dispatchEvent(navigationEvent)
}

export function Login () {
    return(
        <div>
            <div className ='card'>
                <div className = 'content'>
                    <h1 className = 'title'>Iniciar Sesion</h1>
                        <span>
                            <div className = 'label'>Introduce tu usuario:</div>
                            <input type = 'text' id = "User" placeholder = "Usuario"></input>
                            <br/>
                            <div className = 'label'>Introduce tu contraseña:</div>
                            <input type = 'text' id = "Password" placeholder = "Contraseña"></input>
                            <br/>
                            <button onClick={()=> navigate('/eventPage')} >Iniciar Sesion</button>

                        </span>
                </div>
            </div>
            <div>
                <br/>
                <br/>
                <div className = 'label'>No estas registrado?</div>
                <button onClick={()=> navigate('/register')} >Registrate</button>
            </div>
        </div>
    )
}

export function EventPage() {
    return (
        <div>
            <div>
                <div className='header'>
                    <img className='logo' src = '../assets/Logo-cetys.png'/>
                    <button className='conf-button'>
                    </button>
                </div>
                <div className='header-text'>Tenemos Eventos Recomendados para ti!</div>

            </div>
        </div>
    )
}

export function Register() {
    return (

        <div>
            <div>
                <div className ='card'>
                    <div className = 'content'>
                        <h1 className = 'title'>Registrate</h1>
                            <span>
                                <div className = 'label'>Introduce tu usuario:</div>
                                <input type = 'text' id = "User" placeholder = "Usuario"></input>
                                <br/>
                                <div className = 'label'>Introduce tu contraseña:</div>
                                <input type = 'text' id = "Password" placeholder = "Contraseña"></input>
                                <br/>
                                <div className = 'label'>Selecciona tus gustos!</div>

                                <Tags/>
                                <br/>

                                <button onClick={()=> navigate('/')} >Confirmar</button>
                            </span>
                    </div>
                </div>
            </div>
            

        </div>

    )
}

function Tags({}) {
        const [selectedTags, setSelectedTags] = useState([])

        const handleSelectedTags = (tag) =>{

            setSelectedTags(prevTags => prevTags.includes(tag) ? prevTags.filter(t => t != tag): [...prevTags,tag]);
        };

        const isSelected = (tag) => selectedTags.includes(tag);
    return (//anade tags aqui

        <div className = 'wrapper'>
            <button className={`tag ${isSelected('Tag1') ? 'selected' : ''}`} onClick={() => handleSelectedTags('Tag1')}>Tag1</button>
            <button className={`tag ${isSelected('Tag2') ? 'selected' : ''}`} onClick={() => handleSelectedTags('Tag2')}>Tag2</button>
            <button className={`tag ${isSelected('Tag3') ? 'selected' : ''}`} onClick={() => handleSelectedTags('Tag3')}>Tag3</button>
            <button className={`tag ${isSelected('Tag4') ? 'selected' : ''}`} onClick={() => handleSelectedTags('Tag4')}>Tag4</button>
            <button className={`tag ${isSelected('Tag5') ? 'selected' : ''}`} onClick={() => handleSelectedTags('Tag5')}>Tag5</button>
            <button className={`tag ${isSelected('Tag6') ? 'selected' : ''}`} onClick={() => handleSelectedTags('Tag6')}>Tag6</button>


        </div>
    );

}
export function App() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)


        useEffect(() => {
            const onLocationChange = () =>{
                setCurrentPath(window.location.pathname)
            }
            
            window.addEventListener(NAVIGATION_EVENT, onLocationChange)

            return () =>{
                window.removeEventListener(NAVIGATION_EVENT, onLocationChange)
            }

        },[])
    return(
        <main>
            {currentPath == '/' && <Login/>}
            {currentPath == '/register' && <Register/>}
            {currentPath == '/eventPage' && <EventPage/>}

        </main>
    )

}



