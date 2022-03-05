const init = () => {


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
        input.value.length < 8 ? disableButton(input) : enableButton(input)
    }



    // aplica didabled no button e adiciona 'erro' no item (input)
    function disableButton(item) {
        submitButton.setAttribute('disabled', 'disabled')
        item.nextElementSibling.classList.add('error')
    }
    // remove o disable do button e remove o error do item
    function enableButton (item) {
        submitButton.removeAttribute('disabled')
        item.nextElementSibling.classList.remove('error')
    }




    

    inputEmail.addEventListener('input' , validateEmail)
    inputPassword.addEventListener('input', validatePassword)




    
    const errorHandler = () => {
        submitButton.classList.remove('loading');
        submitButton.classList.remove('success');
        submitButton.classList.add('error');
        submitButton.textContent = "Error :(";
    }

    const sucessHandler = () => {
        submitButton.classList.remove('loading');
        submitButton.classList.remove('error');
        submitButton.classList.add('success');
        submitButton.textContent = "Login efetuado!";
    }

    if (submitButton) {
        submitButton.addEventListener("click", (event) => {
            event.preventDefault()

            submitButton.textContent = "Fazendo login..."

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
}

window.onload = init