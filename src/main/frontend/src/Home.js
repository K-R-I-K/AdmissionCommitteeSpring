import React, {useEffect, useState} from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import {useCookies} from 'react-cookie';

const Home = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    /*const [user, setUser] = useState(undefined);*/
    const [cookies] = useCookies(['XSRF-TOKEN']); // <.>

    /*useEffect(() => {
        setLoading(true);
        fetch('/user', { credentials: 'include' }) // <.>
            .then(response => response.text())
            .then(body => {
                if (body === '') {
                    setAuthenticated(false);
                } else {
                    setUser(JSON.parse(body));
                    setAuthenticated(true);
                }
                setLoading(false);
            });
    }, [setAuthenticated, setLoading, setUser])*/

    const login = () => {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3000') {
            port = ':8080';
        }
        window.location.href = `//${window.location.hostname}${port}/private`;
    }

    const logout = () => {
        fetch('/logout', {
            method: 'POST', credentials: 'include',
            headers: { 'X-XSRF-TOKEN': cookies['XSRF-TOKEN'] } // <.>
        })
            .then(res => res.json())
            .then(response => {
                window.location.href = `${response.logoutUrl}?id_token_hint=${response.idToken}`
                    + `&post_logout_redirect_uri=${window.location.origin}`;
            });
    }

    /*const message = user ?
        <h2>Welcome, {user.name}!</h2> :
        <p>Please log in to manage your JUG Tour.</p>;*/

    const button = authenticated ?
        <div>
            <Button color="link"><Link to="/getFaculties">Faculty List</Link></Button>
            <br/>
            <Button color="link" onClick={logout}>Logout</Button>
        </div> :
        <Button color="primary" onClick={login}>Login</Button>;

    if (loading) {
        return <p style={{
            display: "flex",
            justifyContent: "center"
        }}>Loading...</p>;
    }

    return (
        <div>
            <AppNavbar/>
            {/*<Container fluid>
                {message}
                {button}
            </Container>*/}
            {/*<img
                style={{
                    height: 90,
                    width: 100,
                }}
                src={require({logo})}
            />*/}
        </div>
    );
}

export default Home;