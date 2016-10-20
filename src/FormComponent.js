import React, { Component } from 'react';
import toastr from 'toastr';

class FormComponent extends Component {

    handleSubmit = (e) => {
         e.preventDefault();
        if(this.props.editable_employee.date_of_birth===undefined || this.props.editable_employee.date_of_birth===""){
            toastr.error("You forgot to provide the date of birth of the employee !!"); 
        }else{
       this.props.onSubmit(e);
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <form onSubmit={this.handleSubmit}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date of Birth</th>
                                <th>Department</th>
                                <th>Gender</th>
                                <th>Age</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>

                                <td>
                                    <input type="text" value={this.props.editable_employee.name}  onChange={this.props.handleNameChange} className="form-control " required placeholder="Name"></input>
                                </td>
                                <td>
                                    <input type="email" value={this.props.editable_employee.email}  onChange={this.props.handleEmailChange} className="form-control " required placeholder="E-mail"></input>
                                </td>
                                <td>
                                    <input type="date" value={this.props.editable_employee.date_of_birth}  onChange={this.props.handleDOBChange} id="txtDate" className="form-control" max="2016-10-20" />
                                </td>
                                <td>
                                    <input type="text" value={this.props.editable_employee.department}  onChange={this.props.handleDepartmentChange} className="form-control " required placeholder="department" />
                                </td>
                                <td>
                                    <input type="text" value={this.props.editable_employee.gender}  onChange={this.props.handleGenderChange} className="form-control " required placeholder="gender" />
                                </td>
                                <td>
                                    <input type="text"  value={this.props.editable_employee.age} id="myAge"  className="form-control " required placeholder="age" disabled />
                                </td>

                                <td>
                                    <button type="submit" className="btn btn-success btn-md">Add Employee</button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-success btn-md" onClick={this.props.handleEdit}>Update Employee</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default FormComponent;