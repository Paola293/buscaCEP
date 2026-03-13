async function buscarCEP() {
    const uf = document.getElementById('uf').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const display = document.getElementById('resultado');

    if (uf.length !== 2 || cidade.length < 3 || rua.length < 3) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }

    display.innerHTML = "Buscando nas estrelas... 🌠";

    try {
        const response = await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`);
        const dados = await response.json();

        if (dados.length === 0) {
            display.innerHTML = "Nenhum CEP encontrado para este endereço.";
            return;
        }

        display.innerHTML = ""; // Limpa o carregando
        
        dados.forEach(item => {
            display.innerHTML += `
                <div class="item-cep">
                    <strong>CEP: ${item.cep}</strong><br>
                    ${item.logradouro} - ${item.bairro}<br>
                    ${item.localidade}/${item.uf}
                </div>
            `;
        });
    } catch (erro) {
        display.innerHTML = "Erro ao conectar com o servidor.";
    }
}