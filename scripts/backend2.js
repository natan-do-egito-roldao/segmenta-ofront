document.addEventListener("DOMContentLoaded", () => {

    const steps = document.querySelectorAll('.step');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const comecarbtn = document.querySelector('.mybtn')
    const container = document.querySelector('.colloum');
    const form = document.getElementById("form-id");

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

            const formData = new FormData(form);

            const dados = {
            nome: formData.get("name"),
            email: formData.get("email"),
            empresa: formData.get("bussines"),
            whatsapp: formData.get("number"),
            nicho: formData.get("nincho"),

            anuncia: formData.getAll("anuncia"),
            investimento: formData.getAll("valor"),
            objetivo: formData.getAll("interesse"),
            estrutura: formData.getAll("estrutura")
        };

        console.log(dados);
            try{
                await fetch("https://script.google.com/macros/s/AKfycbzR24ob7xtDMKs7owuWyWEaO4ythm2FXZ274AOvqHY-mY02udlTjRB8RqM_iWeBBNmi/exec", {
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