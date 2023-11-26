//sintaxe moderna não funciona no vercell
import express from 'express';
import path from 'path';

//exemplo de importação de biblioteca usando type:'commonjs'
//sintaxe antiga 
//express = require('express')

const porta = 3000;
const host = '0.0.0.0';

const app = express();

//ativar a extensão que manipula requisições HTTP
//OPÇÃO FALSE ativa a extensão querystring
//a opção true ativa a extensão qs(manipula objetos)( lista, animados)
app.use(express.urlencoded({extended: true}));

//indicando para a aplicação como servir arquivos estáticos localizados na pasta 'paginas'
//app.use(express.static('./paginas'));
app.use(express.static(path.join(process.cwd(),'paginas')));

app.get('/', (requisicao, resposta) => {
    resposta.end(`<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ação Natal 2023 - Página Inicial</title>
        <style>
        body{/* estiliza o que estiver na pagina*/
            font-family: Arial, Helvetica, sans-serif;
            text-align: center;
        }
    </style>
    </head>
    <body>
        <h1 >CAMPANHA PAPAI NOEL 2023</h1>
        <hr>
        <p>Que tal enviar a cartinha para o Papai Noel por aqui?</p>
        <p>Basta clicar no link "Cadastrar Carta", preencher corretamente o formulário e enviar a cartinha.</p>
        <ul>
            <p><a href="/formulario.html">Cadastrar Carta</a></p>
        </ul>
`);
})

//rota para processar cadastros de cartas 
app.post('/lista', processaCartasUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});

var listaCartasUsuario = [];

function processaCartasUsuario(requisicao, resposta){
    //extrair os dados do corpo da requisição, além de validar os dados
    const dados = requisicao.body;
    let conteudoResposta= '';
    //é necessário álidar os dados enviados
    //a validação dos dados é de responsabilidade da aplicação servidora
    if(!(dados.nome && dados.sobrenome && dados.cpf &&  dados.endereco && dados.numero && dados.complemento && dados.bairro && dados.uf && dados.cidade && dados.cep && dados.idade
        && dados.anoMeses && dados.sexo && dados.presentes1 && dados.descricao1 && dados.presentes2 && dados.descricao2 && dados.presentes3 && dados.descricao3)){
           //estão faltando dados do usuário
           //resposta.status(400).send('Faltam dados do usuário');
           conteudoResposta=`
           <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <!-- Meta tags Obrigatórias -->
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

                <!-- Bootstrap CSS -->
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
                <script src="index.js" type="text/javascript"></script>
                <title>Ação Natal 2023 - Formulário</title>
                <style>
                    body{/* estiliza o que estiver na pagina*/
                        font-family: Arial, Helvetica, sans-serif; 
                    }
                    legend{
                        text-align: center;
                    }
                    
                </style>
            </head>
            <body>
                <div class="container">
                    <fieldset class="border p-2">
                        <legend class="mb-3"><h1>Formulário - Cadastre sua Carta</h1></legend>
                        
                        <form action='/lista' method='POST' class="row g-3 needs-validation" novalidate>
                            <h5>Dados da Criança</h5>
                            <div class="col-md-4">
                            <label for="nome" class="form-label">Nome:</label>
                            <input type="text" class="form-control" id="nome" name="nome" required><!--name pq é o nome ou identificação do valor-->
                            </div>
           `;
           if(!dados.nome){//só vai existir essa msg quando o nome não for informado
                conteudoResposta+=`
                            <div>
                                <p class="text-danger">Por favor, informe o nome!</p>
                            </div>`;
           }
           conteudoResposta+=`
                            <div class="col-md-5">
                                <label for="sobrenome" class="form-label">Sobrenome:</label>
                                <input type="text" class="form-control" id="sobrenome" name="sobrenome" required><!--name pq é o nome ou identificação do valor-->
                            </div>`;
            if(!dados.sobrenome){
                conteudoResposta+=`
                            <div>
                                <p class="text-danger">Por favor, informe o sobrenome!</p>
                            </div>`;
            }
            conteudoResposta+=`
                        <div class="col-md-3">
                            <label for="cpf" class="form-label">CPF:</label>
                            <div class="input-group has-validation">
                                <input type="text" class="form-control" id="cpf" aria-describedby="inputGroupPrepend" name="cpf" required placeholder="999.999.999-99" 
                                    onkeyup="mCpf(this)" maxlength="14"
                                    onblur="validarCPF(this)"/> 
                            </div>
                        </div> `;
            if(!dados.cpf){
                conteudoResposta+=`
                            <div>
                                <p class="text-danger">Por favor, informe o CPF!</p>
                            </div>`;
            }
            conteudoResposta+=`
                        <div class="col-md-6">
                            <label for="endereco" class="form-label">Endereço:</label>
                            <div class="input-group has-validation">
                                <input type="text" class="form-control" id="endereco" aria-describedby="inputGroupPrepend" name="endereco" required>
                            </div>
                        </div>`;
            if(!dados.endereco){
                conteudoResposta+=`
                            <div>
                                <p class="text-danger">Por favor, informe o endereço!</p>
                            </div>`;
            }
            conteudoResposta+=`
                        <div class="col-md-1">
                            <label for="numero" class="form-label">N°:</label>
                            <input type="text" class="form-control" id="numero" name="numero" required>    
                        </div>`;
            if(!dados.numero){
                conteudoResposta+=`
                            <div>
                                <p class="text-danger">Por favor, informe o número!</p>
                            </div>`;
            }
            conteudoResposta+=`
                        <div class="col-md-5">
                            <label for="validationCustomUsername" class="form-label">Complemento:</label>
                            <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" name="complemento">
                        </div>
                        <div class="col-md-4">
                            <label for="bairro" class="form-label">Bairro:</label>
                            <div class="input-group has-validation">
                                <input type="text" class="form-control" id="bairro" aria-describedby="inputGroupPrepend" name="bairro" required>
                            </div>
                        </div>
                        <div class="col-md-3">
                        <label for="uf" class="form-label">Estado</label>
                            <select class="form-select" id="uf"  name="uf" required>
                                <option selected disabled value="">Escolha um estado...</option>
                                <option value="AC">Acre (AC)</option>
                                <option value="AL">Alagoas (AL)</option>
                                <option value="AP">Amapá (AP)</option>
                                <option value="AM">Amazonas (AM)</option>
                                <option value="BA">Bahia (BA)</option>
                                <option value="CE">Ceará (CE)</option>
                                <option value="DF">Distrito Federal (DF)</option>
                                <option value="ES">Espírito Santo (ES)</option>
                                <option value="GO">Goiás (GO)</option>
                                <option value="MA">Maranhão (MA)</option>
                                <option value="MT">Mato Grosso (MT)</option>
                                <option value="MS">Mato Grosso do Sul (MS)</option>
                                <option value="MG">Minas Gerais (MG)</option>
                                <option value="PA">Pará (PA)</option>
                                <option value="PB">Paraíba (PB)</option>
                                <option value="PR">Paraná (PR)</option>
                                <option value="PE">Pernambuco (PE)</option>
                                <option value="PI">Piauí (PI)</option>
                                <option value="RJ">Rio de Janeiro (RJ)</option>
                                <option value="RN">Rio Grande do Norte (RN)</option>
                                <option value="RS">Rio Grande do Sul (RS)</option>
                                <option value="RO">Rondônia (RO)</option>
                                <option value="RR">Roraima (RR)</option>
                                <option value="SC">Santa Catarina (SC)</option>
                                <option value="SP">São Paulo (SP)</option>
                                <option value="SE">Sergipe (SE)</option>
                                <option value="TO">Tocantins (TO)</option>
                            </select>
                        </div>`;
            if(!dados.uf){
                conteudoResposta+=`
                            <div>
                                <p class="text-danger">Por favor, informe o Estado!</p>
                            </div>`;
            }
            conteudoResposta+=`
                        <div class="col-md-3">
                            <label for="cidade" class="form-label">Cidade:</label>
                            <div class="input-group has-validation">
                                <input type="text" class="form-control" id="cidade" aria-describedby="inputGroupPrepend" name="cidade"  required>
                            </div>
                        </div>`;
            if(!dados.cidade){
                conteudoResposta+=`
                            <div>
                                <p class="text-danger">Por favor, informe a Cidade!</p>
                            </div>`;
            }
            conteudoResposta+=`
                        <div class="col-md-2">
                            <label for="cep" class="form-label">CEP:</label>
                            <input type="text" class="form-control" id="cep" name="cep" required onkeypress="mCEP(this)" maxlength="10">
                        </div>`;
            if(!dados.cep){
                conteudoResposta+=`
                            <div>
                                <p class="text-danger">Por favor, informe o CEP!</p>
                            </div>`;
            }
            conteudoResposta+=`
                        <div class="col-12">
                            <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="invalidCheck" >
                            <label class="form-check-label" for="invalidCheck">
                                Declaro que a criança acima é PcD (Pessoa com Deficiência).
                            </label>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <label for="idade" class="form-label">Idade</label>
                            <input type="number" min="1" class="form-control" id="idade" name="idade" required> 
                        </div>`;
            if(!dados.idade){
                conteudoResposta+=`
                            <div>
                                <p class="text-danger">Por favor, informe a idade!</p>
                            </div>`;
            }
            conteudoResposta+=`
                        <div class="col-md-3">
                            <label for="anoMeses" class="form-label">Anos/Meses:</label>
                            <select class="form-select" id="anoMeses" name="anoMeses" required>
                                <option selected disabled value="">Selecione</option>
                                <option>Anos</option>
                                <option>Meses</option>
                            </select>
                        </div>`;
            if(!dados.anoMeses){
                conteudoResposta+=`
                            <div>
                                <p class="text-danger">Por favor, ano ou meses)!</p>
                            </div>`;
            }
            conteudoResposta+=`
                        <div class="col-md-3">
                            <label for="sexo" class="form-label">Sexo:</label>
                            <select class="form-select" id="sexo" name="sexo" required>
                                <option selected disabled value="">Selecione</option>
                                <option>Feminino</option>
                                <option>Masculino</option>
                            </select>
                        </div>`;
            if(!dados.sexo){
                conteudoResposta+=`
                            <div>
                                <p class="text-danger">Por favor, informe o sexo!</p>
                            </div>`;
            } 
            conteudoResposta+=`
                        <br><br><br><br><br>
                        <h5>Dados dos presentes</h5>
                        <p>Escolha 3 presentes dos quais deseja ganhar</p>
                        <div class="col-md-4">
                            <label for="presentes1" class="form-label"></label>
                            <select class="form-select" id="presentes1" name="presentes1" required>
                                <option selected value="">Pedido</option>
                                <option value="outro">Outro</option>
                                <option value="boneca">Boneca</option>
                                <option value="barbie">Barbie</option>
                                <option value="jogo-de-panelinha">Jogo de panelinha</option>
                                <option value="carrinho">Carrinho de brinquedo</option>
                                <option value="carrinho-de-corrida">Carrinho de corrida</option>
                                <option value="carrinho-de-polícia">Carrinho de polícia</option>
                                <option value="carrinho-de-bombeiro">Carrinho de bombeiro</option>
                                <option value="carrinho-monstro">Carrinho monstro</option>
                                <option value="roupa">Roupa</option>
                                <option value="sapato">Sapato</option>
                                <option value="chinelo">Chinelo</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="descricao1" class="form-label"></label>
                            <div class="input-group has-validation">
                            <input type="text" class="form-control" id="descricao1" aria-describedby="inputGroupPrepend" placeholder="DESCRIÇÃO DO PEDIDO" name="descricao1" required>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label for="presentes2" class="form-label"></label>
                            <select class="form-select" id="presentes2" name="presentes2" required>
                            <option selected value="">Pedido</option>
                            <option value="outro">Outro</option>
                            <option value="boneca">Boneca</option>
                            <option value="barbie">Barbie</option>
                            <option value="jogo-de-panelinha">Jogo de panelinha</option>
                            <option value="carrinho">Carrinho de brinquedo</option>
                            <option value="carrinho-de-corrida">Carrinho de corrida</option>
                            <option value="carrinho-de-polícia">Carrinho de polícia</option>
                            <option value="carrinho-de-bombeiro">Carrinho de bombeiro</option>
                            <option value="carrinho-monstro">Carrinho monstro</option>
                            <option value="roupa">Roupa</option>
                            <option value="sapato">Sapato</option>
                            <option value="chinelo">Chinelo</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="descricao2" class="form-label"></label>
                            <div class="input-group has-validation">
                            <input type="text" class="form-control" id="descricao2" aria-describedby="inputGroupPrepend" placeholder="DESCRIÇÃO DO PEDIDO" name="descricao2" required>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label for="presentes3" class="form-label"></label>
                            <select class="form-select" id="presentes3" name="presentes3" required>
                            <option selected value="">Pedido</option>
                            <option value="boneca">Outro</option>
                            <option value="boneca">Boneca</option>
                            <option value="barbie">Barbie</option>
                            <option value="jogo-de-panelinha">Jogo de panelinha</option>
                            <option value="carrinho">Carrinho de brinquedo</option>
                            <option value="carrinho-de-corrida">Carrinho de corrida</option>
                            <option value="carrinho-de-polícia">Carrinho de polícia</option>
                            <option value="carrinho-de-bombeiro">Carrinho de bombeiro</option>
                            <option value="carrinho-monstro">Carrinho monstro</option>
                            <option value="roupa">Roupa</option>
                            <option value="sapato">Sapato</option>
                            <option value="chinelo">Chinelo</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="descricao3" class="form-label"></label>
                            <div class="input-group has-validation">
                            <input type="text" class="form-control" id="descricao3" aria-describedby="inputGroupPrepend" placeholder="DESCRIÇÃO DO PEDIDO" name="descricao3" required>
                            </div>
                        </div>
                        <div class="col-12 mt-2">
                            <button class="btn btn-primary" type="submit">Cadastrar Carta</button>
                            </div>
                        </form>
                    </fieldset> 
                </div>
                <!-- JavaScript (Opcional) -->
                <!-- jQuery primeiro, depois Popper.js, depois Bootstrap JS -->
                
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
                <script>
                    //Esta função trata somente da formatação cpf e cep
                    function mCpf() {
                        var cpf = event.target.value;
                        cpf = cpf.replace(/\D/g, "")
                        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
                        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
                        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
                        event.target.value = cpf;
                    }
                    function mCEP () {
                        var cep = event.target.value;
                        cep = cep.replace(/\D/g, "")
                        cep = cep.replace(/^(\d{2})(\d)/, "$1.$2")
                        cep = cep.replace(/.(\d{3})(\d)/, ".$1-$2")
                        event.target.value = cep;
                    }
            //valida cpf      
            function validarCPF() {
            var cpf = event.target.value;
            var ok = 1;
            var add;
            if (cpf != "") {
                cpf = cpf.replace(/[^\d]+/g, '');
                if (cpf.length != 11 ||
                    cpf == "00000000000" ||
                    cpf == "11111111111" ||
                    cpf == "22222222222" ||
                    cpf == "33333333333" ||
                    cpf == "44444444444" ||
                    cpf == "55555555555" ||
                    cpf == "66666666666" ||
                    cpf == "77777777777" ||
                    cpf == "88888888888" ||
                    cpf == "99999999999")
                        ok = 0;
                if (ok == 1) {
                    add = 0;
                    for (i = 0; i < 9; i++)
                        add += parseInt(cpf.charAt(i)) * (10 - i);
                        rev = 11 - (add % 11);
                        if (rev == 10 || rev == 11)
                        rev = 0;
                        if (rev != parseInt(cpf.charAt(9)))
                        ok = 0;
                        if (ok == 1) {
                        add = 0;
                        for (i = 0; i < 10; i++)
                            add += parseInt(cpf.charAt(i)) * (11 - i);
                        rev = 11 - (add % 11);
                        if (rev == 10 || rev == 11)
                            rev = 0;
                        if (rev != parseInt(cpf.charAt(10)))
                            ok = 0;
                        }
                    }
                    if (ok == 0) {
                    alert("Ops... Ocorreu um problema... CPF inválido!");
                    //event.target.focus();
                    }
                }
            }
                </script>
                </body>
            </html>`;          
    }
    else{
        const usuario = {
                        nome: dados.nome,
                        sobrenome: dados.sobrenome,
                        cpf: dados.cpf,
                        endereco: dados.endereco,
                        numero: dados.numero,
                        complemento: dados.complemento,
                        bairro: dados.bairro,
                        uf: dados.uf,
                        cidade: dados.cidade,
                        cep: dados.cep,
                        idade: dados.idade,
                        anoMeses: dados.anoMeses,
                        sexo: dados.sexo,
                        pedido1: dados.presentes1,
                        descricao1:dados.descricao1,
                        pedido2: dados.presentes2,
                        descricao2: dados.descricao2,
                        pedido3: dados.presentes3,
                        descricao3: dados.descricao3
                        }
        //adiciona um novo usuário na lista de usuários já cadastrados
        listaCartasUsuario.push(usuario);
        
        //retorna a lista de cartas dos usuários/crianças
        conteudoResposta = `<!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ação Natal 2023 - Lista de Cartas</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        </head>
        <body>
            <h1>Lista de cartas cadastradas</h1>
            <table class="table table-info table-hover">
            <thead>    
                <tr>
                    <th scope="col">Nome Completo</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Idade</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">Endereço</th>
                    <th scope="col">Cidade</th>
                    <th scope="col">CEP</th>
                    <th scope="col">Pedido 1</th>
                    <th scope="col">Pedido 2</th>
                    <th scope="col">Pedido 3</th>
                </tr>
            </thead>
            <tbody`;

        for (const usuario of listaCartasUsuario){
            conteudoResposta += `
                <tr>
                    <td>${usuario.nome} ${usuario.sobrenome}</td>
                    <td>${usuario.cpf}</td>
                    <td>${usuario.idade} ${usuario.anoMeses}</td> 
                    <td>${usuario.sexo}</td>
                    <td>${usuario.endereco}, ${usuario.numero}, ${usuario.complemento}, ${usuario.bairro}</td>
                    <td>${usuario.cidade}-${usuario.uf}</td>
                    <td>${usuario.cep}</td>
                    <td>${usuario.pedido1}-${usuario.descricao1}</td>
                    <td>${usuario.pedido2}-${usuario.descricao2}</td>
                    <td>${usuario.pedido3}-${usuario.descricao3}</td>
                </tr>
            `;
        }

            conteudoResposta+= `
                </tbody>
                </table>
            
                <a button type="button" class="btn btn-outline-warning" href="/">Página Inicial</button>
                <a class="btn btn-primary" href="/formulario.html" role="button">Continuar cadastrando</a>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
            
            </html>`;
    }//fim do if/else validação
    resposta.end(conteudoResposta);
}