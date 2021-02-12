import React, { Component } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Section, Button } from "react-bulma-components";
import Dashboard from "./Dashboard";

export function LandingPage() {
    return (
        <div>
            <Section class="hero is-medium is-primary is-bold">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">Solo Fitness Tracker</h1>
                        <Link to="/dashboard">
                            <Button class="button is-primary">Go</Button>
                        </Link>
                    </div>
                </div>
            </Section>
        </div>
    );
}
export default LandingPage;
