import React from 'react';
import { Row, Col } from "react-bootstrap";

export class Title extends React.Component {
    render() {
        return(
            <Row>
                <Col xs={12}>
                    <h1>Bienvenue sur notre site d'impro !</h1>
                </Col>
            </Row>
        )
    }
}