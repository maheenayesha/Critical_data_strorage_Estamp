import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import "./style.css";
import Read from './Read';
export default class DynamicForm extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            fields: [{ PersonName: "dawood" },
            { IncidentLocation: "St # 02 Model Town house 332" },
            {
                RegistrarDesignation: "Clerk"
            },
            {
                CrimeType: "Violence"
            }
                //   ,{
                //     Hash: "asd",
                // } 
                , {
                District: "Punjab",
            }, {
                CaseSummary: "2 people killed their friend",
            },
            {
                RegistrarName: "Umar",
            }],
            headers: {
                'Content-Type': 'application/json',

            }
        };
    }


    handlefieldchange = idx => evt => {
        // console.log("value changed key", idx);


        const newShareholders = this.state.fields.map((field, sidx) => {
            // let key = Object.keys(this.state.fields[idx]);
            // console.log("key Name", Object.keys(field)[0]);
            // console.log("field", field);
            if (idx !== sidx) return field;

            field[Object.keys(field)[0]] = evt.target.value;
            // console.log("field", field);
            // field.key[0] = evt.target.value;
            return field;
        });

        this.setState({ fields: newShareholders });
        console.log("New State Value", newShareholders);
    };
    handleSubmit = () => {
        axios.post(`${process.env.REACT_APP_Api}data/`, {
            obj: this.state.fields,

        }, { headers: this.state.headers })
            .then(response => {
                if (response.status == 201) {
                    alert("data added Successfully");
                }
                console.log(response);
            })
            .catch(function (error) {
                alert("Something went wrong");
            });
    }

    // handleAddShareholder = () => {
    //     this.setState({
    //         fields: this.state.fields.concat([{ name: "" }])
    //     });
    // };

    // handleRemoveShareholder = idx => () => {
    //     this.setState({
    //         fields: this.state.fields.filter((s, sidx) => idx !== sidx)
    //     });
    // };
    getobjvalue = (obj, key) => {
        console.log("object value ", obj, key);
        return obj.key;
    }
    render() {
        console.log("env url", process.env.REACT_APP_Api);
        return (
            <div>
                <form onSubmit={this.handleSubmit}>


                    <h4>FIR</h4>

                    {this.state.fields.map((field, idx) => (
                        <div className="field" key={idx}>
                            {/* {console.log("idx in form", idx)} */}
                            <input
                                type="text"
                                // placeholder={`Shareholder #${idx + 1} name`}
                                placeholder={Object.keys(field)[0]}
                                value={this.getobjvalue(field, Object.keys(field)[0])}
                                onChange={this.handlefieldchange(idx)}
                            />

                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={this.handleSubmit}
                        className="small"
                    >
                        Add
                </button>

                </form>
                <Read />
            </div>
        );
    }
}
