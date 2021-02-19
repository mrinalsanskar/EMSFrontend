import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            eid: '',
            name: '',
            designation: '',
            emailId: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeeIdHandler = this.changeeIdHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);

        this.changeDesignationHandler = this.changeDesignationHandler.bind(this);

        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id === '_add') {
            return
        } else {
            let empid = this.state.id;
            EmployeeService.getEmployeeById(empid).then((res) => {
                let employee = res.data;
                console.log(JSON.stringify(employee));
                this.setState({
                    eid: employee.eid,
                    name: employee.name,
                    designation: employee.designation,
                });
            });
        }
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = { name: this.state.name, designation: this.state.designation, eid: this.state.eid};


        // step 5
        if (this.state.id === '_add') {

            EmployeeService.createEmployee(employee).then(res => {

                this.props.history.push('/employees');
            });
        } else {
            EmployeeService.updateEmployee(employee, this.state.eid).then(res => {

                this.props.history.push('/employees');
            });
        }
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    changeeIdHandler = (event) => {
        this.setState({ eid: event.target.value });
    }

    changeEmailHandler = (event) => {
        this.setState({ emailId: event.target.value });
    }

    changeDesignationHandler = (event) => {
        this.setState({ designation: event.target.value });
    }


    cancel() {
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Employee id: </label>
                                            <input placeholder="Employee Id" name="eid" className="form-control" 
                                                value={this.state.eid} onChange={this.changeeIdHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Employee Name: </label>
                                            <input placeholder="Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Employee Designation: </label>
                                            <input placeholder="Designation" name="designation" className="form-control" 
                                                value={this.state.designation} onChange={this.changeDesignationHandler}/>
                                        </div>
                                        {/* <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                            </div>*/}

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
