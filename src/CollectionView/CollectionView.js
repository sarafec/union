import React, { Component } from 'react';
import collections from '../data.json';
import './CollectionView.css';

//render photo list
function renderCollection() {
	let collectionIdentifier = this.relativePathName.split("/")[3];
	let targetCollection = collections.filter(function(x){
			return x.url === collectionIdentifier;
		})
	return targetCollection.map((collection, index) =>
		<div className="collection-container" key={index}>
			<div className="collection-photo-viewer">
				<div className="collection-photo-background">
					<img className="collection-photo" src={"https://sarafec.github.io/union/" + collection.photos[this.state.currentPhoto]} alt="fashionable person" onClick={this.pushPhotoForward} onKeyDown={this.decipherKeyDown} tabIndex="2" />
					<div className="left-arrow-container"><div className="left-arrow" tabIndex="1" onClick={this.pushPhotoBackward} onKeyDown={this.decipherLeftArrow}>{"<"}</div></div>
					<div className="right-arrow-container"><div className="right-arrow" tabIndex="3" onClick={this.pushPhotoForward} onKeyDown={this.decipherRightArrow}>{">"}</div></div>
					<div className="collection-counter">{this.state.currentPhoto + 1}/{collection.photos.length}</div>

				</div>
			</div>
			<div className="collection-text">{collection.company[0]} x {collection.company[1]}</div>
			<div className="collection-year">{"Year: " + collection.year}</div>

		</div>
	);
}

//identify collection based on url
function identifyCollection(){
	let collectionIdentifier = this.relativePathName.split("/")[3];
	let targetCollection = collections.filter(function(x){
			return x.url === collectionIdentifier;
	})

	this.setState({
		currentCollection: targetCollection
	});

};

//event handler response to move forward 
function pushPhotoForward(){
		if(!this.state.currentCollection){
			this.identifyCollection();
			this.setState({
				currentPhoto: +this.state.currentPhoto + 1
			});
		} else if(this.state.currentPhoto < this.state.currentCollection[+0].photos.length - 1){
			this.setState({
				currentPhoto: +this.state.currentPhoto + 1
			});
		}

}

//event handler response to move backward 
function pushPhotoBackward(){
	if(this.state.currentPhoto > 0){
		this.setState({
			currentPhoto: +this.state.currentPhoto - 1
		});
	}
}

class CollectionView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentPhoto: 0
		}

		this.relativePathName = props.location.pathname;
		this.renderCollection = renderCollection.bind(this);
		this.pushPhotoForward = pushPhotoForward.bind(this);
		this.pushPhotoBackward = pushPhotoBackward.bind(this);
		this.identifyCollection = identifyCollection.bind(this);
		this.decipherKeyDown = this.decipherKeyDown.bind(this);
		this.decipherLeftArrow = this.decipherLeftArrow.bind(this);
		this.decipherRightArrow = this.decipherRightArrow.bind(this);
	}

	//decide which button has been pushed
	decipherKeyDown(evt) {
		if(evt.which === 13){
			this.pushPhotoForward();
		} else if(evt.which === 39){
			this.pushPhotoForward();
		} else if(evt.which === 37){
			this.pushPhotoBackward();
		}
	}

	decipherLeftArrow(evt){
		if(evt.which === 13){
			this.pushPhotoBackward();
		}
	}

	decipherRightArrow(evt){
		if(evt.which === 13){
			this.pushPhotoForward();
		}
	}

  render() {
    return (
    <div>
    	{this.renderCollection()}
    </div>
    );
  }
}

export default CollectionView;
