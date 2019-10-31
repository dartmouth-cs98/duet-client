// import React from 'react';
// import RadarChart from 'react-svg-radar-chart';
// import { useSelector } from 'react-redux';
// import 'react-svg-radar-chart/build/css/index.css'
 
// const SpiderGraph = () => {
//     const { taste } = useSelector((state) => state.user);
    
//     const data = [
//         {
//             data: {
//                 acousticness: .5,
//                 danceability: .6,
//                 duration_ms: .6,
//                 energy: .2,
//                 instrumentalness: .1,
//                 key: .8,
//                 liveness: 1.0,
//                 loudness: .3,
//                 mode: .2,
//                 speechiness: .3,
//                 tempo: .7,
//                 time_signature: .4,
//                 valence: .1,
//             },
//             meta: { color: 'blue' },
//         },
//     ]

//     console.log(data);
//     console.log(taste);

//     const captions = {
//         danceability: "Danceability",
//         energy: "Energy",
//         key: "Key",
//         loudness: "Loudness",
//         mode: "Mode",
//         speechiness: "Speechiness",
//         acousticness: "Acousticness",
//         instrumentalness: "Instrumentalness",
//         liveness: "Liveness",
//         valence: "Valence",
//         tempo: "Tempo",
//         duration_ms: "Duration (ms)",
//         time_signature: "Time Signature"
//     };


//     return (
//         <div>
//         <RadarChart
//             captions={captions}
//             data={data}
//             size={400}
//             scales={10}
//         />
//         </div>
//     );
// }
 
// export default SpiderGraph;
 

// // const data = [
// //     {
// //       data: {
// //         battery: 0.7,
// //         design: .8,
// //         useful: 0.9,
// //         speed: 0.67,
// //         weight: 0.8
// //       },
// //       meta: { color: 'blue' }
// //     },
// //     {
// //       data: {
// //         battery: 0.6,
// //         design: .85,
// //         useful: 0.5,
// //         speed: 0.6,
// //         weight: 0.7
// //       },
// //       meta: { color: 'red' }
// //     }
// //   ];

// //   const captions = {
// //     // columns
// //     battery: 'Battery Capacity',
// //     design: 'Design',
// //     useful: 'Usefulness',
// //     speed: 'Speed',
// //     weight: 'Weight'
// //   };