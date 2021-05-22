import React from 'react';
import './table.css';

function Table(props) {
    const {countriesData} = props;
    return (
        <div className="table1"> 
        {
            countriesData.map( ({country, cases}) => (
                <tr key={country}>
                    <td>{country}</td>
                    <td><strong>{cases}</strong></td>
                </tr>
            ))
        }
        </div>
    )
}

export default Table
