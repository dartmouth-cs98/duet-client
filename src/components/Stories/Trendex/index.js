import React from 'react';
import Page from '../../Page';
import Popup from '../../Popup';
import { User } from '../../../types';
import { string } from 'prop-types';
import { TrendexDescription } from '../../../constants/helpInfo';

const { PAGE_INFO, PAGE_NAME } = TrendexDescription;

const Trendex = ({ user_1, user_2, my_id }) => {
    const { trendex: user1Trendex, display_name: user1Name } = user_1;
    const { trendex: user2Trendex, display_name: user2Name } = user_2;

    return (
        <Page background={'#212034'} >
            <div className="Trendex-Page">
                <div className="Trendex-TopSquare">
                    {user1Trendex > user2Trendex && user_1.id == my_id && user_2.id != my_id &&
                        <h1 className="Trendex-Description"><mark>u are trendier than {user2Name}</mark></h1>}
                    {user1Trendex > user2Trendex && user_1.id != my_id && user_2.id != my_id &&
                        <h1 className="Trendex-Description"><mark>{user1Name} is trendier than {user2Name}</mark></h1>}
                    {user1Trendex > user2Trendex && user_1.id != my_id && user_2.id == my_id &&
                        <h1 className="Trendex-Description"><mark>{user1Name} is trendier than u</mark></h1>}
                    {user1Trendex < user2Trendex && user_1.id != my_id && user_2.id != my_id &&
                        <h1 className="Trendex-Description"><mark>{user2Name} is trendier than {user1Name}</mark></h1>}
                    {user1Trendex < user2Trendex && user_1.id == my_id && user_2.id != my_id &&
                        <h1 className="Trendex-Description"><mark>{user2Name} is trendier than u</mark></h1>}
                    {user1Trendex < user2Trendex && user_1.id != my_id && user_2.id == my_id &&
                        <h1 className="Trendex-Description"><mark>u are trendier than {user1Name}</mark></h1>}
                    {user1Trendex == user2Trendex && user_1.id == my_id && user_2.id != my_id &&
                         <h1 className="Trendex-Description"><mark>u and {user2Name} are equally trendy</mark></h1>}
                    {user1Trendex == user2Trendex && user_1.id != my_id && user_2.id == my_id &&
                         <h1 className="Trendex-Description"><mark>{user1Name} and u are equally trendy</mark></h1>}
                    {user1Trendex == user2Trendex && user_1.id == my_id && user_2.id == my_id &&
                         <h1 className="Trendex-Description"><mark>{user1Name} and  are equally trendy</mark></h1>}
                    {user1Trendex == user2Trendex && user_1.id != my_id && user_2.id != my_id &&
                         <h1 className="Trendex-Description"><mark>{user1Name} and {user2Name} equally trendy</mark></h1>}
                    <h2 className="Trendex-Score-T">{user1Trendex}</h2>
                    {user_1.id != my_id && 
                        <h3 className="Trendex-Score-Label">{user1Name}&apos;s trendex</h3>}
                    {user_1.id == my_id && 
                        <h3 className="Trendex-Score-Label">ur trendex</h3>}
                </div>
                <div className="Trendex-Divider">\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\</div>
                <div className="Trendex-BottomSquare">
                    <h2 id="bottom" className="Trendex-Score-B">{user2Trendex}</h2>
                    {user_2.id != my_id && 
                        <h3 className="Trendex-Score-Label">{user2Name}&apos;s trendex</h3>}
                    {user_2.id == my_id && 
                        <h3 className="Trendex-Score-Label">ur trendex</h3>}
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

export default Trendex;