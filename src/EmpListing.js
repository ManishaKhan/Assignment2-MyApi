import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { FaTrash } from "react-icons/fa";
import { Checkbox } from "./Checkbox";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmpListing = () => {
    const [empdata, empdatachange] = useState([]);
    const [searchApiData, setSearchApiData] = useState([]);
    const [filterValue, setFilterValue] = useState('');

    // checkbox data

    const [selectedRows, setSelectedRows] = useState([]);
    const [allChecked, setAllChecked] = useState(false);

    //select rows
    const handleRowSelection = (rowId, email) => {
        if (selectedRows.includes(rowId)) {
            setSelectedRows(selectedRows.filter((id) => id !== rowId));
        } else {
            setSelectedRows([...selectedRows, rowId]);
        }
        const newData = empdata.map((row) => {
            if (row.id === rowId) {
                return { ...row, email };
            }
            return row;
        });
        empdatachange(newData);
    };

    //delete selected rows
    const handleDeleteRows = () => {
        const newData = empdata.filter((row) => !selectedRows.includes(row.id));
        empdatachange(newData);
        setSelectedRows([]);

    };




    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const recorrds = empdata.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(empdata.length / recordsPerPage);
    const number = [...Array(nPage + 1).keys()].slice(1);


    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)

        }

    }

    const changeCPage = (id) => {
        setCurrentPage(id)

    }

    const nextPage = () => {
        if (currentPage !== nPage) {
            setCurrentPage(currentPage + 1)

        }
    }

    const fisrtPage = () => {
        setCurrentPage(1)

    }

    const lastPage = () => {
        setCurrentPage(nPage)

    }

    //Navigation
    const navigate = useNavigate();

    //User Details
    const LoadDetail = (id) => {
        navigate("/employee/detail/" + id);
    }

    //edit user details
    const LoadEdit = (id) => {
        navigate("/employee/edit/" + id);
    }

    //delete any user
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("https://member-data-dr6a.onrender.com/member-json/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    //get data from API
    useEffect(() => {
        const fetchData = () => {
            fetch("https://member-data-dr6a.onrender.com/member-json").then((res) => {
                return res.json();
            }).then((resp) => {
                empdatachange(resp);
                setSearchApiData(resp)


            }).catch((err) => {
                console.log(err.message);
            })
        }
        fetchData();
    }, [])


    //Search filter
    const handleSearch = (e) => {
        if (e.target.value === '') {
            empdatachange(searchApiData)
        } else {
            const filterResult = searchApiData.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.role.toLowerCase().includes(e.target.value.toLowerCase()) || item.email.toLowerCase().includes(e.target.value.toLowerCase()) || item.id.toLowerCase().includes(e.target.value.toLowerCase()));

            if (filterResult.length > 0) {
                empdatachange(filterResult)
            } else {
                empdatachange([{ "name": "No data found" }])
            }

        }
        setFilterValue(e.target.value)

    }


    return (


        <>

            {/* <div >
                <input type="text" placeholder="Search...." onInput={(e) => { handleSearch(e) }} value={filterValue} className="search-icon" style={{float:"left", margin:"10px"}}></input>

                <div style={{float:"right"}}>
                    <button className="btn btn-danger" onClick={ handleDeleteRows}>Delete Selected <FaTrash /></button>
   
                </div>
                
            </div> */}

            <span>ADMIN DASHBOARD</span>
            <div class="table-wrapper">
                <Form>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Search...." onInput={(e) => { handleSearch(e) }} value={filterValue} className="search-icon" style={{ float: "left" }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className="btn btn-danger" onClick={handleDeleteRows} style={{ float: "right", margin: "10px" }}>Delete Selected <FaTrash /></Button>
                        </Col>
                    </Row>

                </Form>

                {/* <button className="btn btn-danger" onClick={handleDeleteRows} style={{ float: "right" }}>Delete Selected <FaTrash /></button> */}




                {/* <Table responsive="sm" bordered>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody >
                    {recorrds &&
                        recorrds.map(item => (
                            <tr key={item.id}  >

                                <input
                                    type="checkbox"
                                    id="check"
                                    checked={selectedRows.includes(item.id)}
                                    onChange={() => handleRowSelection(item.id, item.email)}

                                />
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td><a href="#" onClick={() => { LoadEdit(item.id) }} ><button ><FaEdit /></button></a>
                                    <a href="#" onClick={() => { Removefunction(item.id) }} ><button style={{ color: "red", margin: "5px" }}><RiDeleteBinLine /></button></a>
                                    <a href="#" onClick={() => { LoadDetail(item.id) }}><button style={{ color: "blue" }}><FaUser /></button></a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table> */}



                <table class="fl-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {recorrds &&
                            recorrds.map(item => (
                                <tr key={item.id}  >

                                    <input
                                        type="checkbox"
                                        id="check"
                                        checked={selectedRows.includes(item.id)}
                                        onChange={() => handleRowSelection(item.id, item.email)}
                                        style={{margin:"10px"}}
                                    />
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td><a href="#" onClick={() => { LoadEdit(item.id) }} ><button ><FaEdit /></button></a>
                                        <a href="#" onClick={() => { Removefunction(item.id) }} ><button style={{ color: "red", margin: "5px" }}><RiDeleteBinLine /></button></a>
                                        <a href="#" onClick={() => { LoadDetail(item.id) }}><button style={{ color: "blue" }}><FaUser /></button></a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>


                {/* Pagination */}
                {/* <nav style={{ float: "right" }}>
                <ul className="pagination">

                    <li className="page-item">
                        <a href="#" className="page-link" onClick={fisrtPage}><Pagination.First /></a>
                    </li>

                    <li className="page-item">
                        <a href="#" className="page-link" onClick={prePage}><Pagination.Prev /></a>
                    </li>

                    {
                        number.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : " "}`} key={i}>
                                <a href="#" className="page-link" onClick={() => changeCPage(n)}><Pagination.Item>{n}</Pagination.Item></a>
                            </li>
                        ))
                    }

                    <li className="page-item">
                        <a href="#" className="page-link" onClick={nextPage}><Pagination.Next /></a>
                    </li>

                    <li className="page-item">
                        <a href="#" className="page-link" onClick={lastPage}><Pagination.Last /></a>
                    </li>



                </ul>

            </nav> */}



                <ul class="pagination">
                    
                    <li>
                        <a href="#0"  onClick={fisrtPage}>&lt;&lt;</a>
                    </li>

                    <li >
                        <a href="#0"  onClick={prePage}>&lt;</a>
                    </li>

                    {
                        number.map((n, i) => (
                            <li class="active" key={i}>
                                <a href="#0"  onClick={() => changeCPage(n)}>{n}</a>
                            </li>
                        ))
                    }

                    <li >
                        <a href="#0"  onClick={nextPage}>&gt;</a>
                    </li>

                    <li >
                        <a href="#0"  onClick={lastPage}>&gt;&gt;</a>
                    </li>


                </ul>
            </div>

        </>
    );
}

export default EmpListing;