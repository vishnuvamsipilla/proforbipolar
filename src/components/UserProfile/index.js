import React, { useState } from "react";
import "./index.css";
import { BsHeart } from "react-icons/bs";
import { AiFillEdit, AiOutlinePhone } from "react-icons/ai";
import { AiTwotoneDelete, AiOutlineMail } from "react-icons/ai";
import { AiFillHeart, AiOutlineGlobal } from "react-icons/ai";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export function UserProfile({ details, deleteUser, editUserDetails }) {
  const { id, name, username, email, phone, website } = details;
  const [userDetails, updateUserDetails] = useState({
    id,
    name,
    username,
    email,
    phone,
    website,
  });
  const name1 = userDetails.name;
  const email1 = userDetails.email;
  const phone1 = userDetails.phone;
  const website1 = userDetails.website;

  const url = ` https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`;
  const [isActive, toggleActive] = useState(false);

  const onClickInput = (e) => {
    const { id, value } = e.target;
    console.log(value);
    updateUserDetails({ ...userDetails, [id]: value });
    console.log(userDetails);
  };
  // const [finalDetails, submitDetails] = useState(userDetails);
  const onClickSubmit = () => {
    editUserDetails(id, {
      name: name1,
      email: email1,
      phone: phone1,
      website: website1,
    });
  };

  const renderFooter = () => (
    <div className="footer-container">
      <div onClick={() => toggleActive(!isActive)}>
        {isActive ? (
          <AiFillHeart className="icon liked-icon" />
        ) : (
          <BsHeart className="icon" />
        )}
      </div>
      <hr className="hr-line" />
      <div>
        <Popup
          trigger={
            <button className="icon-button">
              {" "}
              <AiFillEdit className="icon" />{" "}
            </button>
          }
          modal
          //   nested
        >
          {(close) => (
            <div className="modal">
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="header"> Basic model </div>
              <div className="content">
                {" "}
                <form className="form-container">
                  <div className="label-container">
                    <label htmlFor="name">
                      <span className="must-sign">*</span> Name:
                    </label>
                    <input
                      value={name1}
                      className="input-element"
                      id="name"
                      onChange={onClickInput}
                    />
                  </div>
                  <div className="label-container">
                    <label htmlFor="email">
                      <span className="must-sign">*</span> Email:
                    </label>
                    <input
                      value={email1}
                      className="input-element"
                      id="email"
                      onChange={onClickInput}
                    />
                  </div>
                  <div className="label-container">
                    <label htmlFor="phone">
                      <span className="must-sign">*</span> Phone:
                    </label>
                    <input
                      value={phone1}
                      className="input-element"
                      id="phone"
                      onChange={onClickInput}
                    />
                  </div>
                  <div className="label-container">
                    <label htmlFor="website" className="label">
                      <span className="must-sign">*</span> Website:
                    </label>
                    <input
                      value={website1}
                      className="input-element"
                      id="website"
                      onChange={onClickInput}
                    />
                  </div>
                </form>
                <div className="bottom-section">
                  <button
                    className="button"
                    onClick={() => {
                      close();
                    }}
                  >
                    cancel
                  </button>
                  <button
                    className="submit-button"
                    onClick={() => {
                      onClickSubmit();
                      close();
                    }}
                  >
                    ok
                  </button>
                </div>
              </div>
            </div>
          )}
        </Popup>
      </div>

      <hr className="hr-line" />
      <AiTwotoneDelete className="icon" onClick={() => deleteUser(id)} />
    </div>
  );

  return (
    <li>
      <img src={url} alt={name} className="profile-img" />
      <div className="description-container">
        <h2>{name}</h2>
        <div className="icons-container">
          <AiOutlineMail className="mail-icon" />
          <p>{email}</p>
        </div>
        <div className="icons-container">
          <AiOutlinePhone className="mail-icon" />
          <p>{phone}</p>
        </div>
        <div className="icons-container">
          <AiOutlineGlobal className="mail-icon" />
          <p>{website}</p>
        </div>
      </div>
      {renderFooter()}
    </li>
  );
}

export default UserProfile;
