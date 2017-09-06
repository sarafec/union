import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './IconView.css';
import collections from '../data.json';


function renderCollectionList(){
	if (this.state.currentlyDisplayed) {
		return this.state.currentlyDisplayed.map((collection, index) =>
			<div className="icon-entry" key={index}>
				<Link to={`/union/collection/${collection.url}`}><img className="icon-image" src={collection.photos[0]} alt="from collection" /></Link>
				<div className="icon-text">{collection.company[0]} x {collection.company[1]}</div>
			</div>
		);
	};
}

function filterUnique(value, index, self){
 	return self.indexOf(value) === index;
}


function renderCompanyList(){
	if (this.state.currentlyDisplayed.length === 0) {
		return (<div></div>);
	} else if(this.state.companiesDisplayed && this.state.companiesDisplayed[0] !== ""){
			return this.state.companiesDisplayed.map((company, index) =>
				<div className="checkbox-entry" key={index}>
					<input className="filter-button" type="button" value="X" id={company} onClick={this.filterCompany} />
					<label htmlFor={company}>{company}</label>
				</div>
			);
	} else if(this.uniqueCompanyList) {
			return this.uniqueCompanyList.map((company, index) =>
			<div className="checkbox-entry" key={index}>
				<input className="filter-button" type="button" value="X" id={company} onClick={this.filterCompany} />
				<label htmlFor={company}>{company}</label>
			</div>
		);
	}
}



function renderClothingList(){
	if (this.state.currentlyDisplayed.length === 0) {
		return (<div></div>);
	} else if(this.state.clothingDisplayed && this.state.clothingDisplayed[0] !== ""){
			return this.state.clothingDisplayed.map((clothing, index) =>
				<div className="checkbox-entry" key={clothing}>
					<input className="filter-button" type="button" value="X" id={clothing} onClick={this.filterType} />
					<label htmlFor={clothing}>{clothing}</label>
				</div>
			);
	} else if(this.uniqueClothingList) {
			return this.uniqueClothingList.map((clothing, index) =>
			<div className="checkbox-entry" key={index}>
				<input className="filter-button" type="button" value="X" id={clothing} onClick={this.filterType} />
				<label htmlFor={clothing}>{clothing}</label>
			</div>
		);
	}
}

class IconView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			serachTerm: '',
			currentlyDisplayed: collections,
			clothingDisplayed: '',
			companiesDisplayed: ''
		}

		this.uniqueCompanyList = this.initialCompanyList();
		this.uniqueClothingList = this.initialClothingList();

		this.filterUnique = filterUnique.bind(this);
		this.onSearch = this.onSearch.bind(this);

		this.createCompanyList = this.createCompanyList.bind(this);
		this.createClothingList = this.createClothingList.bind(this);

		this.renderCollectionList = renderCollectionList.bind(this);
		this.renderCompanyList = renderCompanyList.bind(this);
		this.renderClothingList = renderClothingList.bind(this);

		this.filterType = this.filterType.bind(this);
		this.filterCompany = this.filterCompany.bind(this);
	}

	onSearch(evt) {
		let newIconList = collections.filter((iconEntry) =>
			iconEntry.search.includes(evt.target.value.toLowerCase()));

		this.setState({
	      searchTerm: evt.target.value,
	      currentlyDisplayed: newIconList
	    });

		this.renderCollectionList();
		this.createClothingList();
		this.createCompanyList();
	}

	filterType(evt){
		let filteredList = this.state.currentlyDisplayed.filter((entry) => 
			!entry.type.includes(evt.target.id)
		);
		
		this.setState({
	      currentlyDisplayed: filteredList
	    });

		window.setTimeout(() => {
		    this.createClothingList();
			this.createCompanyList();
		}, 50);

	}

	filterCompany(evt){
		let filteredList = this.state.currentlyDisplayed.filter((entry) => 
			!entry.company.includes(evt.target.id)
		);
		
		this.setState({
	      currentlyDisplayed: filteredList
	    });

		window.setTimeout(() => {
		    this.createClothingList();
			this.createCompanyList();
		}, 50);
	}

	createCompanyList(){
		let allCompanyList = this.state.currentlyDisplayed.map((entry) =>
			entry.company
		);
		let unifiedCompanyList = allCompanyList.join().split(",");
		let uniqueCompanyList = unifiedCompanyList.filter(filterUnique).sort();
		
		this.setState({
	      companiesDisplayed: uniqueCompanyList
	    });
		
	}

	createClothingList(){
		let allClothingTypeList = this.state.currentlyDisplayed.map((entry) =>
			entry.type
		);
		let unifiedClothingTypeList = allClothingTypeList.join().split(",");
		let uniqueClothingList = unifiedClothingTypeList.filter(filterUnique).sort();

		this.setState({
	      clothingDisplayed: uniqueClothingList
	    });

	}

	initialClothingList(){
		let allClothingTypeList = collections.map((entry) =>
			entry.type
		);
		let unifiedClothingTypeList = allClothingTypeList.join().split(",");
		let uniqueClothingList = unifiedClothingTypeList.filter(filterUnique).sort();
		
		return uniqueClothingList;
	}

	initialCompanyList() {
		let allCompanyList = collections.map((entry) =>
				entry.company
			);
		let unifiedCompanyList = allCompanyList.join().split(",");
		let uniqueCompanyList = unifiedCompanyList.filter(filterUnique).sort();

		return uniqueCompanyList;
	}

  render() {

    return (
    <div>
    	<div className="visual-header">
    	<header className="main-header">
    		<h1 className="main-title">Union</h1>
        	<h3 className="main-subtitle">A Fashion Collboration Catalog</h3>
    	</header>
    	<input className="main-search" type="search" onChange={this.onSearch} />
    	</div>
    	<div className="filter-area">
    		<div className="clothing-filter-title">Clothing Type</div>
    		<div className="clothing-filter-list">{this.renderClothingList()}</div>
    		<div className="company-filter-title">Company</div>
    		<div className="company-filter-list">{this.renderCompanyList()}</div>
    	</div>
    	<div className="icon-area">
    	{this.renderCollectionList()}
    	</div>
    </div>
    );
  }
}

export default IconView;
