import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import ImageLinkForm from './Components/ImageLinkForm/ImageLInkForm';
import Logo from './Components/Logo/Logo';
import Navigation from './Components/navigation/Navigation';
import Rank from './Components/Rank/rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area:800
      }
    }
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignIn: false,
      user: {
        id:'',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const inputImage = document.getElementById('inputimage');
    const width = inputImage.width;
    const height = inputImage.height;
    return {
      left_col: clarifaiFace.left_col*width,
      right_col: width- clarifaiFace.right_col*width,
      top_row: clarifaiFace.top_row*height,
      bottom_row:height- clarifaiFace.bottom_row*height
    }
  }

  displayFace(box) {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    const { input,user } = this.state;
    this.setState({ imageUrl: input });
    fetch('https://limitless-river-01934.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        input: input
      })
    }) 
      .then(data => data.json())
      .then((response) => {
        if (response) {
          fetch('https://limitless-river-01934.herokuapp.com/image', {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(resp => resp.json())
            .then(entry => this.setState({ user: { ...user, entries: entry } }))
            //our server(image endpoint) will send a entry of a user which is now logged in 
            .catch(console.log);
        }
        this.displayFace(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    route === 'home' ?
      this.setState({ isSignIn: true }): 
      this.setState({ isSignIn: false,imageUrl:'',box:{} }) 
    this.setState({ route: route});
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id:user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    })
  }

  render() {
    const { isSignIn, route, box, imageUrl,user } = this.state;
    return (
      <div className="App">
        <Particles className="particle" params={ particlesOptions }/>
        <Navigation isSignIn={isSignIn} onRouteChange={ this.onRouteChange }/>
        {
          route !== 'home' ?
            (
              route === 'register' ?
              <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}  /> :
              <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            ) :
            <div>
              <Logo />
              <Rank entries={user.entries} name={ user.name }/>
              <ImageLinkForm
                onInputChange={ this.onInputChange } 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
        }
      </div>
    );
  }
  
}

export default App;
