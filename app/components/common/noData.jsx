/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';

class NoData extends React.Component {
    render = () => (
        <div className="proj_propty_tabBox">
            <div className="ipx_empty_data">
                <i className="iconfont icon-empty_box" />
                <FormattedMessage
                    id='noData'
                    tagName='p'
                    defaultMessage='noData'
                />
            </div>
        </div>
    );
}

export default NoData;
