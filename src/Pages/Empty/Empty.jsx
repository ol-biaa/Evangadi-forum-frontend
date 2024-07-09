import React from 'react';
import './empty.css'
import Layout from '../../Components/Layout/Layout';

function Empty () {
    return (
        <Layout>
            <div className="Emptystyle">
                <h2>Uh-Oh...!</h2>
                <h2>It could be you, or it could be me, but there is no page here</h2>
            </div>
        </Layout>

    );
}

export default Empty;