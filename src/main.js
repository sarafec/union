import React from 'react';
import { Switch, Route } from 'react-router-dom';

import IconView from './IconView/IconView';
import CollectionView from './CollectionView/CollectionView';


const Main = () => (
	<main>
	<Switch>
		<Route exact path='/union/' component={IconView} />
		<Route path='/union/collection' component={CollectionView} />
	</Switch>
	</main>
)

export default Main;