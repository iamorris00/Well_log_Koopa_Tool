import React, {useRef} from 'react';
import * as d3 from 'd3'

const DepthTrack = ({dataset}) => {
    const d3DepthTrack = useRef()
    const depth = dataset.map(data => data[dataset.columns[0]])
    let extent = d3.extent(depth)

    console.log(depth)
    return (
        <div id={'depth_track'}>
            <svg ref={d3DepthTrack}></svg>

        </div>
    );
};

export default DepthTrack;