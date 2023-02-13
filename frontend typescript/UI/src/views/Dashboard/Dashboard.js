import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {

  Card,
  CardBody, Col,
  Row,
  Table,
} from 'reactstrap';
import Axios from "axios";
import msg from 'messages.js';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
// Card Chart 3
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      usercount: 11,
      fircount: 11,
      userapiurl: "user/count",
      firapiurl: "user/fircount"
    };
  }
  componentDidMount() {
    this.getfircount();
    this.getusercount();
  }
  getfircount = () => {
    Axios.get(`${process.env.REACT_APP_Api}${this.state.firapiurl}/`)
      .then(response => {
        if (response.status === 201) {
          this.setState({ fircount: response.data.count });

        }


      })
      .catch(function (error) {
        if (error.response && error.response.status === 409) {
          //place your reentry code
        }
        else {
          console.log(msg.servererror);

        }

      });

  }
  getusercount = () => {
    Axios.get(`${process.env.REACT_APP_Api}${this.state.userapiurl}/`)
      .then(response => {
        if (response.status === 201) {
          this.setState({ usercount: response.data.count });

        }


      })
      .catch(function (error) {
        if (error.response && error.response.status === 409) {
          //place your reentry code
        }
        else {
          console.log(msg.servererror);

        }

      });

  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                {/* <ButtonGroup className="float-right">
                  <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem disabled>Disabled action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup> */}
                <div className="text-value">{this.state.fircount}</div>
                <div>Total Firs</div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">{this.state.usercount}</div>
                <div>Users</div>
              </CardBody>
            </Card>
          </Col>


        </Row>

      </div>
    );
  }
}

export default Dashboard;
