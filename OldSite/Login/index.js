import React from "react";
import ReactRouterPropTypes from 'react-router-prop-types';
import { fetchUserData } from '../../actions';
import { useDispatch } from 'react-redux';
import { getToken } from '../../utils/tokenUtils';

const Login = ({ history }) => {

  const dispatch = useDispatch();
  const token = getToken();
  
  const handleLogin = () => { 
    if (token)  {
      dispatch(fetchUserData(token, "medium_term"));
      history.push('/dashboard/me');  
    }
    else {
      window.open(process.env.AUTH_SERVER_URL, "_self");
    }
  }

  return (
    <div>
      <div className="LoginPage">
        <div className="Squigs">
            <svg width="1676" height="1048" viewBox="0 0 1676 1048" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M559.819 252.778C533.137 255.173 503.992 261.475 482.708 278.889C470.455 288.914 463.265 306.321 463.152 322C463.063 334.456 468.052 343.754 471.93 355.111C475.502 365.571 471.933 372.537 465.485 381C454.54 395.366 441.67 407.816 428.93 420.556C418.616 430.87 405.57 441.742 400.041 455.667C393.007 473.381 400.191 494.585 406.374 511.333C414.037 532.086 425.161 549.518 437.374 567.778C445.839 580.432 452.762 593.702 443.374 607.667C434.52 620.838 423.445 628.549 421.374 645.444C418.169 671.597 429.98 696.725 446.485 716.444C474.74 750.199 513.575 771.419 556.041 781.667C592.631 790.496 631.524 793.753 669.041 795.333C694.052 796.387 719.444 794.773 743.374 786.889C778.666 775.261 802.173 746.624 831.93 726.222C862.008 705.6 894.407 704.627 928.874 714.278C972.752 726.564 1013.92 748.607 1055.54 766.778C1093.98 783.563 1131.61 795.556 1173.76 798.111C1212.73 800.473 1254.1 794.855 1286.26 771C1312.41 751.609 1324.28 719.275 1320.82 687.389C1317.38 655.695 1298.3 627.589 1285.71 598.944C1272.47 568.814 1255.8 542.128 1236.37 515.611C1220.84 494.399 1204.11 472.631 1194.82 447.778C1186.11 424.476 1187.71 402.51 1191.6 378.444C1195.38 355.02 1196.71 328.805 1184.37 307.556C1168.89 280.867 1136.62 265.82 1109.04 255.444C1072.51 241.7 1035.47 235.617 996.708 232.833C959.675 230.174 922.84 227.109 885.708 225.889C847.403 224.63 808.315 226.041 770.541 218.556C728.845 210.293 692.573 189.059 652.874 175.111C630.706 167.322 603.2 158.998 579.652 165.667C561.795 170.724 548.83 183.849 534.152 194.333" stroke="#212034" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M342.152 286.333C323.995 298.799 304.613 308.848 287.208 322.556C253.949 348.747 229.071 391.251 234.93 435.111C242.985 495.406 299.599 523.664 343.597 556.167C364.467 571.584 400.563 597.362 393.097 628.333C390.782 637.934 384.665 646.46 378.985 654.333C370.232 666.469 360.297 677.709 350.374 688.889C331.695 709.935 316.415 728.937 317.374 758.556C319.808 833.72 403.102 862.382 466.374 866.111C510.768 868.728 555.117 868.325 599.43 872.944C644.165 877.608 688.873 883.873 733.43 890C754.338 892.875 775.798 896.121 795.93 902.667C816.25 909.273 835.078 919.516 852.652 931.556C870.428 943.733 887.219 957.393 906.041 968C923.811 978.014 943.407 985.235 963.374 989.333C1006.19 998.12 1049.76 986.045 1089.04 969.222C1114.4 958.363 1139.38 946.635 1165.04 936.5C1187.95 927.452 1211.09 919.011 1233.71 909.222C1253.26 900.757 1271.25 890.431 1287.93 877.111C1300.55 867.029 1312.48 856.329 1325.71 847C1339.81 837.051 1356.54 830.012 1368.49 817.333C1386.59 798.111 1402.79 776.195 1417.26 754.167C1433.42 729.569 1448.1 702.987 1436.54 673.556C1423.13 639.415 1401.42 608.571 1393.93 572.167C1387.79 542.322 1396.34 510.607 1407.93 483.111C1418.45 458.144 1433.59 436.928 1447.04 413.667C1458.45 393.94 1459.04 374.606 1447.04 355.111C1438.15 340.674 1425.96 328.959 1413.32 317.833C1395.77 302.387 1377.16 288.493 1357.71 275.556C1320.82 251.024 1281.53 232.055 1241.93 212.444C1218.03 200.608 1193.28 190.022 1167.43 183.278C1124.98 172.203 1081.61 164.451 1038.99 153.944C1007.73 146.24 975.813 136.576 943.819 132.5C905.108 127.569 865.966 127.906 827.041 126.722C757.309 124.602 681.93 123.035 616.597 95.3333C603.336 89.7107 592.325 84.0022 577.708 81.8889C552.132 78.1912 525.971 76.2896 500.152 75.3333" stroke="#212034" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M171.152 119.333C156.154 121.511 142.167 123.839 128.319 130.278C112.086 137.826 99.0797 148.639 85.7079 160.333C59.8973 182.907 30.8464 205.823 15.3745 237.222C-3.96987 276.48 -2.82533 323.916 13.0412 364.111C21.4201 385.338 34.2924 404.113 48.7634 421.611C61.6568 437.201 76.9456 450.875 89.0412 467.111C126.63 517.568 82.6712 580.751 84.3745 636.111C86.3761 701.162 128.794 765.62 183.708 798.722C228.226 825.558 279.013 838.9 325.541 861.5C333.974 865.596 345.302 870.472 350.263 879.111C353.123 884.091 352.034 890.832 352.263 896.278C353.435 924.094 367.284 943.686 392.041 956.333C417.547 969.363 446.019 977.441 473.597 984.667C509.861 994.168 546.842 1000.66 583.652 1007.61C672.591 1024.41 761.749 1038.39 852.208 1043.61C915.086 1047.24 978.145 1046.33 1041.1 1046.33C1083.2 1046.33 1125.45 1047.35 1167.54 1046.17C1189.11 1045.56 1211.07 1043.37 1231.6 1036.33C1258.1 1027.25 1284 1008 1310 992C1332.93 979.863 1358.31 971.456 1377.41 968.728C1396.5 966 1430.5 983 1471 980.5C1511.5 978 1536.83 971.17 1563.5 944.5C1580.01 927.986 1595 895 1591 878.5C1587 862 1564.73 837 1572.62 805.147C1576.99 787.515 1580.35 769.816 1586.9 752.798C1594.47 733.1 1604.43 714.417 1613.74 695.5C1632.52 657.337 1664.94 637.639 1671.89 595.897C1676.08 570.784 1674.83 551.301 1662.38 528.891C1654.33 514.411 1641.36 502.954 1632.58 488.725C1623.78 474.452 1614.09 457.594 1611.84 440.755C1608.84 418.349 1610.91 394.239 1611.07 371.655C1611.21 353.307 1611.71 334.01 1613.74 315.785C1617.5 281.904 1624.51 248.142 1612.79 214.99C1603.57 188.922 1590.1 163.422 1572.43 142.082C1553.55 119.284 1536 111.5 1503.81 104.106C1471.61 96.7116 1433.49 93.8216 1393 104.106C1373.21 109.132 1348 115.5 1330 125C1312 134.5 1295.44 137.058 1273.5 134.5C1208.33 120.836 1143.36 110.432 1077.93 98.1111C1034.91 90.0108 992.51 86.7159 948.93 84.5C914.487 82.7486 879.815 80.2598 845.819 74.2778C800.201 66.2505 755.478 51.5928 711.041 38.7778C620.149 12.5656 523.51 8.73626 429.708 1" stroke="#212034" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="Main">
            <div className="DuetLogo">
                <svg width="250" height="153" viewBox="0 0 250 153" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M51.4107 142.329C46.395 148.763 38.558 152.215 29.7806 152.215C13.1661 152.215 0.783691 139.191 0.783691 121.772C0.783691 104.354 13.1661 91.3292 29.6238 91.3292C38.4012 91.3292 46.0815 95.0954 51.2539 101.215V4.23694C51.2539 3.45232 51.5674 2.66771 51.8809 2.04002C52.8213 0.784631 54.3887 0.470785 55.9561 0.941554L98.9028 15.5354C100.627 16.32 101.254 18.36 100.313 20.0862C99.5298 21.8123 97.4922 22.44 95.768 21.4985L58.4639 9.72925V121.772C58.4639 130.717 55.9561 136.366 51.4107 142.329ZM51.4107 121.772C51.4107 108.434 42.0063 98.3908 29.7806 98.3908C17.5549 98.3908 7.99372 108.434 7.99372 121.772C7.99372 134.954 17.3981 144.997 29.6238 144.997C41.8495 144.997 51.4107 134.954 51.4107 121.772Z" fill="#212034"/><path d="M118.339 144.526C113.793 149.234 107.524 152.215 100.47 152.215C93.417 152.215 87.3042 149.391 82.9155 144.369C78.6835 139.662 76.3324 133.071 76.3324 126.009V94.6246C76.3324 92.7415 77.8998 91.1723 79.9374 91.1723C81.975 91.1723 83.5424 92.7415 83.5424 94.6246V126.009C83.5424 136.994 90.5957 144.84 100.47 144.84C110.502 144.84 118.339 136.523 118.339 126.009V125.538C118.339 125.382 118.339 125.382 118.339 125.225V94.7815C118.339 92.8984 119.906 91.3292 121.944 91.3292C123.981 91.3292 125.549 92.8984 125.549 94.7815V125.695C125.549 132.914 122.414 140.289 118.339 144.526Z" fill="#212034"/><path d="M172.571 152.215C156.113 152.215 143.731 139.034 143.731 121.772C143.731 113.455 146.395 105.923 151.411 100.274C156.583 94.4677 163.95 91.1723 171.944 91.1723C188.088 91.1723 199.687 103.883 199.687 121.615C199.687 123.498 198.119 125.225 196.082 125.225H151.097C152.665 136.68 161.442 144.84 172.571 144.84C180.094 144.84 186.834 141.231 190.596 134.64C191.693 132.914 193.887 132.443 195.611 133.542C197.336 134.64 197.806 136.837 196.865 138.563C191.536 147.351 182.759 152.215 172.571 152.215ZM151.097 118.163H192.32C190.909 106.394 183.072 98.3907 171.944 98.3907C160.815 98.3907 152.665 106.551 151.097 118.163Z" fill="#212034"/><path d="M247.962 142.015C249.53 143.271 249.687 145.468 248.433 147.037C245.611 150.332 241.536 152.058 237.304 152.058C229.154 152.058 222.571 145.468 222.571 137.465V98.3907H219.279C217.398 98.3907 215.831 96.8215 215.831 94.7815C215.831 92.8984 217.398 91.3292 219.279 91.3292H222.571V79.8738C222.571 77.8338 224.295 76.2646 226.176 76.2646C228.213 76.2646 229.781 77.8338 229.781 79.8738V91.3292H242.477C244.514 91.3292 246.082 92.8984 246.082 94.7815C246.082 96.8215 244.514 98.3907 242.477 98.3907H229.781V137.778C229.781 141.858 233.229 145.154 237.304 145.154C239.499 145.154 241.536 144.212 242.79 142.486C244.201 140.917 246.395 140.76 247.962 142.015Z" fill="#212034"/></svg>
            </div>
            <button className="LoginPage-LoginButton" onClick={handleLogin}>
                <h1>{ token ? "go to dashboard" : "log in with spotify" }</h1>
            </button>
            <h1>welcome to duet- we offer things and stuff that make the music pictures with friendos</h1>
        </div>   
        <div className="AboutDuet" id="about">
          <div className="Question" id="WhatIsDuet">
            <h1>what is duet?</h1>
            <h2>duet is web based application that allows users to visually analyze their music taste and directly compare it to their friends and larger groups of people</h2>
          </div>
          <div className="Question" id="HowDuet">
            <h1>how does duet work?</h1>
            <h2>spotify provides a free api that allows users to access information about their music data- from your top 50 artists- to the many attributes of you music (such as key, tempo, etc.)</h2>          </div>
          <div className="Question" id="WhatDoDuet">
            <h1>what does duet store?</h1>
            <h2>duet only stores the information offered by the spotify api</h2>
          </div>
          <div className="Question" id="WhyDuet">
            <h1>why use duet?</h1>
            <h2>sometimes a list of your top genres isn’t enough to categorize the way you listen to music. we believe that being able to visually represent your music taste will help you make discoveries about your music preferences that might not have been apparent- as well as facilitate finding connections between you and your friends</h2>
          </div>
          <div className="Question" id="WhoDuet">
            <h1>who are we?</h1>
            <h2>duet was created by a team of dartmouth undergraduates and Xorgolth- the 2nd prince of the 8th circle of hell</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
}

export default Login;
