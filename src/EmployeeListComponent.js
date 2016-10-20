import React, { Component } from 'react';
import EmployeeItemComponent from './EmployeeItemComponent';
class EmployeeListComponent extends Component {


    render() {
        this.props.employees.sort(function (a, b) {
            var employeeA = a.name.toUpperCase();
            var employeeB = b.name.toUpperCase();
            if (employeeA < employeeB) {
                return -1;
            }
            if (employeeA > employeeB) {
                return 1;
            }
            return 0;
        });

        var employeeRows = this.props.employees.map(function (emp) {
            return (<EmployeeItemComponent key={emp._id} emp={emp}
             handleDelete={this.props.handleDelete}
             handleEditClick={this.props.handleEditClick} />
            )
        }.bind(this));
        return (

            <div className="container">
                <table className="table table-hover">
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
            {employeeRows}
                     </tbody>
                </table>
          </div>

        );
    }
}

export default EmployeeListComponent;