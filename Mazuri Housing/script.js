// Toggle Navigation Menu for mobile
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
}

// Load Rent Data on page load
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("http://localhost:5000/api/rent");
        const rentData = await response.json();

        const tableBody = document.getElementById("rent-data");
        tableBody.innerHTML = ""; // Clear existing rows

        rentData.forEach((tenant) => {
            const row = document.createElement("tr");
            const rentStatusColor = tenant.status === "Paid" ? "green" : "red";

            row.innerHTML = `
                <td>${tenant.name}</td>
                <td>${tenant.amount}</td>
                <td style="color: ${rentStatusColor};">${tenant.status}</td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching rent data:", error);
        alert("Failed to load rent data. Check server connection.");
    }
});

// Load Payment Data on page load
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("http://localhost:5000/api/payments");
        const paymentData = await response.json();

        const tableBody = document.getElementById("payments-data");
        tableBody.innerHTML = ""; // Clear existing rows

        paymentData.forEach((payment) => {
            const row = document.createElement("tr");
            const paymentStatusColor = payment.status === "Completed" ? "green" : "red";

            row.innerHTML = `
                <td>${payment.tenantName}</td>
                <td>${payment.amount}</td>
                <td>${payment.date}</td>
                <td style="color: ${paymentStatusColor};">${payment.status}</td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching payment data:", error);
        alert("Failed to load payment data. Check server connection.");
    }
});

// Load Maintenance Data on page load
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("http://localhost:5000/api/maintenance");
        const maintenanceData = await response.json();

        const tableBody = document.getElementById("maintenance-data");
        tableBody.innerHTML = ""; // Clear existing rows

        maintenanceData.forEach((request) => {
            const row = document.createElement("tr");
            const requestStatusColor = request.status === "Resolved" ? "green" : "red";

            row.innerHTML = `
                <td>${request.id}</td>
                <td>${request.tenantName}</td>
                <td>${request.description}</td>
                <td style="color: ${requestStatusColor};">${request.status}</td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching maintenance data:", error);
        alert("Failed to load maintenance data. Check server connection.");
    }
});

// Handle Registration Form Submission
document.getElementById("register-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page refresh

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
    const password = document.getElementById("password").value;

    if (!fullname || !email || !role || !password) {
        alert("Please fill all fields before submitting.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: fullname, email, role, password }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
        } else {
            alert(result.message || "Registration failed");
        }
    } catch (error) {
        console.error("Registration Error:", error);
        alert("Failed to register. Check server connection.");
    }
});

// Handle Rent Form Submission
document.getElementById("rent-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const tenantId = document.getElementById("tenant-id").value;
    const amount = document.getElementById("amount").value;
    const dueDate = document.getElementById("due-date").value;
    const status = document.getElementById("status").value;

    if (!tenantId || !amount || !dueDate || !status) {
        alert("Please fill all fields before submitting.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/data/rent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tenant_id: tenantId, amount, due_date: dueDate, status }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            document.getElementById("rent-form").reset();
        } else {
            alert(result.message || "Failed to add rent record");
        }
    } catch (error) {
        console.error("Error adding rent record:", error);
        alert("Failed to add rent record. Check server connection.");
    }
});