/* eslint-disable */
import React from "react";
import ReactQRCode from "react-qr-code";
import { Segment, Header } from "semantic-ui-react";

export default function QRCode(props) {
    return (
        <Segment basic textAlign="center">
            <Header as="h3" style={{ fontStyle: "italic" }}>
                Scan with your camera app to use your phone as a controller.
            </Header>
            <ReactQRCode value={ `https://192.168.86.26:3000/form/d97caca4-6a64-4d68-83f0-cde06134587a` } />
        </Segment>
    );
}