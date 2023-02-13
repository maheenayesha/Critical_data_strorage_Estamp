import React, { Component } from 'react';
import {

    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Input,
    TextInput,
    Label,
    Row,
    CardFooter

} from 'reactstrap';
import Axios from "axios";
import msg from 'messages.js';
class CreateFir extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            apiurl: "fir",
            PersonName: "dawood",
            PersonCnic: "3310062212345",

            IncidentLocation: "St # 02 Model Town house 332",
            // RegistrarDesignation: "Clerk",
            CrimeType: "Violence",
            //   ,
            //     Hash: "asd",
            //   
            District: "Punjab",
            PoliceStationAddress: "Model Town",
            CaseTitle: "Murder",
            CaseDescription: "2 people killed their friend",
            RegistrarName: "Huzaifa",
            Status: "pending"

        };
    }
    // handleChange(numberonly) {
    //     const re = /^[0-9\b]+$/;
    //       if (numberonly.target.value === '' || re.test(numberonly.target.value)) {
    //          this.setState({number: numberonly.target.value})
    //       }
    //   }
        
    //   handleSubmit(numberonly) {
    //     console.log(this.state);
    //     numberonly.preventDefault();
    //   }

    // ChangeInNumber(event){
    //     const regex = /^[0-9\b]+$/;
    //     const value = event.target.value;
    //     if (value === '' || regex.test(value)) {
    //        this.setState({ PersonCnic : event.target.value })
    //     }
    //  }






    handlechange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log('user state', this.state);

    };
    handlechangecheckbox = event => {

        this.setState({ [event.target.name]: event.target.checked });
        console.log('user state', this.state);

    };
    handlesubmission = () => {

        
        const {
            PersonName,
            PersonCnic,
            IncidentLocation,
            CrimeType,
            District,
            PoliceStationAddress,
            CaseTitle,
            CaseDescription,
            RegistrarName,
            Status
        } = this.state;
      
        Axios.post(`${process.env.REACT_APP_Api}${this.state.apiurl}/`, {
            PersonName: PersonName.toUpperCase(),
            PersonCnic: PersonCnic.toUpperCase(),
            IncidentLocation: IncidentLocation.toUpperCase(),
            CrimeType: CrimeType.toUpperCase(),
            District: District.toUpperCase(),
            PoliceStationAddress: PoliceStationAddress.toUpperCase(),
            CaseTitle: CaseTitle.toUpperCase(),
            CaseDescription: CaseDescription.toUpperCase(),
            RegistrarName: RegistrarName.toUpperCase(),
            Status: Status.toUpperCase()
        })
            .then(response => {
                if (response.status === 201) {
                    alert(msg.firsuccess);
                    console.log(response);

                }


            })
            .catch(function (error) {
                if (error.response && error.response.status === 400) {
                    //place your reentry code
                    alert(msg.firfailed);
                }
                else {
                    alert(msg.servererror);

                }

            });

    }
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
            RegistrarName
        } = this.state;
        // PersonName: "dawood",
        //     PersonCnic: "3310062212345",

        //         IncidentLocation: "St # 02 Model Town house 332",
        //             // RegistrarDesignation: "Clerk",
        //             CrimeType: "Violence",
        //                 //   ,
        //                 //     Hash: "asd",
        //                 //   
        //                 District: "Punjab",
        //                     PoliceStationAddress: "Model Town",
        //                         CaseTitle: "Murder",
        //                             CaseDescription: "2 people killed their friend",
        //                                 RegistrarName: "Huzaifa",
        //                                     status: "pending"

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong>Create FIR</strong>
                                <small> Form</small>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="PersonName">Complainer Name</Label>
                                            <Input style={{ textTransform: 'uppercase'}} type="text" id="PersonName" name="PersonName" value={PersonName} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="PersonCnic">Complainer CNIC</Label>
                                            <Input  id="PersonCnic" name="PersonCnic" defaultValue={PersonCnic} onChange={this.ChangeInNumber} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="IncidentLocation">Incident Location</Label>
                                            <Input style={{ textTransform: 'uppercase'}} type="text" id="IncidentLocation" name="IncidentLocation" value={IncidentLocation} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row><Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="CrimeType">Crime Type</Label>
                                            <Input style={{ textTransform: 'uppercase'}} type="CrimeType" id="CrimeType" name="CrimeType" value={CrimeType} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row><Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="District">District</Label>
                                            <Input style={{ textTransform: 'uppercase'}} type="District" id="District" name="District" value={District} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row><Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="PoliceStationAddress">Police Station Address</Label>
                                            <Input style={{ textTransform: 'uppercase'}} type="PoliceStationAddress" id="PoliceStationAddress" name="PoliceStationAddress" value={PoliceStationAddress} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="CaseTitle">Case Title</Label>
                                            <Input style={{ textTransform: 'uppercase'}} type="CaseTitle" id="CaseTitle" name="CaseTitle" value={CaseTitle} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="CaseDescription">Case Description</Label>
                                            <Input style={{ textTransform: 'uppercase'}} type="textarea" id="CaseDescription" name="CaseDescription" value={CaseDescription} rows="9" onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="RegistrarName">Registrar Name</Label>
                                            <Input style={{ textTransform: 'uppercase'}} type="RegistrarName" id="RegistrarName" name="RegistrarName" value={RegistrarName} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="primary" onClick={this.handlesubmission}><i className="fa fa-dot-circle-o"></i> Create</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateFir;
