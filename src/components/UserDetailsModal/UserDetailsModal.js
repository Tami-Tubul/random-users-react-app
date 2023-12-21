import converteDate from "../../convertDate";
import '../UserDetailsModal/UserDetailsModal.css'

const UserDetailsModal = ({ userData, isOpenModal }) => {

    const closeModal = () => {
        isOpenModal(false);
    }

    return (
        <div id="user-modal">
            <button className="close-modal" onClick={closeModal} aria-label="close modal">X</button>
            <div className="modal-container">
                <div className="row-icon-user">
                    <i className='far fa-user-circle'></i>
                </div>
                <div className="row row1">
                    <div></div>
                    <div>
                        <strong className="heading">Full Name</strong>
                        <p>{userData.name?.first} {userData.name?.last}</p>
                    </div>
                    <div></div>
                </div>

                <div className="row row2">
                    <div>
                        <strong className="heading">Email Address</strong>
                        <p>{userData.email}</p>
                    </div>
                    <div>
                        <strong className="heading">Phone</strong>
                        <p>{userData.phone}</p>
                    </div>
                    <div>
                        <strong className="heading">Gender</strong>
                        <p>{userData.gender}</p>
                    </div>
                </div>

                <div className="row row3">
                    <div>
                        <strong className="heading">Nationality</strong>
                        <p>{userData.nat}</p>
                    </div>
                    <div>
                        <strong className="heading">City</strong>
                        <p>{userData.location?.city}</p>
                    </div>
                    <div>
                        <strong className="heading">BirthDate</strong>
                        <p>{converteDate(userData.dob?.date)}</p>
                    </div>
                </div>
            </div>
            <td></td>
        </div>
    )

}

export default UserDetailsModal;