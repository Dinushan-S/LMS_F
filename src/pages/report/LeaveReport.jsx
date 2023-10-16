import React, { useEffect, useState } from 'react'
import { SearchBar } from '../../Component/searchbar/SearchBar';
import { SearchResultsList } from '../../Component/searchbar/SearchResultsList';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { jsPDF } from 'jspdf';

export default function LeaveReport() {

    const [result, setResult] = useState([])
    const [visible, setVisible] = useState(true);
    const [leaveResults, setLeaveResults] = useState([])
    const [show, setShow] = useState(true);

    var TotalLeave = 0;
    var AnnualLeave = 0;
    var SickLeave = 0;
    var MaternityLeave = 0;
    var PaternityLeave = 0;
    var UnpaidLeave = 0;

    const handleClick = () => {
        // const handleClick = (generatePDF(result, leaveResults)) => {

    }

    return (
        <div className='report'>
            <div className='search-bar-container'>
                <SearchBar setResult={setResult} setVisible={setVisible} />
                {visible && <SearchResultsList result={result} setLeaveResults={setLeaveResults} setVisible={setVisible} />}
            </div>
            <div>
                {console.log(result)}
                {console.log(leaveResults)}
                <div>Total Leave : {leaveResults.length}</div>
                <div className=''>

                    {leaveResults.map((results, index) => (
                        <div style={{ color: " white" }}>
                            {show && results.type === 0 ? AnnualLeave++ : null}
                            {show && results.type === 1 ? SickLeave++ : null}
                            {show && results.type === 2 ? MaternityLeave++ : null}
                            {show && results.type === 3 ? PaternityLeave++ : null}
                            {show && results.type === 4 ? UnpaidLeave++ : null}
                        </div>
                    ))}
                    <div>Annual Leave : {AnnualLeave}</div>
                    <div>Sick Leave : {SickLeave}</div>
                    <div>Maternity Leave : {MaternityLeave}</div>
                    <div>Paternity Leave : {PaternityLeave}</div>
                    <div>Unpaid Leave : {UnpaidLeave}</div>
                </div>
            </div>


            <div>
                <button onClick={() => generatePDF(result, leaveResults)} type="button">
                    Download PDF
                </button>
            </div>



        </div>
    );
}

const generatePDF = (users, leaveData) => {
    const doc = new jsPDF();
    console.log(users);
    const user = users.shift();
    console.log(user);
    console.log(leaveData);

    // Add user information to the PDF
    doc.setFont("helvetica", "bold");
    doc.text(20, 20, "User Information");
    doc.setFont("helvetica", "normal");
    doc.text(20, 30, `Name: ${user.firstName} ${user.lastName}`);
    doc.text(20, 40, `Email: ${user.email}`);
    doc.text(20, 50, `Phone: ${user.phone}`);
    doc.text(20, 60, `Department: ${user.departmentName}`);

    // Add leave report data to the PDF
    doc.setFont("helvetica", "bold");
    doc.text(20, 80, "Leave Report");
    doc.setFont("helvetica", "normal");
    let y = 100;
    leaveData.forEach((leave) => {
        doc.text(20, y, `Type: ${leave.type}`);
        doc.text(20, y + 10, `Start Date: ${leave.startDate}`);
        doc.text(20, y + 20, `End Date: ${leave.endDate}`);
        doc.text(20, y + 30, `Reason: ${leave.reason}`);
        doc.text(20, y + 40, `Is Approved: ${leave.isApproved}`);
        y += 60;
    });

    // Save the PDF
    doc.save(`${user.firstName}_${user.lastName}_leave_report.pdf`);
    // Return the PDF data as a blob
    // return doc.output("blob");

}

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        width: "100%",

    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10
    }
});
