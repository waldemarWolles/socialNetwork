import React from 'react';
import ReactPlayer from 'react-player';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';



const Videos = (props) => {
    return (
        <AwesomeSlider>
            <div>
                <ReactPlayer width='900px' height='600px' url='https://www.youtube.com/watch?v=pXRviuL6vMY&ab_channel=FueledByRamen' />
            </div>
            <div >
                <ReactPlayer width='900px' height='600px' url='https://www.youtube.com/watch?v=q9eKLPCciWw&ab_channel=musicmaker2' />
            </div>
            <div >
                <ReactPlayer width='900px' height='600px' url='https://www.youtube.com/watch?v=55OJ17cHeJA&ab_channel=amonamarthVEVO' />
            </div>
            <div >
                <ReactPlayer width='900px' height='600px' url='https://www.youtube.com/watch?v=3YxaaGgTQYM&ab_channel=EvanescenceVEVO' />
            </div>
            <div >
                <ReactPlayer width='900px' height='600px' url='https://www.youtube.com/watch?v=As133x4tTIw&ab_channel=VioletOrlandi' />
            </div>
        </AwesomeSlider>
    );



    //<div className={classes.videos} >
    //     <div className={classes.video}>
    //         <ReactPlayer url='https://www.youtube.com/watch?v=pXRviuL6vMY&ab_channel=FueledByRamen' />
    //         <h3 >Twenty one pilots: Stressed Out [OFFICIAL VIDEO]</h3>
    //     </div>
    //     <div className={classes.video}>
    //         <ReactPlayer url='https://www.youtube.com/watch?v=q9eKLPCciWw&ab_channel=musicmaker2' />
    //         <h3 >Nightwish Live at Wacken Open Air 2013 HD Full Concert</h3>
    //     </div>
    //     <div className={classes.video}>
    //         <ReactPlayer url='https://www.youtube.com/watch?v=55OJ17cHeJA&ab_channel=amonamarthVEVO' />
    //         <h3 >Amon Amarth - The Way of Vikings</h3>
    //     </div>
    //     <div className={classes.video}>
    //         <ReactPlayer url='https://www.youtube.com/watch?v=3YxaaGgTQYM&ab_channel=EvanescenceVEVO' />
    //         <h3 >Evanescence - Bring Me To Life (Official Music Video)</h3>
    //     </div>
    //     <div className={classes.video}>
    //         <ReactPlayer url='https://www.youtube.com/watch?v=As133x4tTIw&ab_channel=VioletOrlandi' />
    //         <h3 >I Hate Everything About You - Three Days Grace | Violet Orlandi ft Halocene COVER </h3>
    //     </div>

    // </div>

}


export default Videos;