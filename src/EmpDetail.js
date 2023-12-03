import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const EmpDetail = () => {
    const { empid } = useParams();

    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        
        fetch("https://member-data-dr6a.onrender.com/member-json/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    
    return (
        <>
        <h1>User Details Page</h1>
        <br></br>
        <ListGroup> 
          <ListGroup.Item variant="primary"><b>ID:</b> {empdata.id}</ListGroup.Item>
          <ListGroup.Item action variant="secondary"> <b>NAME:</b> {empdata.name}</ListGroup.Item>
          <ListGroup.Item action variant="success"><b>EMAIL:</b> {empdata.email}</ListGroup.Item>
          <ListGroup.Item action variant="danger"><b>ROLE:</b> {empdata.role}</ListGroup.Item>
        </ListGroup>
        <br></br>
        <Link to='/'><Button variant="primary" >Back</Button></Link>
        </>
    );
}

export default EmpDetail;