import React from 'react'
import { Layout } from '../../shared/components'

import { Card } from 'antd';

const { Meta } = Card;

class Dash extends React.Component {

    render() {
        return (
            <Layout>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://images.techhive.com/images/article/2016/05/javascript_course-100660728-large.jpg" />}
                >
                    <Meta
                        title="Europe Street beat"
                        description="www.instagram.com"
                    />
                </Card>


            </Layout>
        )
    }


}



export default Dash