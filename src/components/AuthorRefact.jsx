import React, { Component } from 'react'
import $ from 'jquery'
import './../css/pure-release-1.0.0/pure-min.css'
import InputCustomized from './../components/InputCustomized'
import PubSub from 'pubsub-js'
import TratadorErros from './TratadorErros'


class AuthorForm extends Component {

    constructor() {
        super()
        this.state = { nome: '', email: '', senha: '' }
        this.enviaForm = this.enviaForm.bind(this);
    }

    


    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
            //url:"http://localhost:3001/author"
            url: "http://cdc-react.herokuapp.com/api/autores",
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
            success: function (resposta) {
                console.log("enviado com sucesso");
                PubSub.publish('atualiza-lista-autores', resposta);
                this.initialState();
            }.bind(this),
            error: function (resposta) {
                if (resposta.status === 400) {
                    new TratadorErros().publicaErros(resposta.responseJSON);
                }
            },
            beforeSend: function () {
                PubSub.publish("limpa-erros", {});
            }
        });
    }

    initialState() {
        this.setState({ nome: '', email: '', senha: '' })
    }

    salvaAlteracao(nomeInput, event){
        const campoSendoAlterado = []
        campoSendoAlterado[nomeInput] = event.target.value
        this.setState(campoSendoAlterado)
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    {
                        //id, type, name, placeholder, value, onChange, required(true or false)
                    }
                    <InputCustomized label="Nome" id="nome" type="text" name="nome" placeholder="Nome" value={this.state.nome || ''}
                        onChange={this.salvaAlteracao.bind(this,'nome')} required={true} />
                    <InputCustomized label="Email" id="email" type="email" name="email" placeholder="Email" value={this.state.email || ''}
                        onChange={this.salvaAlteracao.bind(this,'email')} required={true} />
                    <InputCustomized label="Senha" id="senha" type="password" name="senha" placeholder="Senha" value={this.state.senha || ''}
                        onChange={this.salvaAlteracao.bind(this, 'senha')} required={true} />
                    <button type="submit" className="pure-button pure-button-primary" >Gravar</button>
                </form>
            </div>
        )
    }
}

class AuthorTable extends Component {


    constructor() {
        super();
        this.state = { msgErro: '' };
    }

    render() {
        return (

            <table className="pure-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.lista.map(function (author, i) {
                            author.id = i
                            return (
                                <tr key={author.id}>
                                    <td>{author.id}</td>
                                    <td>{author.nome}</td>
                                    <td>{author.email}</td>
                                    <td>
                                        <button className="btn btn-danger ml-2" type="button"
                                            >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }

}

export default class AuthorBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] }
        this.loadData = this.loadData.bind(this)
    }

    componentDidMount() {
        this.loadData()
        console.log(this.state)

        PubSub.subscribe('atualiza-lista-autores', function (topico, novaLista) {
            this.loadData();
        }.bind(this));
    }

    loadData() {
        $.ajax({
            //url:"http://localhost:3001/author"
            url: 'http://cdc-react.herokuapp.com/api/autores',
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta });
            }.bind(this),
            error: function (e) {
                alert('Erro de conexão')
            }
        })

    }

    deleteData(author) {
        const id = author.id
        $.ajax({
            url: `http://cdc-react.herokuapp.com/api/autores/${author.id}`,
            contentType: 'application/json',
            dataType: 'json',
            type: 'DELETE',
            data: JSON.stringify({ id: `${id}` }),
            success: function (resposta) {
                console.log("enviado com sucesso");
                PubSub.publish('atualiza-lista-autores', resposta);
                this.initialState();
            }.bind(this),
        })
    }






    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de autores</h1>
                </div>
                <div className="content" id="content">
                    <AuthorForm loadData={this.loadData} />
                    <AuthorTable lista={this.state.lista} deleteData={this.deleteData} />
                </div>
            </div>
        )
    }
}