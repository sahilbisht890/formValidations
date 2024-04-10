
var errors = {}
function formSubmit() {
    event.preventDefault();
    let form = document.getElementById("login-form");
    let info = {
        'Full Name': form.elements.username.value,
        'Age': form.elements.age.value,
        'Gender': form.elements.gender.value,
        'Phone': form.elements.phone.value,
        'Email': form.elements.email.value,
        'Pincode': form.elements.pincode.value,
        'Address': form.elements.address.value
    };

    let temp = form.elements.password.value;
    let star='*';
    let l=temp.length;


    info['Password'] = star.padStart(l-3,'*')+temp.slice(-3);
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
        }, 1000);
        form.reset();
    }
    return false;
}

function fetchValue(id)
{
   let element=document.getElementById(id);
   let val=element.value;
   return val;
}

function showError(msg,id)
{
  document.querySelector('.error'+id).innerHTML=msg;  
  document.getElementById(id).style.border='1px solid red';
  errors[id]=true;  

}

function noerror(id)
{
    document.querySelector('.error'+id).innerHTML='';   
    errors[id]=false;  
    document.getElementById(id).style.border='none';

 
}

function checkname()
{
    let val=fetchValue("username");
    val=val.trimEnd();
    let fullname=val.split(' ');

    if(val.length>0 && fullname.includes(''))
    {
        showError("Full name cannot contains extra space",'username');
        return ;
    }
    else 
    {
        let str=val.toLowerCase();
        for(let i in str) 
        {
            if(str.at(i)!=' '&&str.charCodeAt(i)<97||str.charCodeAt(i)>122)
            {
            showError('Full name can only contains Alphabets','username');
            return;
            }
        }
    }
    noerror('username');
}

function checkPhone()
{
    let val=fetchValue("phone");
    val=val.trimEnd();

    if(val.length==0)
    {

        noerror('phone');
        return;
    }
    let errorfound=false;
    if(val.length!=10)
    {
        errorfound=true;
    }
    else 
    {
        let str=val.toLowerCase();
        for(let i in str) 
        {
            if(str.charCodeAt(i)<48||str.charCodeAt(i)>57)
            {
                errorfound=true;
                break;
            }
        }
    }

    if(errorfound)
    showError('Phone Number Can only have number(length should be 10)','phone');
    else
    noerror('phone');

}


function checkPincode()
{
    let val=fetchValue("pincode");
    val=val.trimEnd();

    if(val.length==0)
    {

        noerror('pincode');
        return;
    }
    let errorfound=false;
    if(val.length!=6)
    {
        errorfound=true;
    }
    else 
    {
        let str=val.toLowerCase();
        for(let i in str) 
        {
            if(str.charCodeAt(i)<48||str.charCodeAt(i)>57)
            {
                errorfound=true;
                break;
            }
        }
    }

    if(errorfound)
    showError('Pincode Can only have number(length should be 6)','pincode');
    else
    noerror('pincode');
}

function checkEmail()
{
    let val=fetchValue("email");
    

    if(val.length==0)
    {
        noerror('email');
        return;
    }
    let errorfound=false;
    let arrEmail=val.split('@');
    if(arrEmail.length!=2||val.includes(' ')||arrEmail.includes(''))
    {
        errorfound=true;

    }
    else
    { 
        let firstPart=arrEmail[0].toLowerCase();
        console.log(firstPart)

        const digits=['0','1','2','3','4','5','6','7','8','9'];

        for(let i in firstPart)
        {
                let ch=firstPart.at(i);


                if((ch<'a'||ch>'z')&& !digits.includes(ch))
                {
                    console.log(ch);
                    errorfound=true;     
                    break;
                }

        }

        let secondEmailPart=arrEmail[1].toLowerCase();
        let temp=secondEmailPart.split('.');
        if(temp.length==1||temp.includes(''))
        {
            errorfound=true;
    
        }
        else
        {
             for(let i in secondEmailPart)
             {
                if((secondEmailPart.charCodeAt(i)<97||secondEmailPart.charCodeAt(i)>122)&&secondEmailPart.at(i)!='.')
                {
                    errorfound=true;
                     break;
                }

             }

        }


    }

    
    if(errorfound)
    showError('Invalid Email','email');
    else
    noerror('email');
}

function checkPassword()
{
    let val=fetchValue("password");
    val=val.trimEnd();

    if(val.length==0)
    {
        noerror('password');
        return;
    }
    let errorfound=false;

    if(val.length<7)
    {
          errorfound=true;
    }
    else
        {
           let validation={'small':0,'caps':0,'number':0,'special':0};
           for(let i in val)
           {
                      let ch=val.at(i);
                      if(ch>='a' && ch<='z')
                      {
                        validation['small']=validation['small']+1;
                      }
                    else  if(ch>='A' && ch<='Z')
                      {
                        validation['caps']=validation['caps']+1;
                      }
                     else if(ch>='0' && ch<='9')
                      {
                        validation['number']=validation['number']+1;
                      }
                      else if(ch!=' ')
                      {
                        validation['special']=validation['special']+1;

                      }
                
           }

           for(let i in validation)
           {
                if(validation[i]==0)
                {
                errorfound=true;
                 break;
                }

           }



        }

        if(errorfound)
        showError('Invalid Password ,Should contains Special ,lower ,capital,digits <br>(Min Lenght should be 7)','password');
        else
        noerror('password');

}