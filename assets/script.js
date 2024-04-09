
var errors = {}
function formSubmit() {
    event.preventDefault();
    let form = document.getElementById("login-form");
    let info = {
        'username': form.elements.username.value,
        'phone': form.elements.phone.value,
        'email': form.elements.email.value,
        'pincode': form.elements.pincode.value,
        'address': form.elements.address.value,
        'age': form.elements.age.value,
        'gender': form.elements.gender.value,
    };

    let temp = form.elements.password.value;
    let star='*';
    let l=temp.length;


    info['password'] = star.padStart(l-3,'*')+temp.slice(-3);
    let moveForward = true;
    for (let i in errors) {
        if (errors[i]) {
            moveForward = false;
        }
    }

    if (moveForward) {

        document.querySelector('.loading-overlay').style.display = 'block';
        setTimeout(() => {
            localStorage.setItem('formData', JSON.stringify(info));

            window.location.href = "formData.html";
        }, 2000);
        form.reset();
    }
    return false;
}

function checkField(event) {
    const id = event.target.id;
    const el = document.getElementById(id);

    if (id == 'password') 
    {
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        if (!passwordRegex.test(el.value)) {
            console.log("error" + id);
            document.querySelector(".error" + id).innerHTML = 'Invalid PassWord';
            errors[id] = true;
        }
        else 
        {
            document.querySelector(".error" + id).innerHTML = '';
            errors[id] = false;
        }
        return;
    }

    const regexName = /[^a-zA-Z\s]+/; //form name ;
    const regexPhone = /^(?!\d{10}$).*$/;
    const invalidEmailRegex = /^(?!.*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}).+$/;
    const notSixDigitRegex = /^(?!\d{6}$).+$/;
    const errorMessage = { username: 'Full Name can only have Alphabets', phone: 'Invalid Phone Number(Length should be of 10 digits)', email: 'Please Check your Email', pincode: 'Invalid Pincode' }
    const checkFieldKey = { 'username': regexName, 'phone': regexPhone, 'email': invalidEmailRegex, 'pincode': notSixDigitRegex };
    if (checkFieldKey[id].test(el.value)&&el.value!='')
    {
        console.log("error" + id);
        document.querySelector(".error" + id).innerHTML = errorMessage[id];
        errors[id] = true;
    }
    else
    {
        document.querySelector(".error" + id).innerHTML = '';
        errors[id] = false;

    }

}













