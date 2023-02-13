import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Axios from 'axios';
import msg from 'messages.js';

class ApproveFir extends React.Component {
  state = {
    apiurl: "fir/",
    firdata: [],
  };
  componentDidMount() {
    this.getlist();
  }
  getlist = () => {
    Axios.get(`${process.env.REACT_APP_Api}${this.state.apiurl}/`)
      .then(response => {
        if (response.status === 200) {
          this.setState({ firdata: response.data.firs });
          console.log("firlist", response);

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
  getBadge = (status) => {
    return status.toLowerCase() === 'approved' ? 'success' :
      status.toLowerCase() === 'inactive' ? 'secondary' :
        status.toLowerCase() === 'pending' ? 'warning' :
          // status.toLowerCase() === 'Banned' ? 'danger' :
          'primary'
  }
  approvefir = (id) => {
    console.log("id", id);
    var r = window.confirm("Do you want to approve this Fir ?\n");
    if (r === true) {
      this.updatestatus(id, "approved");
    }
  }
  updatestatus = (id, Status) => {
    const obj = [{
      propName: "Status",
      value: Status
    }];
    Axios.patch(`${process.env.REACT_APP_Api}${this.state.apiurl}${id}`, {
      data: obj
    })
      .then(response => {
        if (response.status === 200) {
          alert(msg.updatestatussuccess);
          this.getlist();

        }


      })
      .catch(function (error) {
        if (error.response && error.response.status === 500) {
          //place your reentry code
          alert(msg.updatestatusfailed);
        }
        else {
          alert(msg.servererror);

        }

      });

  }

  render() {



    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>FIRs <small className="text-muted">List</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      {/* <th scope="col">id</th> */}
                      <th scope="col">Name</th>
                      <th scope="col">Case Title</th>
                      <th scope="col">Crime Type</th>
                      <th scope="col">District</th>
                      <th scope="col">Registrar Name</th>
                      <th scope="col">Registration Date</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.firdata.map((fir, index) =>

                      // const firdetails = `/listalldata/${fir._id}`;


                      <tr key={fir._id.toString()}>

                        <td><Link to={`/listalldata/${fir._id}`}>{fir.PersonName}</Link></td>
                        <td>{fir.CaseTitle}</td>
                        <td>{fir.CrimeType}</td>
                        <td>{fir.District}</td>
                        <td>{fir.RegistrarName}</td>
                        <td>{fir.createdAt}</td>


                        <td><Badge color={this.getBadge(fir.Status)}>{fir.Status}</Badge> {fir.Status.toLowerCase() === 'pending' ? <Button color="primary" onClick={this.approvefir.bind(this, fir._id)} className="px-2">Approve</Button> : ""} </td>
                      </tr>


                      // this.firRow(fir)
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ApproveFir;
