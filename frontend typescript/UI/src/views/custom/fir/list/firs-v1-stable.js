import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Axios from 'axios';
import msg from 'messages.js';
function UserRow(props) {
  const fir = props.fir
  const firdetails = `/listalldata/${fir._id}`

  const getBadge = (status) => {
    return status.toLowerCase() === 'approved' ? 'success' :
      status.toLowerCase() === 'inactive' ? 'secondary' :
        status.toLowerCase() === 'pending' ? 'warning' :
          // status.toLowerCase() === 'Banned' ? 'danger' :
          'primary'
  }

  return (

    <tr key={fir._id.toString()}>

      <td><Link to={firdetails}>{fir.PersonName}</Link></td>
      <td>{fir.CaseTitle}</td>
      <td>{fir.CrimeType}</td>
      <td>{fir.District}</td>
      <td>{fir.RegistrarName}</td>
      <td>{fir.createdAt}</td>


      <td><Badge color={getBadge(fir.Status)}>{fir.Status}</Badge>  </td>
    </tr>
  )
}

class Firs extends React.Component {
  state = {
    apiurl: "fir/",
    firdata: [],
  };
  componentDidMount() {
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
  render() {



    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Firs <small className="text-muted">List</small>
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
                      <UserRow key={index} fir={fir} />
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

export default Firs;
