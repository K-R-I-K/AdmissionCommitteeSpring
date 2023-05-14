import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function FacultyList() {

    const [faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cookies] = useCookies(['XSRF-TOKEN']);

    useEffect(() => {
        setLoading(true);

        fetch('/getFaculties')
            .then(response => response.json())
            .then(data => {
                setFaculties(data);
                setLoading(false);
                console.log(data);
            })
    }, []);

    const remove = async (id) => {
        await fetch(`faculty/${id}`, {
            method: 'DELETE',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            fetch('/getFaculties')
                .then(response => response.json())
                .then(data => {
                    setFaculties(data);
                    setLoading(false);
                    //console.log(data);
                })
            /*let updatedFaculties = [...faculties].filter(i => i.id !== id);
            setFaculties(updatedFaculties);*/
        });
    }

    if (loading) {
        return <p style={{
            display: "flex",
            justifyContent: "center"
        }}>Loading...</p>;
    }

    /*const facultyList = useMemo(() => {return faculties.map(faculty => {
        return <tr key={faculty.id}>
            <td style={{ whiteSpace: 'nowrap' }}>{faculty.name}</td>
            <td>{faculty.budgetPlaces}</td>
            <td>{faculty.totalPlaces}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/getFaculty/" + faculty.id}>More</Button>
                    <Button size="sm" color="warning" tag={Link} to={"/faculty/" + faculty.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(faculty.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });}, [faculties])*/


    const facultyList = faculties.map(faculty => {
        return <tr key={faculty.id}>
            <td style={{ whiteSpace: 'nowrap' }}>{faculty.name}</td>
            <td>{faculty.budgetPlaces}</td>
            <td>{faculty.totalPlaces}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/getFaculty/" + faculty.id}>More</Button>
                    <Button size="sm" color="warning" tag={Link} to={"/faculty/" + faculty.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(faculty.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                {/*<div className="float-end">
                    <Button color="success" tag={Link} to="/faculty/new">Add Faculty</Button>
                </div>*/}
                <h3>List of faculties</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Name</th>
                        <th width="20%">Marks</th>
                        <th>Total Places</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {facultyList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};



