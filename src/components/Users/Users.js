import axios from "axios";
import { useEffect, useRef, useState } from "react";
import User from './../User/User';
import "../Users/Users.css";
import UserDetailsModal from "../UserDetailsModal/UserDetailsModal";

const Users = () => {

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [nat, SetNat] = useState(["AU", "BR", "CA", "CH", "DE", "DK", "ES", "FI", "FR", "GB", "IE", "IN", "IR", "MX", "NL", "NO", "NZ", "RS", "TR", "UA", "US"]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1000);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(10);
    const [activePage, setActivePage] = useState(1);
    const [clickedUser, setClickedUser] = useState({});
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    const selectNatRef = useRef();

    const getUsersFromApi = async () => {
        try {
            setLoading(true);
            if (!isFilter) {
                let resp = await axios.get(`https://randomuser.me/api/?results=${usersPerPage}&page=${currentPage}&seed=seed${currentPage}`);
                setUsers(resp.data.results);
            }
            else {
                let resp = await axios.get(`https://randomuser.me/api/?nat=${selectNatRef.current.value}&results=${usersPerPage}&page=${currentPage}`);
                setUsers(resp.data.results);
            }
            setLoading(false);
        } catch (error) {
            alert("Error fetching data:", error);
        }

    }

    useEffect(() => {

        getUsersFromApi();

    }, [currentPage, usersPerPage, isFilter])


    const filteredUsersByNat = async () => {
        setIsFilter(true);
        getUsersFromApi();
    }

    const clickOnPage = (page) => {
        setCurrentPage(page);
        setActivePage(page);
    }


    const handleNextPage = () => {
        if (currentPage < 1000) {
            setCurrentPage(currentPage => currentPage + 1);
            setActivePage(activePage => activePage + 1);
            if (activePage === endPage) {
                setStartPage(startPage => startPage + 1);
                setEndPage(endPage => endPage + 1);
            }
        }

    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage => currentPage - 1);
            setActivePage(activePage => activePage - 1);
            if (activePage === startPage) {
                setStartPage(startPage => startPage - 1);
                setEndPage(endPage => endPage - 1);
            }
        }


    }


    return (
        <>
            <div id="overlay">
                <div id="filter-section">
                    <select id="nationality" ref={selectNatRef}>
                        <option>nationality</option>
                        {
                            nat.map(n => {
                                return <option key={n}>{n}</option>
                            })
                        }
                    </select>
                    <button id="filter-users-by-nat" onClick={filteredUsersByNat}>Filter</button>
                </div>

                {loading ?
                    <strong id="loading-text">Loading Table Data...</strong>
                    :

                    <div className="table-section">

                        <table id="users-table">
                            <thead>
                                <tr className="user-table-head">
                                    <th></th>
                                    <th>Full Name</th>
                                    <th>Email Address</th>
                                    <th>Phone #</th>
                                    <th>Gender</th>
                                    <th>City</th>
                                    <th>Date Of Birth</th>
                                    <th>Nationality</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(user => {
                                        return <User key={user.login.uuid} userData={user} clickedUser={(user) => setClickedUser(user)} isOpenModal={(data) => setIsOpenModal(data)} />

                                    })
                                }
                            </tbody>
                        </table>

                        <ul id="pagination">
                            <li className="page-item" onClick={handlePrevPage}><a id="prev-page" role="button" >{"<<"}</a></li>
                            {
                                Array.from({ length: totalPages }, (_, i) => i + 1).slice(startPage - 1, endPage).map(page => {
                                    return <li key={page} className={`page-item ${page === activePage && "active"}`} onClick={() => clickOnPage(page)}>
                                        <a role="button" className="page-link">{page}</a>
                                    </li>

                                })

                            }
                            <li className="page-item" onClick={handleNextPage}><a id="next-page" role="button" >{">>"}</a></li>
                        </ul>

                    </div>
                }
            </div>

            {isOpenModal && <UserDetailsModal userData={clickedUser} isOpenModal={(data) => setIsOpenModal(data)} />}

        </>

    )

}


export default Users;