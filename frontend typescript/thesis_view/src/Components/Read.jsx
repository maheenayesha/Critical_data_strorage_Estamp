import React, { Component } from 'react';
import Axios from 'axios';
class Read extends Component {
    constructor() {
        super();
        this.state = { apidata: [] }
    }
    componentDidMount = () => {
        this.getData();
    };

    getData = () => {
        Axios.get(`${process.env.REACT_APP_Api}data/`).then(res => {

            if (res.status == 200) {
                console.log("reading api data", res.data.data);
                this.setState({ apidata: res.data.data });
            }

        })
            .catch(function (error) {
                alert("Something went wrong reading form");

            });
    }

    render() {
        return (<h1>Reading api data is
          {this.state.apidata.length !== 0 ?

                <ol>
                    {this.state.apidata.map(ele =>
                        <li key={ele._id}>
                            {ele.dataobj.PersonName}
                            <br></br>
                        </li>

                    )}
                </ol>
                : ""}
        </h1>);
    }
}

export default Read;