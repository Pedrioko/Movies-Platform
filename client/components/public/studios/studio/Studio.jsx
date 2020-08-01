import React from 'react';
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';

class Studio extends React.Component {

    componentWillMount() {
        console.log(this)
    }

    render() {
        return (
            <Link to={{
                pathname: "/studios/studio/" + this.props.item.name,
                state: { item: this.props.item }
            }}>
                <div className="p-1" >

                    <LazyLoadImage effect="blur"
                        wrapperClassName="img-fluid d-block mx-auto"
                        src={this.props.item.image} />

                    <p className="text-white text-center">{this.props.item.name}</p>
                </div>
            </Link>
        );
    }


}
export default Studio;