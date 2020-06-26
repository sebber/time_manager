// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import '../../css/admin.css';
import 'phoenix_html';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './Root';

ReactDOM.render(<Root />, document.getElementById('root'))