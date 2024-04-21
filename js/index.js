// script.js

// Function to update the chart based on a selected period

var ctx = document.getElementById('carbonChart').getContext('2d');
var chartPeriod = document.getElementById('chartPeriod');
var carbonSummary = document.getElementById('carbonSummary');
var myChart;

//Data for yearly,monthly and weekly
var data = {
    weekly: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [2, 3, 1.5, 4, 2.5, 3.5, 2],
        summary: '<h3 class="mb-3">Weekly Carbon Footprint Saved</h3><ul class="list-unstyled"><li><strong>Monday:</strong> 2 tons</li><li><strong>Tuesday:</strong> 3 tons</li><li><strong>Wednesday:</strong> 1.5 tons</li><li><strong>Thursday:</strong> 4 tons</li><li><strong>Friday:</strong> 2.5 tons</li><li><strong>Saturday:</strong> 3.5 tons</li><li><strong>Sunday:</strong> 2 tons</li></ul>'
    },
    monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        values: [15, 18, 22, 20, 25, 28, 30, 32, 27, 23, 20, 18],
        summary: '<h3 class="mb-3">Monthly Carbon Footprint Saved</h3><ul class="list-unstyled"><li><strong>January:</strong> 15 tons</li><li><strong>February:</strong> 18 tons</li><li><strong>March:</strong> 22 tons</li><li><strong>April:</strong> 20 tons</li><li><strong>May:</strong> 25 tons</li><li><strong>June:</strong> 28 tons</li><li><strong>July:</strong> 30 tons</li><li><strong>August:</strong> 32 tons</li><li><strong>September:</strong> 27 tons</li><li><strong>October:</strong> 23 tons</li><li><strong>November:</strong> 20 tons</li><li><strong>December:</strong> 18 tons</li></ul>'
    },
    yearly: {
        labels: ['2018', '2019', '2020', '2021', '2022'],
        values: [120, 150, 180, 210, 250],
        summary: '<h3 class="mb-3">Yearly Carbon Footprint Saved</h3><ul class="list-unstyled"><li><strong>2022:</strong> 250 tons</li><li><strong>2021:</strong> 210 tons</li><li><strong>2020:</strong> 180 tons</li><li><strong>2019:</strong> 150 tons</li><li><strong>2018:</strong> 120 tons</li></ul>'
    }
};


//
function updateChart() {
    var period = chartPeriod.value;
    var chartData = data[period];

    //Checking if a chart instance 'myChart' already exists
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'line',

        // The 'data' property of the chart configuration
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Carbon Footprint Saved (in tons)',
                data: chartData.values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            maintainAspectRatio: false,
            responsive: true
        }
    });

    carbonSummary.innerHTML = chartData.summary;
}

chartPeriod.addEventListener('change', updateChart);
updateChart();


// Login Page
// Defining a function to display the signup form and hide the login form
function showSignupForm() {
    var loginContainer = document.querySelector('.login-container');
    var signupContainer = document.querySelector('.signup-container');

    loginContainer.style.display = 'none';
    signupContainer.style.display = 'block';
}
// Defining a function to display the login form and hide the signup form
function showLoginForm() {
    var loginContainer = document.querySelector('.login-container');
    var signupContainer = document.querySelector('.signup-container');

    loginContainer.style.display = 'block';
    signupContainer.style.display = 'none';
}

var loginContainer = document.querySelector('.login-container');
var signupContainer = document.querySelector('.signup-container');

loginContainer.style.display = 'block';
signupContainer.style.display = 'none';


// Carbon Footprint Calculator

function calculateCarbonSavings() {
    const distance = parseFloat(document.getElementById('distance').value);
    const mode = document.getElementById('mode').value;
    const instead = document.getElementById('instead').value;
    const date = document.getElementById('date').value;

    const modeData = getActivityData(mode);
    const insteadData = getActivityData(instead);

    if (!modeData || !insteadData) {
        displayMessage('Please select valid modes.', false);
        return;
    }

    const modeEmissions = modeData.carbonFootprint * (distance * 10);
    const insteadEmissions = insteadData.carbonFootprint * (distance * 10);

    const carbonSavings = (insteadEmissions - modeEmissions) * 1000; // Convert kg to grams
    document.getElementById('carbonSavings').textContent = `${carbonSavings.toFixed(2)} g CO2e`;
}
//Retrieving the ActivityData
function getActivityData(activityName) {
    const activities = [
        { name: 'walk', carbonFootprint: 0 },
        { name: 'bicycle', carbonFootprint: 0 },
        { name: 'car', carbonFootprint: 27.1 },
        { name: 'electric_vehicle', carbonFootprint: 2 },
        { name: 'public_transport_bus', carbonFootprint: 10.5 },
        { name: 'public_transport_train', carbonFootprint: 1.4 },
        { name: 'motorcycle', carbonFootprint: 7.2 }
    ];
    return activities.find(activity => activity.name === activityName);
}

// Retrieve the DOM element where messages are displayed using its ID 'messageArea1'.
function displayMessage(message, isSuccess) {
    const messageArea = document.getElementById('messageArea1');
    messageArea.textContent = message;
    messageArea.className = isSuccess ? 'success' : 'error';
    setTimeout(() => {
        messageArea.textContent = '';
        // Removing any CSS class names from the messageArea, resetting its styling.
        messageArea.className = '';
    }, 3000);
}

// Call the calculateCarbonSavings function
calculateCarbonSavings();