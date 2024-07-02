/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect } from 'react';
// local files
import VideoCard from './ReadVideoCard';
import { LeftWrapper } from '../styled-components/containers';
import { H1Marketing } from '../styled-components/text';
import { VideoQueueContainer } from '../styled-components/feature-specific';
import EditVideoCard from './EditVideoCard';


/******************************* COMPONENT *******************************/
function VideoQueue({ type, title, state }) {


    /****************** render component *******************/

    return (
        <>
            { state.length > 0 && (
                <>
                    <LeftWrapper><H1Marketing>{title}</H1Marketing></LeftWrapper>
                    <VideoQueueContainer>
                        {state.map((video) => {
                            return type ===  "read" ? (
                                <VideoCard object={video} />
                            ) : (
                                <EditVideoCard object={video} />
                            )
                        })}
                    </VideoQueueContainer>
                </>
            )}
        </>
    );
};


/******************************** EXPORTS ********************************/
export default VideoQueue;

/******************************** NOTES ********************************/
// Line 24: will render a specific type of video card (read or edit)
// depending on props
