import React, {Component} from 'react'
import './Author.css'
import './../css/pure-release-1.0.0/pure-min.css'
import $ from 'jquery'

class Author extends Component {
    
    constructor() {
        super();
        this.state = { lista: []};
        this.enviaForm = this.enviaForm.bind(this)
        this.state.pesquisa = ''
    }

    componentWillMount(){
            this.loadData()
    
          }

          loadData(){
            $.ajax({
              url:"http://cdc-react.herokuapp.com/api/autores",
              dataType: 'json',
              success: function(resposta){
                  this.setState({lista:resposta});
              }.bind(this),
              error: function(e) {
                alert('Erro de conexão')}
            })
          }
          
          enviaForm(evento){
            evento.preventDefault();    
            $.ajax({
              url:'http://cdc-react.herokuapp.com/api/autores',
              contentType:'application/json',
              dataType:'json',
              type:'post',
              data: JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
              success: function(resposta){
                console.log("enviado com sucesso");
               }.bind(this),
              error: function(resposta){
                console.log("erro");
              }      
            });
          }
          
          setSearch(name){
            this.setState({lista: this.state.lista.filter(u => u.nome.toString().includes(name))})
          }

          setName(event){
              this.setState({nome:event.target.value})
          }

          setEmail(event){
            this.setState({email:event.target.value})
          }

          setPassword(event){
            this.setState({senha:event.target.value})
          }
    
    render() {
      
        return (
        <div id="main">
        <div className="header">
          <h1>Cadastro de authores</h1>
        </div>
        <div className="content" id="content">
          <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
              <div className="pure-control-group">
                <label htmlFor="nome">Nome</label> 
                <input id="nome" type="text" name="nome" placeholder = "Nome" value={this.state.nome} onChange={e=>this.setName(e)}/>                  
              </div>
              <div className="pure-control-group">
                <label htmlFor="email">Email</label> 
                <input id="email" type="email" name="email" placeholder = "Email" value={this.state.email} onChange={e=>this.setEmail(e)}/>                  
              </div>
              <div className="pure-control-group">
                <label htmlFor="senha">Senha</label> 
                <input id="senha" type="password" name="senha" placeholder = "senha" value={this.state.password} onChange={e=>this.setPassword(e)} />                                      
              </div>
              <div className="pure-control-group">                                  
                <label></label> 
                <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
              </div>
            </form>             

          </div>  
          <div>            
            <table className="pure-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>email</th>
                </tr>
              </thead>
              <tbody>               
                  {
                  this.state.lista.map(function(author,i){
                      author.id = i
                      return(
                          <tr key={author.id}>
                              <td>{author.nome}</td>
                              <td>{author.email}</td>
                          </tr>
                      )
                  })
                  }
              </tbody>
            </table> 
          </div>             
        </div>
      </div>           
      );
    }
  }
  
  export default Author;
