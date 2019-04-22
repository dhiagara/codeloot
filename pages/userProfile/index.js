import React from 'react'
import { Layout } from '../../shared/components'
import Upload from './upload'
import { Card,Button } from 'antd';
import Fetchfiles from './fetchhFiles'
const { Meta } = Card;

class Profile extends React.Component {

    render() {
        return (
            <Layout>
                
              <Upload></Upload>

                <Fetchfiles></Fetchfiles>
           </Layout>
        )
    }
}
export default Profile;