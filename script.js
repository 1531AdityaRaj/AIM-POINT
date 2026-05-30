console.log("AIM POINT STUDY CIRCLE WEBSITE LOADED");

async function submitAdmission() {

    const data = {

        student_name: document.getElementById("student_name").value,

        father_name: document.getElementById("father_name").value,

        mother_name: document.getElementById("mother_name").value,

        dob: document.getElementById("dob").value,

        gender: document.getElementById("gender").value,

        blood_group: document.getElementById("blood_group").value,

        nationality: document.getElementById("nationality").value,

        aadhar_number: document.getElementById("aadhar_number").value,

        father_occupation: document.getElementById("father_occupation").value,

        parent_mobile: document.getElementById("parent_mobile").value,

        mobile: document.getElementById("mobile").value,

        whatsapp_number: document.getElementById("whatsapp_number").value,

        email: document.getElementById("email").value,

        address: document.getElementById("address").value,

        city: document.getElementById("city").value,

        state: document.getElementById("state").value,

        pin_code: document.getElementById("pin_code").value,

        school_name: document.getElementById("school_name").value,

        board: document.getElementById("board").value,

        percentage: document.getElementById("percentage").value,

        strongest_subject: document.getElementById("strongest_subject").value,

        weakest_subject: document.getElementById("weakest_subject").value,

        class_applied: document.getElementById("class_applied").value,

        purpose: document.getElementById("purpose").value,

        admission_fee: document.getElementById("admission_fee").value,

        admission_date: document.getElementById("admission_date").value,

        monthly_fee: document.getElementById("monthly_fee").value
    };

    try {

        const response = await fetch(
            "http://localhost:5000/admission",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        alert(result.message);

    } catch (error) {

        console.log(error);

        alert("Error Connecting To Server");
    }
}