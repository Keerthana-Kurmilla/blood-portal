const API_URL = "http://localhost:5000";

// Register user
async function registerUser() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const city = document.getElementById("regCity").value;
  const phone = document.getElementById("regPhone").value;
  const bloodGroup = document.getElementById("regBloodGroup").value;

  if (!name || !email || !password || !city || !phone || !bloodGroup) {
    alert("Please fill all fields!");
    return;
  }

  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, city, phone, blood_group: bloodGroup }),
  });

  const data = await res.json();
  alert(data.message);
}

// Login user
async function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Enter login details!");
    return;
  }

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  alert(data.message);
}

// View donors
async function viewDonors() {
  const group = document.getElementById("bloodGroup").value;

  if (!group) {
    alert("Please select a blood group!");
    return;
  }

  const res = await fetch(`${API_URL}/donors/${group}`);
  const donors = await res.json();

  const donorList = document.getElementById("donorList");
  donorList.innerHTML = "";

  if (!Array.isArray(donors) || donors.length === 0) {
    donorList.innerHTML = `<p>No donors found for ${group}.</p>`;
    return;
  }

  donors.forEach((donor) => {
    const card = document.createElement("div");
    card.className = "donor-card";
    card.innerHTML = `
      <h3>${donor.name}</h3>
      <p><strong>Blood Group:</strong> ${donor.blood_group}</p>
      <p><strong>City:</strong> ${donor.city}</p>
      <p><strong>Phone:</strong> ${donor.phone}</p>
    `;
    donorList.appendChild(card);
  });
}
