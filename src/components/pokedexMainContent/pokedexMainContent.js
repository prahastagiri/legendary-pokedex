import React from 'react';
import PokedexForm from '../pokedexForm/pokedexForm.js';
import PokedexCard from '../pokedexCard/pokedexCard.js';
import {Row,Col, message} from 'antd';
import {PokemonService} from '../../services/pokemon.service.js'

class PokedexMainContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pokemonData:'',
            pokemonDesc:''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetPokedex = this.resetPokedex.bind(this);
    }
    handleSubmit = async(data)=>{
        var pokemonData = await PokemonService.getPokemonData(data);
        var pokemonDesc = await PokemonService.getPokemonDesc(pokemonData.id)
        this.setState({pokemonData:pokemonData,pokemonDesc:pokemonDesc},()=>{
            this.refs.pokecard.resetCard();
        });
    }

    resetPokedex(){
        this.refs.pokecard.resetCard();
        this.setState({
            pokemonData:'',
            pokemonDesc:''
        },()=>{
            message.info("Reset Pressed")
        })
    }
    render(){
        return(
            <div>
                <Row>
                    <Col sm={12} style={{margin:'50px auto 0px auto',padding:'30px 25px 0px 25px',background:'white',borderRadius:'10px',boxShadow: '2px 10px 23px -8px rgba(0,0,0,0.53)'}}>
                        <PokedexForm
                        handleSubmit={this.handleSubmit}
                        resetPokedex={this.resetPokedex}/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={18}  style={{margin:'50px auto 0px auto'}}>
                        <PokedexCard
                        ref="pokecard"
                        pokemonData={this.state.pokemonData}
                        pokemonDesc={this.state.pokemonDesc}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default PokedexMainContent;