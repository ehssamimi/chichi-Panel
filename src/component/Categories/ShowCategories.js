import React, {Component} from 'react';
import {Row} from "reactstrap";
// import RowShowMessage from "../Message/sub/ShowMessage/RowShowMessage";
import breakfast from "../new/cookie-dough-milkshake.jpg";
import loader from "../new/loader.gif";
import RowShowComments from "../Comments/sub/RowShowComments";
import RowShowCategories from "./sub/RowShowCategories";
import * as Const from "../Const";
import axios from "axios";
import LoaderComponent from "../LoaderComponent";

class ShowCategories extends Component {
    constructor(props) {
        super(props);
        this.state={
            modes:null


        }
    }
    componentDidMount(){
        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };
        axios.get(`${Const.Amin_URL}categories` , {headers:headers}).then(responsive=>
        {
            const {Description,State}=responsive.data;
            if (State){
                // console.log(Description);
                let DES=JSON.parse(Description);
                // console.log(DES);
                this.setState({
                    modes:DES
                });
            }

            // console.log(this.state.modes);

        }).catch(error=>{console.log(error)});
    }

    render() {
        let {modes}=this.state;
        return (
            <div className="w-100 ">
                <Row>
                    {modes!==null?modes.map((todo ,index)=><div className="col-sm-12 col-md-4 mt-3" key={index}><RowShowCategories key={index} input={todo} index={index} img={breakfast}/></div> ):
                        <div className='w-100 h60 d-flex align-items-center'><LoaderComponent/></div>
                    }
                </Row>
            </div>

        );
    }

}

export default ShowCategories