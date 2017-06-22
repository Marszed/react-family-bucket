/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import Header from './common/header';
import NavAll from './common/navAll';
import NavCountry from './common/navCountry';
import OverviewComponent from './common/overview';
import pureRender from "pure-render-decorator";



@pureRender
class Overview extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {params} = this.props;

        return <div>
            <Header params={params}/>
            {
                params && Number(params.type) === 1 ? (params.country === 'country.000' ? <NavAll params={params}/> : <NavCountry params={params}/>) : ''
            }
            <OverviewComponent params={params}/>
        </div>;
    }
}

export default Overview;