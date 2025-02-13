import React, {Component} from 'react';
import IntlMessages from "../../../../helpers/IntlMessages";
import {  Card, CardBody , Button, Modal, ModalHeader, ModalBody, ModalFooter,} from "reactstrap";
import {TweenMax} from "gsap/TweenMax";
import RowShowShow from "../../../RowShowShow";
import CarouselEdite from "../../CaruselEdite/CarouselEdite";
// import ReactSiemaCarousel from "../../../../components/ReactSiema/ReactSiemaCarousel";
import {Colxx} from "../../../../components/common/CustomBootstrap";
import * as Const from "../../../Const";
import axios from "axios";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";
// import ReactSiema from "./../../../../components/ReactSiema/lib";
import {formatNumber} from './../../../functions/Functions'
import DeleteModal from "../../../DeleteModal";
import RowEditItem from "./RowEditItem";
import AddItem from "../AddItem";
import AddGalleryItem from "../../twoStepAddItem/AddGalleryItem";
import ShowDescriptionItems from "../../showDescriptionItems";
import ModalGallery from "../../twoStepAddItem/ModalGallery";
import ax from "../../../new/loader.gif";
import LoaderComponent from "../../../LoaderComponent";
var classNames = require('classnames');

// Gallery: (2) [{…}, {…}]
// ItemImageUrl: "menu_image_url_0"
// Likes: [{…}]
// LikesCount: 1
// MenuImageUrl: "image_url_0"
// RowId: 0
// Title: "item_0"
// _id: "5d2da0b7d74b103f12d75ddd"

class RowShowItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:"title",
            Rank: 1,
            price:'',
            edit:true,
            modal:false,
            imgHover:false,
            step1:true,id:null,itemName:null,
            liClasses:classNames({
                // 'border-0': true,
                'col-5': true,

            }),
            MenuImageUrl:'',
            ItemImageUrl:''

        }
    }
    componentDidMount(){
        let{Title,price,RowId}=this.props.input;
        this.setState({
            title:Title,
            Rank:RowId,
            price
        });

        // console.log(this.props.input);
        let headers = {
            'Token': `${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let{MenuImageUrl,ItemImageUrl}=this.props.input;
        axios.get(MenuImageUrl, {headers: headers}).then(responsive => {
            this.setState({
                MenuImageUrl:responsive.data
            })

        }).catch(error => {
            console.log(error)
        });

        axios.get(ItemImageUrl, {headers: headers}).then(responsive => {
            this.setState({
                ItemImageUrl:responsive.data
            })
        }).catch(error => {

            console.log(error)
        });

    }
    toggle = () => {
        // console.log("toggel");
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };
    DeleteItem(){
        let {_id}=this.props.input;

        let ItemId=_id;
        // console.log(ItemId);

        let headers = {
            'Token': `${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let BODY = {
            'ItemId': ItemId,
        };

        axios.post(`${Const.Amin_URL}admin/item/delete` ,BODY, {headers:headers}).then(responsive=>
        {
            // this.setState({
            //     loaderActive:false
            // });
            const {Description}=responsive.data;

            if(Description === "d"){
                NotificationManager.success(
                    "موفق شدید!",
                    "دسته بندی شما حذف شد",
                    3000,
                    null,
                    null,
                    "success"
                );

                const $el = document.getElementById(`${ItemId}`);
                const duration = 2;
                const from = { opacity: 0};
                TweenMax.to($el, duration, from);
                this.toggle()
                // setTimeout(function(){ window.location.reload(); }, 3000);

            }else {
                NotificationManager.error(
                    " موفق نشدید!",
                    Description,
                    3000,
                    null,
                    null,
                    "success"
                );
            }

            // console.log(Description)
        }).catch(error=>{
            // this.setState({
            //     loaderActive:false
            // });
            console.log(error)});

    }
    handelEdit(){
        this.setState(prevState => ({
           edit:!prevState.edit
        }))
        let id='editComponent';
        const $el = document.getElementById(`${id}`);
        // console.log($el)
        const duration = 2;
        const from = { opacity: 0};
        TweenMax.to($el, duration, from);
        // setTimeout(() => {
        //     $el.remove();
        // }, 2000)

    }
    handelGoTwoStep2(item,value){
        this.setState({
            id:item,
            itemName:value,
            step1:false
        });
        // console.log("we are in step two")
        // console.log(item);
        // console.log(value);
    }
    GetBackToMain(value){
        // console.log('value:  '+value)
        if (value === true){
            // console.log('we edit some fechture');
            window.location.reload()

        } else {
            this.setState({
                edit:true
            })
            // console.log('we didnt edit some fechture');
        }
    }

    render() {
        // id:null,itemName:null,
        let { title,Rank,edit,price,id,itemName}=this.state;
        let {index , input}=this.props;
        // console.log(input._id);
        // console.log(input.Description);
        // console.log(index)
        // let {index , img}=this.props;
        return (
            <div>
                {
                    edit===true ?
                        <div className='w-100' id={input._id} dir='rtl' >
                            <Card>
                                <div className=' d-flex justify-content-between w-100  mt-2 col-12 '>

                                    <div className='col-12'>
                                        <div className='d-flex justify-content-center mt-3'>
                                            <IntlMessages id='عکس منو'/>
                                        </div>
                                        <div className='imgHeight20vh '>
                                            {
                                                this.state.MenuImageUrl.length > 1?
                                                <img
                                                src={this.state.MenuImageUrl}
                                                alt={index}
                                                // className='w-100 br05 m-2 h-100 bg-light'
                                                // className='imgSelf bg-light br05 m-2'
                                                className='imgSelf bg-light br05 m-2'
                                                />:<LoaderComponent/>
                                            }
                                            {/*<img*/}
                                                {/*src={this.state.MenuImageUrl}*/}
                                                {/*alt={index}*/}
                                                {/*// className='w-100 br05 m-2 h-100 bg-light'*/}
                                                {/*// className='imgSelf bg-light br05 m-2'*/}
                                                {/*className='objectFitContent bg-light br05 m-2'*/}
                                            {/*/>*/}
                                        </div>
                                    </div>

                                    {/*<div className='col-6'>*/}
                                        {/*<div className='d-flex justify-content-center mt-3'>*/}
                                            {/*<IntlMessages id='عکس آیتم'/>*/}
                                        {/*</div>*/}
                                        {/*<div className='imgHeight20vh '>*/}
                                            {/*<img*/}
                                                {/*src={this.state.ItemImageUrl}*/}
                                                {/*alt={index}*/}
                                                {/*className='w-100 br05 m-2 h-100 bg-light'*/}
                                            {/*/>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                </div>


                                <div className='clearfix'></div>

                                <CardBody>
                                    <div className="col-12 d-flex paddingZero ">
                                        <div className="col-6   paddingZero">
                                            <RowShowShow label={"عنوان"} value={input.Title} />
                                        </div>
                                        <div className="col-6  paddingZero ">
                                            <RowShowShow label={"دسته بندی"} value={input.RowId} />
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex mt-2  paddingZero">
                                        <div className="col-6 paddingZero">
                                            <RowShowShow label={"نظرات"} value={input.Comments?input.Comments.length:0} />
                                        </div>

                                        <div className="col-6  paddingZero">
                                            <RowShowShow label={"پسندیدن"} value={input.LikesCount} />
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex mt-2 paddingZero">
                                        <div className="col-12  paddingZero">
                                            <RowShowShow label={"قیمت"} value={formatNumber(input.Price)} />
                                        </div>

                                    </div>
                                    <div className="col-12 d-flex mt-2 paddingZero">
                                        {/*<div className="col-12  paddingZero">*/}
                                            <ShowDescriptionItems label={"توضیحات"} value={input.Description}/>
                                            {/*<RowShowShow label={"توضیحات"} value={input.Description} />*/}
                                        </div>

                                    {/*</div>*/}
                                    <CarouselEdite  data={input.Gallery}/>

                                    <span className=' badge-danger deleteBadge2 btn-shadow' onClick={this.toggle}>
                                         پاک کردن
                                    </span>
                                    <span className=' badge-warning editBadge2 btn-shadow' onClick={this.handelEdit.bind(this)}>
                                         ویرایش
                                    </span>
                                </CardBody>

                            </Card>
                            <DeleteModal modal={this.state.modal} toggle={this.toggle} handleDelete={this.DeleteItem.bind(this)} header={'حذف آیتم'}/>


                        </div> :

                        <div className='w-100' id='editComponent'>
                            <RowEditItem Title={title} RowId={Rank} price={input.Price} id={input._id} Description={input.Description} itemName={input.Title}
                                               handelGoTwoStep2={this.handelGoTwoStep2.bind(this)}  GetBackToMain={this.GetBackToMain.bind(this)}/>
                            {/*<ModalGallery id={input._id} itemName={input.Title}/>*/}
                         {/*<AddGalleryItem id={input._id} itemName={input.Title}/>*/}

                        </div>

                }
            </div>



        );
    }
}

export default RowShowItem;