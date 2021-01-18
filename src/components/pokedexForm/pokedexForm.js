import React from 'react';
import {Col,Row,Form, Input, Button, Select} from 'antd';

const {Option} = Select;

const mainList = [
    {
        gen:'gen-i',class:[
            {legendary:["Articuno","Zapdos","Moltres","Mewtwo"]},
            {mythical:["Mew"]}
        ]
    },
    {
        gen:'gen-ii',class:[
            {legendary:["Raikou","Entei","Suicune","Lugia","Ho-Oh"]},
            {mythical:["Celebi"]}
        ]
    },
    {
        gen:'gen-iii',class:[
            {legendary:["Regirock","Regice","Registeel","Latias","Latios","Kyogre","Groudon","Rayquaza"]},
            {mythical:["Jirachi","Deoxys-normal"]}
        ]
    },
    {
        gen:'gen-iv',class:[
            {legendary:["Uxie","Mesprit","Azelf","Dialga","Palkia","Heatran","Regigigas","Giratina-altered","Cresselia"]},
            {mythical:["Phione","Manaphy","Darkrai","Shaymin","Arceus"]}
        ]

    },
    {
        gen:'gen-v',class:[
            {legendary:["Cobalion","Terrakion","Virizion","Tornadus","Thundurus","Reshiram","Zekrom","Landorus","Kyurem"]},
            {mythical:["Victini","Keldeo","Meloetta","Genesect"]}
        ]
    },
    {
        gen:'gen-vi',class:[
            {legendary:["Xerneas","Yveltal","Zygarde"]},
            {mythical:["Diancie","Hoopa","Volcanion"]}
        ]
    },
    {
        gen:'gen-vii',class:[
            {legendary:["Type: Null","Silvally","Tapu Koko","Tapu Lele","Tapu Bulu","Tapu Fini","Cosmog","Cosmoem","Solgaleo","Lunala","Necrozma"]},
            {mythical:["Magearna","Marshadow","Zeraora","Meltan","Melmetal","Zarude"]}
        ]
    },
]
class PokedexForm extends React.Component{
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            gen:'',
            name:'',
            class:'',
        }
        this.onChangeGeneration = this.onChangeGeneration.bind(this);
        this.getPokemon = this.getPokemon.bind(this);
        this.resetFields = this.resetFields.bind(this);
    }

    onFinish = values => {
        this.props.handleSubmit(values);
    };

    onChangeGeneration = value => {
        this.setState({gen:value});
    }

    onChangeClass = value => {
        this.setState({class:value})
    }
    getPokemon(pokemonGen){
        var result = []
        mainList.map((e)=>{
            if(e.gen === pokemonGen){
                if(this.state.class==="legendary"){
                    result = e.class[0].legendary
                }else{
                    result = e.class[1].mythical;
                }
            }
        })
        return result;
    }
    resetFields(){
        this.formRef.current.resetFields();
        this.setState({
            gen:'',
            name:'',
            class:'',
        })
        this.props.resetPokedex();
    }

    render(){
         const validateMessages = {
            required: '${label} is required!',
          };
          var generationDropDown = (
            <Select showSearch placeholder="Generation Dropdown" onChange={this.onChangeGeneration}>
                {mainList.map((value)=>{
                    return (<Option value={value.gen}>{value.gen.toUpperCase()}</Option>)
                })}
            </Select>
          )
          var pokemonNameOptions = []
          switch (this.state.gen) {
              case "gen-i":
                pokemonNameOptions = this.getPokemon('gen-i');
                  break;
              case "gen-ii":
                pokemonNameOptions = this.getPokemon('gen-ii');
                  break;
              case "gen-iii":
                pokemonNameOptions = this.getPokemon('gen-iii');
                  break;
              case "gen-iv":
                pokemonNameOptions = this.getPokemon('gen-iv');
                  break;
              case "gen-v":
                pokemonNameOptions = this.getPokemon('gen-v');
                  break;
              case "gen-vi":
                pokemonNameOptions = this.getPokemon('gen-iv');
                  break;
              case "gen-vii":
                pokemonNameOptions = this.getPokemon('gen-vii');
                  break;
              default:
                  break;
          }
          var pokemonNamedropDown = (
            <Input disabled={true} placeholder="Select Other Form"/>
          )
          if(pokemonNameOptions.length > 0 && this.state.class!==''){
            pokemonNamedropDown = (
                <Select showSearch placeholder="Name Options" onChange={this.onChangeName}>
                    {pokemonNameOptions.map((value)=>{
                        return(
                            <Option value={value}>{value}</Option>
                        )
                    })}
                </Select>
              )
          }
        
        return(
            <Form ref={this.formRef} layout={"vertical"} name="pokedex-form" onFinish={this.onFinish} validateMessages={validateMessages}>
                <Row gutter={8}>
                    <Col sm={12}>
                        <Form.Item name={['pokemon', 'generation']} label="Generation" rules={[{ required: true }]} labelCol={{offset:8}}>
                            {generationDropDown}
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                    <Form.Item name={['pokemon', 'class']} label="Class" rules={[{ required: true }]} labelCol={{offset:8}}>
                        <Select showSearch placeholder="Class Dropdown" onChange={this.onChangeClass}>
                            <Option value="legendary">Legendary</Option>
                            <Option value="mythical">Mythical</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col sm={18}>
                        <Form.Item name={['pokemon', 'name']} rules={[{ required: true }]} label="Pokemon Name" labelCol={{offset:13}}>
                            {pokemonNamedropDown}
                        </Form.Item>
                    </Col>
                    <Col sm={3} style={{textAlign:"center"}}>
                        <Form.Item style={{marginTop:'30px'}}>
                            <Button type="primary" htmlType="submit">Search</Button>
                        </Form.Item>
                    </Col>
                    <Col sm={3} style={{textAlign:"center"}}>
                        <Form.Item style={{marginTop:'30px'}}>
                            <Button type="warning" onClick={this.resetFields}>Reset</Button>
                        </Form.Item>
                    </Col>
                </Row>
          </Form>
        )
    }
}

export default PokedexForm;