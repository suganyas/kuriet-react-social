import React, { Component } from 'react';
import './Profile.css';
import FacebookLogin from "react-facebook-login";
import {getInstagramInsight} from "../../util/APIUtils";
import Alert from "react-s-alert";
import loading from './loading.gif';


class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            render: false
        }
        this.alertLoading = this.alertLoading.bind(this);
        this.handleFBLogin = this.handleFBLogin.bind(this);

    }

    handleFBLogin(response) {

        const igAccessToken = response.accessToken;

        getInstagramInsight(igAccessToken)
            .then(response => {
                console.log(response);
                this.props.updateInsight(response);
                this.props.history.push("/insights");
            }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong in fetching insight from Instagram. Please try again!');
        });
    }

    alertLoading() {
        this.setState({render: !this.state.render});
    }
    render() {
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            { 
                                this.props.currentUser.imageUrl ? (
                                    <img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{this.props.currentUser.name && this.props.currentUser.name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <h2>{this.props.currentUser.name}</h2>
                        </div>
                        <div >{

                            <header>
                                <p>
                                    <FacebookLogin
                                        appId="156680885641647"
                                        fields="name,email,picture"
                                        scope="instagram_manage_insights,instagram_basic,pages_show_list,business_management,ads_read,ads_management,read_insights,publish_pages,instagram_basic,instagram_manage_comments,pages_read_engagement,pages_show_list"
                                        cssClass="insta-icon"
                                        onClick={this.alertLoading}
                                        callback={this.handleFBLogin}/>
                                </p>
                            </header>
                        }
                        </div>
                        {this.state.render && <img src={loading}  width="200" height="200"/>}
                    </div>
                </div>    
            </div>
        );
    }
}

export default Profile

