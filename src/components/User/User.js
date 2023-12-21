import { useState } from 'react';
import converteDate from './../../convertDate';
import UserDetailsModal from './../UserDetailsModal/UserDetailsModal';
import '@fortawesome/fontawesome-free/css/all.css';
import '../User/User.css'

const User = ({ userData, clickedUser,isOpenModal }) => {


    const sendClickedUserData = () => {
        clickedUser(userData);
        isOpenModal(true);
    }

    return (
        <>
            <tr className="user-table-row" onClick={sendClickedUserData}>
                <td><i className='far fa-user-circle'></i></td>
                <td>{userData.name.first} {userData.name.last}</td>
                <td>{userData.email}</td>
                <td>{userData.phone}</td>
                <td>{userData.gender}</td>
                <td>{userData.location.city}</td>
                <td>{converteDate(userData.dob.date)}</td>
                <td>{userData.nat}</td>
            </tr>
        </>
    )

}

export default User;