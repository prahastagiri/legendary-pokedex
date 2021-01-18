import React from 'react';
import {Row,Collapse,Col,Progress} from 'antd';
import pokeball from '../../pokeball-icon-15.png';


const {Panel} = Collapse;
class PokedexMainContent extends React.Component{
    colorData = {
        'fire':'#F08030',
        'grass':'#78C850',
        'water':'#6890F0',
        'electric':'#F8D030',
        'ice':'#98D8D8',
        'flying':'#A890F0',
        'psychic':"#F85888",
        'dragon':'#7038F8',
        'normal':'#A8A878',
        'steel':'#B8B8D0',
        'ghost':'#705898',
        'dark':'#705848'
    }
    constructor(props){
        super(props);

        this.state={
            activePanel:[]
        }

        this.expandPanel = this.expandPanel.bind(this);
        this.resetCard = this.resetCard.bind(this);
    }
    resetCard(){
        this.setState({
            activePanel:[]
        })
    }
    expandPanel(key){
        this.setState({activePanel:key})
    }

    render(){
        var cardContent = (
            this.props.pokemonData==='' || this.props.pokemonData===undefined ? 
            <Row>
                <div className="pokeball">
                    <img src={pokeball} alt="error"/>
                </div>
            </Row> 
            : 
            <Row>
                <Col span={24}>
                    <Collapse onChange={this.expandPanel}>
                        <Panel header={<div style={{textTransform:'capitalize',textAlign:'center'}}>{this.props.pokemonData.name}</div>} key="1" extra={<img alt="header pokemon" style={{position: 'absolute',margin:'-82px 0px 0px -65px',display:this.state.activePanel.length > 0 && this.state.activePanel[0]==="1" ? "none" : "block"}} src={this.props.pokemonData.sprites.front_default}/>}>
                            <Row>
                                <Col span={12}>
                                    <div className="pokedex-panel-image-container">
                                        <img alt="panel" className="pokedex-panel-image" src={this.props.pokemonData.sprites.front_default}/>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span={24}>
                                            <div className="pokedex-stats-panel">
                                                <div className="pokedex-id">
                                                    #{this.props.pokemonData.id}
                                                </div>
                                                <div className="pokedex-panel-type">
                                                    <Row>
                                                        {this.props.pokemonData.types.map((e)=>{
                                                            var bg = 'white';
                                                            for(var key in this.colorData){
                                                                if(e.type.name===key){
                                                                    bg = this.colorData[key];
                                                                }
                                                            }
                                                            return (
                                                                <Col span={24/this.props.pokemonData.types.length}>
                                                                    <div style={{background:`${bg}`}}>{e.type.name}</div>
                                                                </Col>
                                                            )
                                                        })}
                                                    </Row>
                                                </div>
                                                <div className="pokedex-panel-stats">
                                                    {this.props.pokemonData.stats.map((e)=>{
                                                        return(
                                                            <Row>
                                                                <Col style={{textTransform:'capitalize'}} span={12}>
                                                                    {e.stat.name}
                                                                </Col>
                                                                <Col span={12}>
                                                                    <Progress percent={Math.ceil((e.base_stat/200)*100)} format={percent => `${percent}`} />
                                                                </Col>
                                                            </Row>
                                                        )
                                                    })}
                                                </div>
                                            </div>  
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div className="pokedex-panel-desc">
                                        {this.props.pokemonData.name==='arceus' ? <div style={{textAlign:'center',fontStyle:'italic'}}>Dude's basically a God <div>No Cap FR FR</div> <div>Can we get a Dorime in the call? Thank you</div></div>: this.props.pokemonDesc}
                                    </div>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        )
        return(
            <div>
                {cardContent}
        <style jsx>{`
            .pokeball{
                margin:auto
            }
            .pokedex-stats-panel{
                font-size:18px;
                line-height:1.5;
            }
            .pokedex-panel-type{
                text-transform:capitalize;
                text-align:center;
            }
            .pokedex-panel-desc{
                font-size:18px;
                width:100%;
            }
            .pokedex-panel-image{
                height:250px;
            }
            .pokedex-panel-image-container{
                text-align:center;
            }
            .pokedex-panel-name{
                text-transform:capitalize;
                text-align:center;
                font-size:24px;
            }
        `}</style>
            </div>
        )
    }
}

export default PokedexMainContent;