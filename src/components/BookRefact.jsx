import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import InputCustomized from './InputCustomized'
import $ from 'jquery'
import TratadorErros from './TratadorErros'

class BookForm extends Component {

    constructor() {
        super()
        this.state = { titulo: '', preco: '', autorId: '' }
        this.enviaForm = this.enviaForm.bind(this)
        this.setTitulo = this.setTitulo.bind(this)
        this.setPreco = this.setPreco.bind(this)
        this.setAutorId = this.setAutorId.bind(this)
    }

    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
            //url: "http://localhost:3001/book",
            url: "http://cdc-react.herokuapp.com/api/livros",
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId }),
            success: function (resposta) {
                console.log("enviado com sucesso");
                PubSub.publish('atualiza-lista-livros', resposta);
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
        this.setState({ titulo: '', preco: '', autorId: '' })
    }

    setSearch(name) {
        this.setState({ lista: this.state.lista.filter(u => u.titulo.toString().includes(name)) })
    }

    setTitulo(event) {
        this.setState({ titulo: event.target.value })
    }

    setPreco(event) {
        this.setState({ preco: event.target.value })
    }

    setAutorId(event) {
        this.setState({ autorId: event.target.value })
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    {
                        //id, type, name, placeholder, value, onChange, required(true or false)
                    }
                    <InputCustomized label="Titulo" id="titulo" type="text" name="titulo" placeholder="titulo" value={this.state.titulo || ''}
                        onChange={e => this.setTitulo(e)} required={true} />
                    <InputCustomized label="preco" id="preco" type="number" name="preco" placeholder="preco" value={this.state.preco || ''}
                        onChange={e => this.setPreco(e)} step={".01"} required={true} />
                    <div className="pure-control-group">
                        <label htmlFor="autorId">Autor</label>
                        <select name="autorId" id="autorId" onChange={this.setAutorId}>
                            <option value="">Selecione autor</option>
                            {
                                this.props.autores.map(function (autor) {
                                    return <option value={autor.id} key={autor.id}>{autor.nome}</option>
                                })
                            }
                        </select>
                    </div>
                    <button type="submit" className="pure-button pure-button-primary" >Gravar</button>
                </form>
            </div>
        )
    }

}


class BookTable extends Component {


    constructor() {
        super();
        this.state = { msgErro: '' };
        this.returnAutorNome = this.returnAutorNome.bind(this)
    }

    returnAutorNome(book, autor){
        if(book.autorId === autor.id){
            return autor.nome
        }
    }

    render() {
        return (

            <table className="pure-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titulo</th>
                        <th>Preco</th>
                        <th>Autor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.lista.map(function (book, i,autores) {
                            book.id = i
                            return (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.titulo}</td>
                                    <td>{book.preco}</td>
                                    <td>{book.autor.nome}</td>
                                    <td>
                                        <button className="btn btn-danger ml-2" type="button">
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

export default class BookBox extends Component {
    constructor() {
        super();
        this.state = { lista: [], autores: [] }
        this.loadData = this.loadData.bind(this)
    }

    componentDidMount() {
        this.loadData();
        $.ajax({
            //url: "http://localhost:3001/author",
            url: 'http://cdc-react.herokuapp.com/api/autores',
            dataType: 'json',
            success: function (resposta) {
                this.setState({ autores: resposta });
            }.bind(this),
            error: function (e) {
                alert('Erro de conexão')
            }
        })
        console.log(this.state)

        PubSub.subscribe('atualiza-lista-livros', function (topico, novaLista) {
            this.loadData();
        }.bind(this));
    }

    loadData() {
        $.ajax({
            //url: "http://localhost:3001/book",
            url: 'http://cdc-react.herokuapp.com/api/livros',
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
                    <BookForm loadData={this.loadData} autores={this.state.autores} />
                    <BookTable loadData={this.loadData} lista={this.state.lista} autores={this.state.autores} />
                </div>
            </div>
        )
    }
}
