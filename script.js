
// flip do card de login/registro
document.querySelectorAll("#button-flip").forEach(function(element) {
    element.addEventListener("click", () =>{
        document.querySelector("#card").classList.toggle("create")
    })
})




//validação de forms
const init = () => {

    const inputRegEmail = document.querySelector('#email')
    const inputRegPassword = document.querySelector('#password')
    const submitRegButton = document.querySelector('#reg-submit')
    const confirmRegPassword = document.querySelector('.confirm-register--input')
    const inputEmail = document.querySelector('input[type="email"]')
    const inputPassword = document.querySelector('input[type="password"]')
    const submitButton = document.querySelector('.login-submit')


   

    const validateEmail = (event) => {
        const input = event.currentTarget
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailTest = regex.test(input.value)

        !emailTest ? disableButton(input) : enableButton(input)
    }

    const validatePassword = event => {
        const input = event.currentTarget
        input.value.length < 4 ? disableButton(input) : enableButton(input)
    }



    // aplica didabled no button e adiciona 'erro' no item (input)
    function disableButton(item) {
        submitRegButton.setAttribute('disabled', 'disabled')
        submitButton.setAttribute('disabled', 'disabled')
        item.nextElementSibling.classList.add('error')
    }
    // remove o disable do button e remove o error do item
    function enableButton (item) {
        submitRegButton.removeAttribute('disabled')
        submitButton.removeAttribute('disabled')
        item.nextElementSibling.classList.remove('error')
    }


    

    inputEmail.addEventListener('input' , validateEmail)
    inputPassword.addEventListener('input', validatePassword)
    inputRegEmail.addEventListener('input' , validateEmail)
    inputRegPassword.addEventListener('input', validatePassword)






    // Error functions
    const errorHandler = () => {
        submitButton.classList.remove('loading');
        submitButton.classList.remove('success');
        submitButton.classList.add('error');
        submitButton.textContent = "Error :(";
    }

    const errorRegHandler = () => {
        submitRegButton.classList.remove('loading');
        submitRegButton.classList.remove('success');
        submitRegButton.classList.add('error');
        submitRegButton.textContent = " Email or password invalid";
        disableButton(confirmRegPassword)
        
    }


    // Sucess functions
    const sucessHandler = () => {
        submitButton.classList.remove('loading');
        submitButton.classList.remove('error');
        submitButton.classList.add('success');
        submitButton.textContent = "login done!";
        setTimeout(() => {
             alert('Você será redirecionado para a foto de um gatinho pra imitar a entrada de um sistema ok? :D'),
            window.location.href = "https://media.makeameme.org/created/thats-it-im-5bf3a7.jpg" 
        }, 2000)
        
       
    }

    const sucessRegHandler = () => {
        submitRegButton.classList.remove('loading');
        submitRegButton.classList.remove('error');
        submitRegButton.classList.add('success');
        submitRegButton.textContent = "Sucess! You will return to login.";
        enableButton(confirmRegPassword)
        setTimeout(() => {
            document.querySelector("#card").classList.toggle("create")
        }, 3000);
        
    }







    // Conditions for Submit Buttons

    // Login Submit
    if (submitButton) {
        submitButton.addEventListener("click", (event) => {
            event.preventDefault()

            submitButton.textContent = "login..."

            fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    email: inputEmail.value, 
                    password: inputPassword.value,
                })
            }).then((response) => {
                if (response.status !== 200){  
                                   
                    return errorHandler()
                }
                sucessHandler()
                
            }).catch(() => {
                errorHandler()
            
            })
        })
    }

    // Register Submit
    if (submitRegButton) {
        submitRegButton.addEventListener("click", (event) => {
            event.preventDefault()

            if (confirmRegPassword.value !== inputRegPassword.value) {
                errorRegHandler()

            }else {
                submitRegButton.textContent = "Creating..."

                fetch('https://reqres.in/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        email: inputRegEmail.value, 
                        password: inputRegPassword.value,
                    })
                }).then((response) => {
                    if (response.status !== 200){  
                                    
                        return errorRegHandler()
                        
                    }
                    sucessRegHandler()
                    
                }).catch(() => {
                    errorRegHandler()
                
                })
            }
         
        })
    }

}

window.onload = init







