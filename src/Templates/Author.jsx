import React, {Component} from 'react'
import './Author.css'
import './../css/pure-release-1.0.0/pure-min.css'
import $ from 'jquery'

class Author extends Component {
    
    constructor() {
        super();
        this.state = { lista: []};
    }

    componentWillMount(){
        $.ajax({
            url:"http://cdc-react.herokuapp.com/api/autores",
            dataType: 'json',
            success: function(resposta){
                this.setState({lista:resposta});
            }.bind(this)
        });
    }
    
    render() {
      
        return (
        <div id="main">
        <div className="header">
          <h1>Cadastro de Autores</h1>
        </div>
        <div className="content" id="content">
          <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned">
              <div className="pure-control-group">
                <label htmlFor="nome">Nome</label> 
                <input id="nome" type="text" name="nome" value=""  />                  
              </div>
              <div className="pure-control-group">
                <label htmlFor="email">Email</label> 
                <input id="email" type="email" name="email" value=""  />                  
              </div>
              <div className="pure-control-group">
                <label htmlFor="senha">Senha</label> 
                <input id="senha" type="password" name="senha"  />                                      
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
                  this.state.lista.map(function(autor){
                      return(
                          <tr>
                              <td>{autor.nome}</td>
                              <td>{autor.email}</td>
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
