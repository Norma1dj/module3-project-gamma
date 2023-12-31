import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";

function AccessibilityForm() {
  const [name, setName] = useState("");
  const { token } = useContext(AuthContext);

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};

    data.name = name;

    const url = `${process.env.REACT_APP_API_HOST}/api/accessibility`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      await response.json();
      setName("");
    }
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">New Accessibility</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              onChange={handleNameChange}
              value={name}
            />
          </div>
          <div>
            <input
              className="btn btn-primary"
              type="submit"
              value="Create Accessibility"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccessibilityForm;
