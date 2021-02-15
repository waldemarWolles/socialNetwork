import React from 'react'
import ReactPlayer from 'react-player'
import AwesomeSlider from 'react-awesome-slider'
import 'react-awesome-slider/dist/styles.css'
import { withAuthRedirect } from '../common/withAuthRedirect'

const Videos: React.FC<{}> = (props) => {
  return (
    <AwesomeSlider>
      <div>
        <ReactPlayer
          width="900px"
          height="600px"
          url="https://www.youtube.com/watch?v=pXRviuL6vMY&ab_channel=FueledByRamen"
        />
      </div>
      <div>
        <ReactPlayer
          width="900px"
          height="600px"
          url="https://www.youtube.com/watch?v=q9eKLPCciWw&ab_channel=musicmaker2"
        />
      </div>
      <div>
        <ReactPlayer
          width="900px"
          height="600px"
          url="https://www.youtube.com/watch?v=55OJ17cHeJA&ab_channel=amonamarthVEVO"
        />
      </div>
      <div>
        <ReactPlayer
          width="900px"
          height="600px"
          url="https://www.youtube.com/watch?v=3YxaaGgTQYM&ab_channel=EvanescenceVEVO"
        />
      </div>
      <div>
        <ReactPlayer
          width="900px"
          height="600px"
          url="https://www.youtube.com/watch?v=As133x4tTIw&ab_channel=VioletOrlandi"
        />
      </div>
    </AwesomeSlider>
  )
}

export const VideosWithAuth = withAuthRedirect(Videos)
