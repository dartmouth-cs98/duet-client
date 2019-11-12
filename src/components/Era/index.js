/* eslint-disable react/prop-types */
import React from 'react';


const Trendex = ({ decade, name }) => {
    const truncatedDecade = decade ? decade.toString().slice(-2) : 10;

    const returnExamples = (decade) => {
        switch(decade){
            case 2010:
                return ["Ariana Grande", "Billie Eilish"]
            case 2000:
                return ["Eminem", "Britney Spears"]
            case 1990:
                return ["Backstreet Boys", "Madonna"]
            case 1980:
                return ["Michael Jackson", "Billy Joel"]
            case 1970:
                return ["Pink Floyd", "Led Zeppelin"]
            case 1960:
                    return ["Beatles", "Rolling Stones"]
            default:
                return ["really old songs", "obscure stuff"]
        }
    }
    
    return (
        <div className="Era">
            <h2>Born in the wrong era?</h2>
            <div className="Era-info">
                <div className="Era-decade">
                <h3 className="Era-number">{`${truncatedDecade}s`}</h3>
                </div>
                <p className="EraDescript"> According to {name ? "their" : "your"} music taste, {name ? `${name} was` : "you were"} born in the {decade}s. This means most of {name ? "their" : "your"} top songs were released between {decade} and {decade+9}, so maybe {name ? "they" : "you"} listen to lots of {returnExamples(decade)[0]} and {returnExamples(decade)[1]}. So were {name ? "they" : "you"} born in the wrong era? Probably not. Most people listen to mostly recent songs, so even if you think of yourself as a big oldies guy you are probably stuck in this decade of music just like everybody else.
                </p>
            </div>
        </div>
    );
};

export default Trendex;