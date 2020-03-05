import React from 'react';
import Page from '../../Page';
import Popup from '../../Popup';
import { User } from '../../../types';
import { string } from 'prop-types';
import { TrendexDescription } from '../../../constants/helpInfo';

const { PAGE_INFO, PAGE_NAME } = TrendexDescription;

const Trendex = ({ user_1, user_2, my_id }) => {
    const { trendex: user1Trendex } = user_1;
    const { trendex: user2Trendex } = user_2;

    var user1Name = user_1.display_name
    var user2Name = user_2.display_name

    if(user_1.id == "Everyone"){
        user1Name = 'the average user';
    }
    else if(user_2.id == "Everyone"){
        user2Name = 'the average user'
    }

    return (
        <Page background={'#212034'} >
            <div className="Trendex-Page">
                <div className="Trendex-TopSquare">
                    <div>
                        {user1Trendex > user2Trendex && user_1.id == my_id && user_2.id != my_id &&
                            <h1 className="Trendex-Description"><mark>you are trendier than {user2Name}</mark></h1>}
                        {user1Trendex > user2Trendex && user_1.id != my_id && user_2.id != my_id &&
                            <h1 className="Trendex-Description"><mark>{user1Name} is trendier than {user2Name}</mark></h1>}
                        {user1Trendex > user2Trendex && user_1.id != my_id && user_2.id == my_id &&
                            <h1 className="Trendex-Description"><mark>{user1Name} is trendier than you</mark></h1>}
                        {user1Trendex < user2Trendex && user_1.id != my_id && user_2.id != my_id &&
                            <h1 className="Trendex-Description"><mark>{user2Name} is trendier than {user1Name}</mark></h1>}
                        {user1Trendex < user2Trendex && user_1.id == my_id && user_2.id != my_id &&
                            <h1 className="Trendex-Description"><mark>{user2Name} is trendier than you</mark></h1>}
                        {user1Trendex < user2Trendex && user_1.id != my_id && user_2.id == my_id &&
                            <h1 className="Trendex-Description"><mark>you are trendier than {user1Name}</mark></h1>}
                        {user1Trendex == user2Trendex && user_1.id == my_id && user_2.id != my_id &&
                            <h1 className="Trendex-Description"><mark>you and {user2Name} are equally trendy</mark></h1>}
                        {user1Trendex == user2Trendex && user_1.id != my_id && user_2.id == my_id &&
                            <h1 className="Trendex-Description"><mark>{user1Name} and you are equally trendy</mark></h1>}
                        {user1Trendex == user2Trendex && user_1.id == my_id && user_2.id == my_id &&
                            <h1 className="Trendex-Description"><mark>{user1Name} and  are equally trendy</mark></h1>}
                        {user1Trendex == user2Trendex && user_1.id != my_id && user_2.id != my_id &&
                            <h1 className="Trendex-Description"><mark>{user1Name} and {user2Name} equally trendy</mark></h1>}
                        <h2 className="Trendex-Score-T">{Math.round(user1Trendex)}</h2>
                        {user_1.id != my_id && 
                            <h3 className="Trendex-Score-Label">{user1Name}&apos;s trendex</h3>}
                        {user_1.id == my_id && 
                            <h3 className="Trendex-Score-Label">your trendex</h3>}
                    </div>
                </div>
                <div className="Trendex-Divider">\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\</div>
                <div className="Trendex-BottomSquare">
                    <div>
                        <h2 id="bottom" className="Trendex-Score-B">{Math.round(user2Trendex)}</h2>
                        {user_2.id != my_id && 
                            <h3 className="Trendex-Score-Label">{user2Name}&apos;s trendex</h3>}
                        {user_2.id == my_id && 
                            <h3 className="Trendex-Score-Label">ur trendex</h3>}
                    </div>
                </div>
            </div>
            <Popup pageInfo={PAGE_INFO} pageName={PAGE_NAME}/>
        </Page>
    )
}

Trendex.propTypes = {
    user_1: User,
    user_2: User,
    my_id: string,
}

export default React.memo(Trendex);