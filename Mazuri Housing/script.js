// Toggle Navigation Menu for mobile
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
}

// Load Rent Data on page load
document.addEventListener("DOMContentLoaded", function() {
    const rentData = [
        { name: "John Doe", amount: "KES 20,000", status: "Paid" },
        { name: "Jane Smith", amount: "KES 18,000", status: "Pending" }
    ];

    const tableBody = document.getElementById("rent-data");

    rentData.forEach((tenant) => {
        let row = document.createElement("tr");

        const rentStatusColor = tenant.status === 'Paid' ? 'green' : 'red';

        row.innerHTML = `
            <td>${tenant.name}</td>
            <td>${tenant.amount}</td>
            <td style="color: ${rentStatusColor};">${tenant.status}</td>
        `;

        tableBody.appendChild(row);
    });
});

// Handle Registration Form Submission
document.getElementById("register-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent page refresh

    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let role = document.getElementById("role").value;
    let password = document.getElementById("password").value;

    if (!fullname || !email || !role || !password) {
        alert("Please fill all fields before submitting.");
        return;
    }

    try {
        let response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fullname, email, role, password }),
        });

        if (!response.ok) throw new Error("Server Error");

        let result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error("Registration Error:", error);
        alert("Failed to register. Check server connection.");
    }
});

// Handle Rent Form Submission
document.getElementById("rent-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page refresh

    // Get input values
    let tenantName = document.getElementById("tenant-name").value;
    let rentAmount = document.getElementById("rent-amount").value;
    let rentStatus = document
