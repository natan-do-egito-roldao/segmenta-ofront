document.addEventListener("DOMContentLoaded", () => {

    const steps = document.querySelectorAll('.step');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const comecarbtn = document.querySelector('.mybtn')
    const container = document.querySelector('.colloum');
    const form = document.getElementById("form-id");
    const loader = document.querySelector(".loader");
    const loaderbtn = document.querySelector(".btn-next2");
    let clientId = localStorage.getItem("clientId");

    if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem("clientId", clientId);
    }

    let current = 0;

    function updateButtons() {

        if (prevBtn) prevBtn.style.display = current === 0 ? 'inline-block' : 'inline-block';

        if (nextBtn) {
            if (current === steps.length - 1) {
                nextBtn.textContent = "Enviar";
                nextBtn.type = "submit";
            } else {
                nextBtn.textContent = "Próximo";
                nextBtn.type = "button";
            }
        }
    }

    function showStep(index){
        steps.forEach(step => step.classList.remove('active'));
        steps[index].classList.add('active');
        current = index;
        updateButtons();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {

            const inputs = steps[current].querySelectorAll("input");
            let valido = false;

            inputs.forEach(input => {

            if (input.type === "checkbox") {
                if (input.checked) {
                valido = true;
                }
            } else {
                if (input.value.trim() !== "") {
                valido = true;
                }
            }

            });

            if (!validarStepAtual()) {
                alert("Preencha ou selecione pelo menos uma opção");
                return;
            }

            if (current < steps.length - 1) {
            e.preventDefault();
            showStep(current + 1);
            atualizarRequired(current);
            }

        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (current > 0) {
                showStep(current - 1);
            } else {
                container.classList.add('active'); // ativa animação
                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 600); // tempo da animação (mesmo do CSS)
            }
        });
    }

    if (comecarbtn ) {
        comecarbtn.addEventListener('click', () => {
            container.classList.add('active'); // ativa animação

            setTimeout(() => {
                window.location.href = "./pages/DataClients.html";
            }, 600); // tempo da animação (mesmo do CSS)
        }); 
    }

    // initialize wizard if steps exist on this page
    if (steps.length) {
        updateButtons();
    }

    function atualizarRequired(stepAtual) {
        steps.forEach((step, index) => {
            const inputs = step.querySelectorAll("input");

            inputs.forEach(input => {
                if (index === stepAtual) {
                    input.required = true;
                } else {
                    input.required = false;
                }
            });
        });
    }

    function validarStepAtual() {
        const inputs = steps[current].querySelectorAll("input");
        let valido = false;

        inputs.forEach(input => {
            if (input.type === "checkbox") {
                if (input.checked) valido = true;
            } else {
                if (input.value.trim() !== "") valido = true;
            }
        });

        return valido;
    }

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (loader){
                loader.style.display = "block";
                loader.classList.add("loading");
                nextBtn.classList.add('none');
                loaderbtn.classList.add('loading');
            }


            const formData = new FormData(form);

            const dados = {
            clientId: clientId,
            cep: formData.get("cep"),
            birthDate: formData.get("birthDate"),
            gender: formData.get("gender")

        };
        await new Promise(resolve => setTimeout(resolve, 50));
        try{
            await fetch("https://script.google.com/macros/s/AKfycbwMKxRwiReuE-IJfTgkkT00KLE_na5ZhqgPidOVGVUy0qGyNhrVgMTow1i7MgDZ93M/exec", {
                method: "POST",
                body: JSON.stringify(dados),
                mode: "no-cors"
            });
            form.reset();
            container.classList.add('active'); // ativa animação
            setTimeout(() => {
                window.location.href = "../pages/finalizacao.html";
            }, 600); // tempo da animação (mesmo do CSS)
        } catch (err) {
            alert('error')
            console.log(err)
        }
        })
    }

});