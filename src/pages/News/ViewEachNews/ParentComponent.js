// ParentComponent.js

import { useState } from 'react';
import ViewEachNews from './viewNews';

const ParentComponent = () => {
    const [news] = useState();

    return (
        <div>
            <ViewEachNews news={news} />
        </div>
    );
};

export default ParentComponent;
