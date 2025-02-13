import React, {Component} from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Button,
    Label,
    Input,
    CustomInput
} from "reactstrap";
import Select from "react-select";

import IntlMessages from "../../../../helpers/IntlMessages";
import CustomSelectInput from "../../../../components/common/CustomSelectInput";
import {NavLink} from "react-router-dom";
import * as Const from "../../../Const";
import axios from "axios";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";
import RowShowShow from "../../../RowShowShow";
import ResetPassword from "./ResetPassword/ResetPassword";



export default class AdminProfile extends Component {
    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);

        this.state = {
            selectedOptions: [],
            selectedOptionsType: [],
            LName:"",FName:"",UName:"",
            edit:false
        };
    }
    componentDidMount(){
        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };
        // console.log(headers)
        axios.get(`${Const.Amin_URL}admin/info` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            // console.log(Description);
            let DES=JSON.parse(Description);
            // console.log(DES);

            this.setState({
                LName:DES.LastName,
                FName:DES.FirstName,
                UName:DES.UserName,
            });

        }).catch(error=>{console.log(error)});
    }

    // handleChange = selectedOption => {
    //     this.setState({ selectedOption });
    // };

    handelChange(e){
        let {name,value}=e.target;
        this.setState({
            [name]:value
        })
    }
    handlSubmit(e){
        e.preventDefault();
        let{FName,LName,UName}=this.state;

        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let BODY={'UserName': UName,
            'FirstName': FName,
            'LastName': LName};
        console.log(BODY);

        // form.append('SKU', payload.SKU);
        // form.append('Name', payload.Name);
        axios.post(`${Const.Amin_URL}admin/info/update` ,BODY, {headers:headers}).then(responsive=>
        {
            // this.setState({
            //     loaderActive:false
            // });
            const {Description}=responsive.data;
            if(Description === "d"){
                NotificationManager.success(
                    "congratulation",
                    "your categories added",
                    3000,
                    null,
                    null,
                    "success"
                );
                this.setState({
                    edit:false
                })
            }else {
                NotificationManager.error(
                    " new game currency didnt add",
                    Description,
                    3000,
                    null,
                    null,
                    "success"
                );
            }

            // let DES=JSON.parse(Description);
            // this.props.inprogress(DES);x
            console.log(Description)
        }).catch(error=>{
            // this.setState({
            //     loaderActive:false
            // });
            console.log(error)});

    }
    handleChangeType = selectedOptionsType => {
        this.setState({ selectedOptionsType });
    };
    handelEdit (){
        this.setState({
            edit:true
        })
    }
    render() {
        let {FName,LName,UName,edit}=this.state;

        return (
            <Card className="dashboard-search fontFamily">
                {
                    edit?
                        <CardBody>
                            <CardTitle className="text-white">
                                <IntlMessages id="مشاهده اطلاعات" />
                            </CardTitle>
                            <Form className="form-container fontFamily" onSubmit={this.handlSubmit.bind(this)}>
                                <Label className="form-group has-float-label mb-4 fontFamily">
                                    <Input type="text" name='FName' value={FName} onChange={this.handelChange.bind(this)}/>
                                    {/*<span className='fontFamily'>"نام"</span>*/}
                                    <span className='mr-2'>'نام'</span>
                                    {/*<IntlMessages id='نام' />*/}
                                </Label>
                                <Label className="form-group has-float-label mb-4">
                                    <Input type="text"  name='LName' onChange={this.handelChange.bind(this)} value={LName}/>
                                    {/*<IntlMessages*/}
                                        {/*id="نام خوانوادگی"*/}
                                    {/*/>*/}
                                    <span className='mr-2'>'نام خوانوادگی'</span>

                                </Label>
                                <Label className="form-group has-float-label mb-4">
                                    <Input type="text"  name='UName' onChange={this.handelChange.bind(this)} value={UName}/>
                                    {/*<IntlMessages*/}
                                        {/*id="نام کاربری"*/}
                                    {/*/>*/}
                                    <span className='mr-2'>'نام کاربری'</span>

                                </Label>
                                <FormGroup className="text-center">
                                    <Button color="primary" className="mt-4 pl-5 pr-5">
                                        <IntlMessages id="ارسال" />
                                    </Button>
                                </FormGroup>
                                <div >
                                    <div className='w-100 mt-3 brw1' dir='rtl'>
                                        <ResetPassword/>
                                    </div>
                                </div>
                            </Form>


                        </CardBody>
                        :
                        <CardBody dir={'rtl'}>
                            <CardTitle className="d-flex justify-content-start ">
                                <IntlMessages id="ویرایش اطلاعات" />
                            </CardTitle>
                            <div className="form-container">
                                <div className='w-100 brw1'>
                                    <RowShowShow label={'نام'} value={FName}/>
                                </div>
                                <div className='w-100 mt-3 brw1'>
                                    <RowShowShow label={'نام خانوادگی'} value={LName}/>

                                </div>
                                <div className='w-100 mt-3 brw1'>
                                    <RowShowShow label={'نام کاربری'} value={UName}/>
                                </div>

                                <div onClick={this.handelEdit.bind(this)}  className='mt-4 d-flex justify-content-center align-items-center'>
                                    <Button color="primary" className="col-6 ">
                                        <IntlMessages id="ویرایش" />
                                    </Button>
                                </div>

                            </div>

                        </CardBody>
                }


            </Card>
        );
    }
}
