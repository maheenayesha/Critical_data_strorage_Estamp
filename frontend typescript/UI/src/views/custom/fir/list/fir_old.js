import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Axios from 'axios';
import msg from 'messages';
class Fir extends React.Component {
  state = {
    apiurl: "fir/",
    firdata: [],
    firid: this.props.match.params.id,
  };
  componentDidMount() {
    Axios.get(`${process.env.REACT_APP_Api}${this.state.apiurl}/${this.state.firid}`)
      .then(response => {
        if (response.status === 200) {
          let fir = Object.entries(response.data.fir);
          this.setState({ firdata: fir }, () => {
            console.log(this.state.firdata)
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
  render() {

    // const user = usersData.find( user => user.id.toString() === this.props.match.params.id)

    // const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Fir id: {this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {
                      this.state.firdata.map(([key, value]) => {
                        //  console.log('key',key);
                        if(key!=='StreamId' && key !=='__v')
                       { return (
                          <tr key={key}>
                            <td>{`${key}:`}</td>
                            <td><strong>{value}</strong></td>
                          </tr>
                        
                        )}
                      }) 
                    }
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

export default Fir;
