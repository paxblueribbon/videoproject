import React from "react";

class Video extends React.Component {
    constructor(props) {
        super(props);
    }
    

    render() {
        const iframeContainer = {
            overflow: 'hidden',
            /* 16:9 aspect ratio */
            paddingTop: '56.25%',
            position: 'relative',
          }
          const theIframe = {
             border: 0,
             height: '68%%',
             left: 0,
             position: 'absolute',
             top: 0,
             width: '70%%'
          }

        return (
            <>
            <div className="col-8 embed-responsive embed-responsive-16by9" style={iframeContainer}>
                <iframe style={theIframe}  allowfullscreen="true" width="100%" height="100%" src="http://173.255.212.236:5080/LiveApp/play.html?name=test2" frameborder="0"></iframe>
            </div>
            </>
        )
    }
}

export default Video;