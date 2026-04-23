
const axios = require('axios');

async function inspectPayrollData() {
    try {
        const employeeId = 932;
        const url = `http://localhost:3000/api/payroll-master/contracts?employee_id=${employeeId}`;
        console.log(`Fetching from: ${url}`);
        
        const response = await axios.get(url);
        console.log('Response Status:', response.status);
        console.log('Response Data:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error fetching data:', error.message);
        if (error.response) {
            console.error('Response Data:', error.response.data);
        }
    }
}

inspectPayrollData();
