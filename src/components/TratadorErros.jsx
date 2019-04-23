import PubSub from 'pubsub-js'

export default class TratadorErro {
    publicaErros(erros) {
        erros.errors.map(function(erro){
             PubSub.publish("erro-validacao",erro)
             return console.log(erro)})
    }
}