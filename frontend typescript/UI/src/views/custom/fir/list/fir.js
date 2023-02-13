import React, { Component } from 'react';
import {

    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    CardFooter

} from 'reactstrap';
import Axios from "axios";
import msg from 'messages.js';
class Fir extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiurl: "fir/",
            firid: this.props.match.params.id,
            PersonName: "",
            PersonCnic: "",
            IncidentLocation: "",
            CrimeType: "",
            District: "",
            PoliceStationAddress: "",
            CaseTitle: "",
            CaseDescription: "",
            RegistrarName: "",
            Status: "",
            createdAt: "",
            updatedAt: ""

        };
    }

    componentDidMount() {
        Axios.get(`${process.env.REACT_APP_Api}${this.state.apiurl}/${this.state.firid}`)
            .then(response => {
                if (response.status === 200) {
                    const fir = response.data.fir;
                    this.setState({
                        PersonName: fir.PersonName,
                        PersonCnic: fir.PersonCnic,
                        IncidentLocation: fir.IncidentLocation,
                        CrimeType: fir.CrimeType,
                        District: fir.District,
                        PoliceStationAddress: fir.PoliceStationAddress,
                        CaseTitle: fir.CaseTitle,
                        CaseDescription: fir.CaseDescription,
                        RegistrarName: fir.RegistrarName,
                        Status: fir.Status,
                        createdAt: fir.createdAt,
                        updatedAt: fir.updatedAt

                    });
                }
            })
            .catch(function (error) {
                if (error.response && error.response.status === 500) {
                    //place your reentry code
                    console.log(msg.servererror);

                }
                else {
                    console.log(msg.servererror);

                }

            });
    }
    handlechange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log('user state', this.state);

    };

    render() {
        const {
            PersonName,
            PersonCnic,
            IncidentLocation,
            CrimeType,
            District,
            PoliceStationAddress,
            CaseTitle,
            CaseDescription,
            RegistrarName, Status, createdAt, updatedAt
        } = this.state;

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong>Update FIR</strong>
                                <small> Form</small>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="PersonName">Complaint Name</Label>
                                            <Input type="text" id="PersonName" name="PersonName" value={PersonName} readOnly />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="PersonCnic">Complaint Cnic</Label>
                                            <Input type="text" id="PersonCnic" name="PersonCnic" value={PersonCnic} readOnly />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="IncidentLocation">Incident Location</Label>
                                            <Input type="text" id="IncidentLocation" name="IncidentLocation" value={IncidentLocation} readOnly />
                                        </FormGroup>
                                    </Col>
                                </Row><Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="CrimeType">Crime Type</Label>
                                            <Input type="CrimeType" id="CrimeType" name="CrimeType" value={CrimeType} readOnly />
                                        </FormGroup>
                                    </Col>
                                </Row><Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="District">District</Label>
                                            <Input type="District" id="District" name="District" value={District} readOnly />
                                        </FormGroup>
                                    </Col>
                                </Row><Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="PoliceStationAddress">Police Station Address</Label>
                                            <Input type="PoliceStationAddress" id="PoliceStationAddress" name="PoliceStationAddress" value={PoliceStationAddress} readOnly />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="CaseTitle">Case Title</Label>
                                            <Input type="CaseTitle" id="CaseTitle" name="CaseTitle" value={CaseTitle} readOnly />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="CaseDescription">Case Description</Label>
                                            <Input type="textarea" id="CaseDescription" name="CaseDescription" value={CaseDescription} rows="9" readOnly />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="RegistrarName">Registrar Name</Label>
                                            <Input type="RegistrarName" id="RegistrarName" name="RegistrarName" value={RegistrarName} readOnly />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="Status">Status</Label>
                                            <Input type="text" id="Status" name="Status" value={Status} readOnly />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="CreatedAt">Created At</Label>
                                            <Input type="text" id="CreatedAt" name="CreatedAt" value={createdAt} readOnly />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="updatedAt">Last Updated</Label>
                                            <Input type="text" id="updatedAt" name="updatedAt" value={updatedAt} readOnly />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            {/* <CardFooter>
                                <Button type="submit" size="sm" color="primary" onClick={this.updatestatus}><i className="fa fa-dot-circle-o"></i> Update </Button>
                            </CardFooter> */}
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Fir;
