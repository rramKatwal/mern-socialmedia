import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ViewDetails = () => {
  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const { usersById } = useSelector((state) => state.userById);

  useEffect(() => {
    if (usersById) {
      setFirstname(usersById.firstname);
      setLastname(usersById.lastname);
      setEmail(usersById.email);
      setUsername(usersById.username);
      setBio(usersById.bio);
    }
  }, [usersById]);

  return (
    <>
      <button className="btn me-2" onClick={() => setOpen(true)}>
        View Details
      </button>
      <Modal
        title="User Details"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={600}
        footer={null}
      >
        <hr />
        <form className="form-edit">
          <div>
            <label htmlFor="fname"> Firstname: </label>
            <input type="text" id="fname" value={firstname} />
          </div>
          <div>
            <label htmlFor="lname"> Lastname: </label>
            <input type="text" id="lname" value={lastname} />
          </div>
          <div>
            <label htmlFor="uname"> Username: </label>
            <input type="text" id="uname" value={username} />
          </div>
          <div>
            <label htmlFor="email"> Email: </label>
            <input type="text" id="lname" value={email} />
          </div>
          <div>
            <label htmlFor="bio"> Bio: </label>
            <input type="text" id="bio" value={bio} />
          </div>
        </form>
      </Modal>
    </>
  );
};
