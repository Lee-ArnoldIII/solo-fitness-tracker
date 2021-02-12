import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { Section, Button, Aside, Select } from "react-bulma-components";
import axios from "axios";

import UserSubmission from "./UserSubmission";
import MentorSubmission from "./MentorSubmission";

// import logo2 from "./img/logo2.svg";
import "./styles.css";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [userModal, setUserModal] = useState(["modal"]);
  
  const userButton = () => {
      setUserModal("modal is-active");
  };
  const closeUserButton = () => {
      setUserModal("modal");
  };

  useEffect(() => {
      const getUsers = () => {
          axios
            .get("http://127.0.0.1:5000/users", {
                crossdomain: true,
                headers: { "Access-Control-Allow-Origin": "*"},
            })
            .then(function (response) {
                setUsers(response.data.user)
                console.log("user data", response.data.user)
            });
      };
      getUsers();
      
    }, []);

  return (
    <div>
      <Section class="hero is-dark is-medium">
        <div class="hero-body" style={{ backgroundColor: "#151B54" }}>
          <div class="container">
            <h1 class="title" style={{ color: "#fdfff5" }}>
              <img style={{ height: "100px" }} src={logo2}></img> Associate
              Developer Tracker
            </h1>
            <div class="select">
              <select>
                <option>Select Admin</option>
                {admins.map((admin) => {
                  for (var i = 0; i < admins.length; i++) {
                    if (admin.user_type === "admin") {
                      return <option>{admin.username}</option>;
                    }
                  }
                })}
              </select>
            </div>
          </div>
        </div>
        <nav
          class="navbar is-light"
          style={{ display: "flex", justifyContent: "center", padding: "10px" }}
        >
          <div
            class="container"
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
              margin: '5px'
            }}
          >
            {/* <div class='container' style={{display: 'flex', justifyContent: 'center'}}> */}
            <button
              class="button"
              onClick={userButton}
              style={{margin: '15px'}}
            >
              Add User
            </button>
            <button
              class="button"
              onClick={taskButton}
              style={{margin: '15px'}}
            >
              Add Task
            </button>
            <button
              class="button"
              id="reportButton"
              onClick={reportButton}
              style={{margin: '15px'}}
            >
              Add Report
            </button>
            <button
              class="button"
              onClick={mentorButton}
              style={{margin: '15px'}}
            >
              Add Mentor
            </button>
            {/* </div> */}
            
          </div>

          <div className={mentorModal}>
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Mentor Submission</p>
                <button
                  onClick={closeMentorButton}
                  class="delete"
                  aria-label="close"
                ></button>
              </header>
              <section class="modal-card-body">
                <MentorSubmission />
              </section>
              <footer class="modal-card-foot"></footer>
            </div>
          </div>
          <div className={reportModal}>
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Report Submission</p>
                <button
                  onClick={closeReportButton}
                  class="delete"
                  aria-label="close"
                ></button>
              </header>
              <section class="modal-card-body">
                <ReportSubmission candidates={candidates} />
              </section>
              <footer class="modal-card-foot"></footer>
            </div>
          </div>
          <div className={taskModal}>
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">
                  Task Submission
                </p>
                <button
                  onClick={closeTaskButton}
                  class="delete"
                  aria-label="close"
                ></button>
              </header>
              <section class="modal-card-body">
                <TaskSubmission candidates={candidates} />
              </section>
              <footer class="modal-card-foot"></footer>
            </div>
          </div>
          <div className={userModal}>
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">User Submission</p>
                <button
                  onClick={closeUserButton}
                  class="delete"
                  aria-label="close"
                ></button>
              </header>
              <section class="modal-card-body">
                <UserSubmission candidates={candidates} />
              </section>
              <footer class="modal-card-foot"></footer>
            </div>
          </div>

          <div className={userReport}>
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Report</p>
                <button
                  onClick={closeUserReport}
                  class="delete"
                  aria-label="close"
                ></button>
              </header>
              <section class="modal-card-body">
                <table class="table is-striped">
                  <thead>
                    <tr>
                      <th>{reports.user} Reports</th>
                    </tr>
                    <tr>
                      <th>Name</th>
                      <th>Benchmark</th>
                      <th>Content</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tfoot></tfoot>
                  <tbody>
                    {reports.map((report) => {
                      return (
                        <tr>
                          <th>{report.name}</th>
                          <th>{report.benchmark}</th>
                          <th>{report.content}</th>
                          <th>{report.status}</th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
              <footer class="modal-card-foot"></footer>
            </div>
          </div>
        </nav>
      </Section>

      <div
        class="columns"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          margin: "10px",
        }}
      >
        <div class="column">
          <table class="table is-striped is-hoverable">
            <thead>
              <tr>
                <th>Candidates</th>
              </tr>
              <tr>
                <th>Id</th>
                <th>First</th>
                <th>Last</th>
                <th>UserName</th>
                <th>Position</th>
                <th>Mentor</th>
                <th>Reports</th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
              {candidates.map((candidate) => {
                for (var i = 0; i < candidates.length; i++) {
                  if (candidate.user_type === "candidate") {
                    const getReport = () => {
                      axios
                        .get(
                          `http://127.0.0.1:5000/feedback/${candidate.username}`
                        )
                        .then(function (response) {
                          setReport(response.data.reports);
                          setUserReport("modal is-active");
                        });
                    };
                    return (
                      <tr>
                        <th>{candidate.user}</th>
                        <td>{candidate.first_name}</td>
                        <td>{candidate.last_name}</td>
                        <td>{candidate.username}</td>
                        <td>{candidate.user_type}</td>
                        <td>{candidate.mentor}</td>
                        <td>
                          <button
                            class="button"
                            onClick={getReport}
                          >
                            See Reports
                          </button>
                        </td>
                      </tr>
                    );
                  }
                }
              })}
            </tbody>
          </table>
        </div>

        <div class="column">
          <table class="table is-striped is-hoverable">
            <thead>
              <tr>
                <th>Tasks</th>
              </tr>
              <tr>
                <th>Name</th>
                <th>Desrciption</th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
              {tasks.map((task) => {
                return (
                  <tr>
                    <th>{task.name}</th>
                    <td>{task.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div class="column">
          <table class="table is-striped is-hoverable">
            <thead>
              <tr>
                <th>Reports</th>
              </tr>
              <tr>
                <th>Name</th>
                <th>Desrciption</th>
                <th>Content</th>
                <th>Status</th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
              {reports.map((report) => {
                return (
                  <tr>
                    <th>{report.name}</th>
                    <td>{report.benchmark}</td>
                    <td>{report.content}</td>
                    <td>{report.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
