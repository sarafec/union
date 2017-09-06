import React from 'react';
import { Switch, Route } from 'react-router-dom';

import IconView from './IconView/IconView';
import CollectionView from './CollectionView/CollectionView';


const Main = () => (
	<main>
	<Switch>
		<Route exact path='/' component={IconView} />
		<Route path='/search' component={IconView} />
		<Route path='/collection' component={CollectionView} />
	</Switch>
	</main>
)

export default Main;