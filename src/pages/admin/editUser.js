import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PouchDB from "pouchdb";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function EditUser() {
  var { userId } = useParams();
  var [user, setUser] = useState({});
  var [fname, setFname] = useState("");
  var [lname, setLname] = useState("");
  var [role, setRole] = useState("");
  var [email, setEmail] = useState("");

  function handleFname(e) {
    setFname(e.target.value);
  }
  function handleLname(e) {
    setLname(e.target.value);
  }
  function handleRole(e) {
    setRole(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleGoBackClick() {
    return (window.location = "/admin");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    var data = {
      fname: fname,
      lname: lname,
      role: role.toLowerCase(),
      email: email,
    };
    var send = await axios.post(
      "https://farmkpiback.herokuapp.com/register/edit/" + user["_id"],
      data
    );

    if (send["data"] === "Updated") {
      return (window.location = "/admin");
    }
  }

  useEffect(async function() {
    var getUser = await axios.get(
      "https://farmkpiback.herokuapp.com/register/" + userId
    );
    setUser(getUser["data"]);
  }, []);

  useEffect(
    async function() {
      setFname(user["fname"]);
      setLname(user["lname"]);
      setRole(user["role"]);
      setEmail(user["email"]);
    },
    [user]
  );

  return (
    <div>
      <div className="bg-secondary">
        <Container>
          <Row className="justify-content-center">
            <Col xs={10}>
              <h4 className="m-0 text-white pt-3 pb-3">FARM KPI</h4>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row className="justify-content-center">
          <Col xs={10}>
            <p
              className="mt-3 text-secondary"
              style={{ cursor: "pointer" }}
              onClick={handleGoBackClick}
            >
              GO BACK
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col xs={10}>
            <h2 className="mt-2">Create Role</h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={fname}
                  onChange={handleFname}
                  type="text"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={lname}
                  onChange={handleLname}
                  type="text"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  value={role}
                  onChange={handleRole}
                  type="text"
                  required
                />
                <Form.Text className="text-muted">
                  Example: Evaluator or Supervisor
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={handleEmail}
                  type="email"
                  required
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="dark" type="submit">
                  UPDATE
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EditUser;
