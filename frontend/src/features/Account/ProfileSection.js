/******************************** IMPORTS ********************************/
// libraries
import React from 'react';
// local files
import { profilePictures } from '../../component-resources';
import { LeftWrapper } from '../../styled-components/containers';
import { ProfilePicture } from '../../styled-components/branding';
import { H1Marketing, H2Information, H2Marketing } from '../../styled-components/text';


/******************************* COMPONENT *******************************/
function ProfileSection({title, state}) {

    let profilePicture = profilePictures.find(pic => pic.name === state.avatar).url;
    
    /****************** render component *******************/
    return (
        <>
            { state && (
                <>
                    <LeftWrapper><H1Marketing>{title}</H1Marketing>
                    <ProfilePicture>
                        <img src={profilePicture}></img>
                    </ProfilePicture>

                        <table>
                            <tr>
                                <th><LeftWrapper><H2Marketing>Name</H2Marketing></LeftWrapper></th>
                                <td><H2Information>{state.firstName} {state.lastName}</H2Information></td>
                            </tr>
                            <tr>
                                <th><LeftWrapper><H2Marketing>Username</H2Marketing></LeftWrapper></th>
                                <td><H2Information>{state.username}</H2Information></td>
                            </tr>
                            <tr>
                                <th><LeftWrapper><H2Marketing>Email</H2Marketing></LeftWrapper></th>
                                <td><H2Information>{state.email}</H2Information></td>
                            </tr>
                        </table>
                    </LeftWrapper>
                </>
            )}
        </>
    );
};


/******************************** EXPORTS ********************************/
export default ProfileSection;