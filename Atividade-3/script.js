document.getElementById('consultarBtn').addEventListener('click', () => {
    const cep = document.getElementById('cep').value.trim();

    // Validar o CEP antes de realizar a consulta
    if (!/^\d{8}$/.test(cep)) {
        mostrarResultado("CEP inválido! Por favor, insira um CEP com 8 dígitos.");
        return;
    }

    // Realizar a consulta à API ViaCEP
    consultarCEP(cep);
});

const consultarCEP = async (cep) => {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error("Erro na consulta");
        const dados = await response.json();

        if (dados.erro) {
            mostrarResultado("CEP não encontrado.");
        } else {
            mostrarResultado(`
                <strong>Logradouro:</strong> ${dados.logradouro || "N/A"}<br>
                <strong>Bairro:</strong> ${dados.bairro || "N/A"}<br>
                <strong>Cidade:</strong> ${dados.localidade || "N/A"}<br>
                <strong>Estado:</strong> ${dados.uf || "N/A"}
            `);
        }
    } catch (error) {
        mostrarResultado("Ocorreu um erro ao consultar o CEP. Tente novamente mais tarde.");
        console.error(error);
    }
};

const mostrarResultado = (mensagem) => {
    document.getElementById('resultado').innerHTML = mensagem;
};
