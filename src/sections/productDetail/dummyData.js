import {Box} from "@mui/material";

//testMode images
// import img  from '../../resources/Barbie Bikinis/web_optimized/765x990/_LSP5209.jpg';
import img_1 from '../../resources/Barbie Bikinis/web_optimized/765x990/_LSP4999.jpg';
// import img_2  from '../../resources/Barbie Bikinis/web_optimized/765x990/_LSP5062.jpg';
// import img_3  from '../../resources/Barbie Bikinis/web_optimized/765x990/_LSP5080.jpg';
import img from '../../resources/Barbie Bikinis/web_optimized/510x660/_LSP4999_1.jpg';
// import img_1  from '../../resources/Barbie Bikinis/web_optimized/510x660/_LSP5080.jpg';
import img_2 from '../../resources/Barbie Bikinis/web_optimized/510x660/_LSP5209.jpg';
import img_3 from '../../resources/Barbie Bikinis/web_optimized/510x660/_LSP5062.jpg';

export const getDummy = (IMG) => {
    const IMGTHUMBS = [];
    const IMGMAIN = [];

    // const IMG = [{
    //     id: 1, url: img
    // }, {
    //     id: 2, url: img_1
    // }, {
    //     id: 3, url: img_2
    // }, {
    //     id: 4, url: img_3
    // }];

    IMG.map(item => {
        IMGTHUMBS.push({
            id: item.id,
            el:
                <Box>
                    <img src={item.url} alt="thumbs" className='swiper-lazy'/>
                    <Box className='swiper-lazy-preloader-white'></Box>
                </Box>
        })
        IMGMAIN.push({
            id: item.id,
            el:
                <Box sx={{height: '687px'}} className='swiper-zoom-container'>
                    <img src={item.url} alt="thumbs_main" className='swiper-lazy'/>
                    <Box className='swiper-lazy-preloader-white'></Box>
                </Box>
        })
    });

    return {IMGTHUMBS, IMGMAIN, IMG}
}
