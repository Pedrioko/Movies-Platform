import React from 'react';
import './MovieDetails.css';
import {
  Player, ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  BigPlayButton
} from 'video-react';
import Axios from 'axios';
import { Link } from 'react-router-dom'

class MovieDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      item: {}
    }
  }
  //--------------------------------------------------------------
  componentWillMount() {
    var id = (this.props.location.state) ? this.props.location.state.item.id : this.props.match.params.id;
    Axios.get("/api/videos/" + id).then(function (response) {
      this.setState({
        item: response.data
      })
    }.bind(this));
  }

  regresar = () => {
    this.props.history.goBack();
  }

  getTime = () => {
    let totalSeconds = this.state.item.duration;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    return (hours > 0 ? hours + " h " : '') + (minutes > 0 ? minutes + " min " : '') + seconds + " seg "
  }

  render() {
    /*    <button onClick={this.regresar}>Regresar </button>*/
    const { item } = this.state;
    if (!item._id)
      return null;
    return (
      <div className="container">
        <div className="grid-container ">
          <div className="row">
            <div className="col-sm-12">
              <Player loop={false}>
                <source src={"/api/video/" + this.state.item._id} />
                <BigPlayButton position="center" />
                <ControlBar autoHide={true}>
                  <CurrentTimeDisplay order={4.1} />
                  <TimeDivider order={4.2} />
                  <VolumeMenuButton />
                </ControlBar>
              </Player>
            </div>
          </div>
          <div className="row content padding-top-1">
            <div className="poster col-sm-12 col-md-3 col-lg-3" small={12} medium={3} large={3}>
              <img className="imgentada"
                src={this.state.item.portada} />
            </div>
            <div className="movie-body col-sm-12 col-md-9 col-lg-9">
              <div className="header">
                <div className="title grid-container">
                  <div className="row">
                    <div className="col-sm-12 col-md-9 col-lg-10">
                      <h4>{this.state.item.visualname ? this.state.item.visualname : this.state.item.name}</h4>
                    </div>
                    <div className="col-sm-12 col-md-9 col-lg-2">
                      <i className="fab fa-facebook-square fa-2x padding-left-1"></i>
                      <i className="fab fa-google-plus fa-2x padding-left-1" aria-hidden="true"></i>
                      <i className="fab fa-twitter-square fa-2x padding-left-1" aria-hidden="true"></i>
                    </div>
                    <div className="col-sm-12 ">
                      <span className="classification">{this.getTime()} | {this.state.item.year ? this.state.item.year : '-'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="body grid-container">
                <div className="row information">
                  <div className="col-sm-12">
                    <div className="sinopsis">
                      {this.state.item.description ? this.state.item.description : "No description"}
                    </div>
                    <div className="questions flex-container flex-dir-row">
                      <div className="list-star flex-child-auto align-self-middle">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                      </div>
                      <div className="watch padding-2">
                        <i className="fas fa-eye margin-right-1"></i>
                        {this.state.item.view ? this.state.item.view : 0} Visitas
                      </div>
                      <div className="like padding-2">
                        <i className="fas fa-heart margin-right-1"></i>
                        {this.state.item.like ? this.state.item.like : 0} Me gusta
                      </div>
                      <div className="comment padding-2">
                        <i className="fas fa fa-comments margin-right-1"></i>
                        0 Comentarios
                      </div>
                    </div>
                    <div className="info-gratitude margin-bottom-1">
                      <div className="directed">
                        <span>Título original: </span>
                        <span>{this.state.item.name ? this.state.item.name : ''}</span>
                      </div>
                      <div className="directed">
                        <span>Director: </span>
                        <span>{this.state.item.like ? this.state.item.like : ''}</span>
                      </div>
                      <div className="credits">
                        <span>Guión: </span>
                        <span>Dan Berendsen</span>
                      </div>
                      <div className="studio">
                        <span>Estudio: </span>
                        <span>{this.state.item.studio ? this.state.item.studio.name : ''}</span>
                      </div>
                    </div>
                    <div className="category">
                      {this.state.item.categorias ? this.state.item.categorias.map(item => (<Link key={item._id} to="/" className="button rounded  bordered primary">  {item.name}</Link>)) : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h4 className="text-white">Reparto</h4>
        <div className="row ">
          {this.state.item.reparto ? this.state.item.reparto.map(item => (
            <div className="movie-body col-sm-1 text-white align-center">
              <Link to="/" key={item._id}>
                <img className=" img-actor"
                  src={item.imageAvatar} />
                <p className="text-center">{item.name}</p>
              </Link>
            </div>)) : ''}
        </div>
      </div>
    );
  }


}
export default MovieDetails;