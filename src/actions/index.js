/* eslint-disable no-console */
import * as types from '../constants/actionTypes';
import SpotifyWebApi from 'spotify-web-api-js';
import { getCurrentUserProfile, getTrackInfos, getAvgTaste, getGenreCount } from '../utils/spotifyUtils';
import { getUser } from '../utils/backendUtils';

export const fetchMeData = (token, time_range) => {
    return (dispatch) => {
        dispatch({ type: types.STORE_TOKEN, token })

        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token);

        const userProfilePromise = getCurrentUserProfile(token)
        const topTracksPromise = spotifyApi.getMyTopTracks({limit: 50, time_range}) 
        const topArtistsPromise = spotifyApi.getMyTopArtists({limit: 50, time_range})
   
        Promise.all([userProfilePromise, topTracksPromise, topArtistsPromise]).then(function([userProfile, topTracks, topArtists]) {   
            let user = {};

            const { display_name, id } = userProfile.data;
            const { trackIds, popularity, decade } = getTrackInfos(topTracks.items) ;
            const audioFeaturesPromise = spotifyApi.getAudioFeaturesForTracks(trackIds);
            const artistNamesAndIds = topArtists.items.map((artist) => ({ name: artist.name, id: artist.id }))
       
            getGenreCount(token, topTracks.items).then((genreCounts) => {
                user = { ...user, genre_counts: genreCounts };
                audioFeaturesPromise.then((tracks) => {
                    const taste = getAvgTaste(tracks.audio_features);
                    user = { display_name, id, decade, trendex: popularity, topArtists:artistNamesAndIds, genre_counts: genreCounts, taste };
                    dispatch({ type: types.FETCH_USER_1, user: user });
                })  
            })
        });
    }
}

export const setCompare = (entity) => {
    return (dispatch) => {
        dispatch({ type: types.SET_COMPARE, compare: entity });
    }
}

export const fetchUser1 = (id) => {
  return (dispatch) => {
    getUser(id).then((user) => {
      console.log(user)
      dispatch({ type: types.FETCH_USER_1, user: user })
    })
  }
}


export const fetchUser2 = (id) => {
  return (dispatch) => {
    getUser(id).then((user) => {
      console.log(user)
      dispatch({ type: types.FETCH_USER_2, user: user })
    })
  }
}

export const queryUsers = () => {
    return [
        {
            display_name: 'Zac Gottschall',
            id: '1245385585',
            decade: 2010,
            trendex: '50.8',
            topArtists: [
              {
                name: 'Bill Evans',
                id: '4jXfFzeP66Zy67HM2mvIIF'
              },
              {
                name: 'Lawrence',
                id: '5rwUYLyUq8gBsVaOUcUxpE'
              },
              {
                name: 'The Beatles',
                id: '3WrFJ7ztbogyGnTHbHJFl2'
              },
              {
                name: 'John Mayer',
                id: '0hEurMDQu99nJRq8pTxO14'
              },
              {
                name: 'Jacob Collier',
                id: '0QWrMNukfcVOmgEU0FEDyD'
              },
              {
                name: 'The Dartmouth Aires',
                id: '71Cez1b1NqsxIn5u8XNiQD'
              },
              {
                name: 'Daniel Caesar',
                id: '20wkVLutqVOYrc0kxFs7rA'
              },
              {
                name: 'Vulfpeck',
                id: '7pXu47GoqSYRajmBCjxdD6'
              },
              {
                name: 'Norah Jones',
                id: '2Kx7MNY7cI1ENniW7vT30N'
              },
              {
                name: 'Frank Ocean',
                id: '2h93pZq0e7k5yf4dywlkpM'
              },
              {
                name: 'Randy Newman',
                id: '3HQyFCFFfJO3KKBlUfZsyW'
              },
              {
                name: 'Tufts Beelzebubs',
                id: '4VsNVAxuPxZrJMWE2Tprtq'
              },
              {
                name: 'Nat King Cole',
                id: '7v4imS0moSyGdXyLgVTIV7'
              },
              {
                name: 'André De Shields',
                id: '0vtjXmCLNmJti4fJ5dBhxc'
              },
              {
                name: 'Roderick Williams',
                id: '3AgfuptJ2ldYrLv5O6lkuJ'
              },
              {
                name: 'Charlie Puth',
                id: '6VuMaDnrHyPL1p4EHjYLi7'
              },
              {
                name: 'ABBA',
                id: '0LcJLqbBmaGUft1e9Mm8HV'
              },
              {
                name: 'Cigarettes After Sex',
                id: '1QAJqy2dA3ihHBFIHRphZj'
              },
              {
                name: 'H.E.R.',
                id: '3Y7RZ31TRPVadSFVy1o8os'
              },
              {
                name: 'Ella Fitzgerald',
                id: '5V0MlUE1Bft0mbLlND7FJz'
              },
              {
                name: 'Beyoncé',
                id: '6vWDO969PvNqNYHIOW5v0m'
              },
              {
                name: 'Idina Menzel',
                id: '73Np75Wv2tju61Eo9Zw4IR'
              },
              {
                name: 'Clyde Lawrence',
                id: '1y2IF2R2mHA7SIAZKbNWx3'
              },
              {
                name: 'Kanye West',
                id: '5K4W6rqBFWDnAN6FQUkS6x'
              },
              {
                name: 'Duke Ellington',
                id: '4F7Q5NV6h5TSwCainz8S5A'
              },
              {
                name: 'James Gilchrist',
                id: '53h0zu3PaL8vYCgCepxdBA'
              },
              {
                name: 'Sabrina Claudio',
                id: '30DhU7BDmF4PH0JVhu8ZRg'
              },
              {
                name: 'Lynne Arriale Trio',
                id: '5aSW8XbsteHFgFPYpp1s3x'
              },
              {
                name: 'Taylor Swift',
                id: '06HL4z0CvFAxyc27GXpf02'
              },
              {
                name: 'Lin-Manuel Miranda',
                id: '4aXXDj9aZnlshx7mzj3W1N'
              },
              {
                name: 'Billie Eilish',
                id: '6qqNVTkY8uBg9cP3Jd7DAH'
              },
              {
                name: 'Barry White',
                id: '3rfgbfpPSfXY40lzRK7Syt'
              },
              {
                name: 'Stephen Sondheim',
                id: '4TbtUt49IMXEIMmNdifHb1'
              },
              {
                name: 'Xav A.',
                id: '64nEXLSpfNPGDEM5ZhrRTg'
              },
              {
                name: 'Ed Sheeran',
                id: '6eUKZXaKkcviH0Ku9w2n3V'
              },
              {
                name: 'Frank Sinatra',
                id: '1Mxqyy3pSjf8kZZL4QVxS0'
              },
              {
                name: 'Kenny Werner',
                id: '0ppaiYSgRlCaCQ028u4k5f'
              },
              {
                name: 'Lenny Kravitz',
                id: '5gznATMVO85ZcLTkE9ULU7'
              },
              {
                name: 'Mac Miller',
                id: '4LLpKhyESsyAXpc4laK94U'
              },
              {
                name: 'Michael Giacchino',
                id: '4kLvhMAuCloLxoP1aVM7Lr'
              },
              {
                name: 'Dartmouth Dodecaphonics',
                id: '7vyQHyJICvNsfju2JdVoMY'
              },
              {
                name: 'Eddie Higgins',
                id: '0W5dlTiXGpQqs0OhqCRE92'
              },
              {
                name: 'Reel Big Fish',
                id: '3bXhZFreBJF4QDUUiMmtZW'
              },
              {
                name: 'Nextlife',
                id: '4dYkprCmloYIbH4XWwHtk7'
              },
              {
                name: 'Eric Whitacre',
                id: '5TWpCLIhvGlbJmLK1zNpiL'
              },
              {
                name: 'hannah hausman',
                id: '5VfSeZYcDwD8WQVwbaoL6z'
              },
              {
                name: 'Himesh Patel',
                id: '7mFiLle487vR83fsFmcKgt'
              },
              {
                name: 'Reeve Carney',
                id: '7qDUWeBzKcDnh15yhYBf2U'
              },
              {
                name: 'Toots Thielemans',
                id: '0KyolDFb1RjJQb4qXZKCqo'
              },
              {
                name: 'Amber Gray',
                id: '14i357yzHOFOHFma68eNJb'
              }
            ],
            genre_counts: [
              [
                'r&b',
                2
              ],
              [
                'disco',
                7
              ],
              [
                'jazz',
                12
              ],
              [
                'folk',
                2
              ],
              [
                'soul',
                2
              ],
              [
                'funk',
                2
              ],
              [
                'rock',
                1
              ],
              [
                'a cappella',
                2
              ],
              [
                'classical',
                3
              ],
              [
                'blues',
                1
              ],
              [
                'pop',
                8
              ],
              [
                'metal',
                1
              ],
              [
                'soundtrack',
                1
              ],
              [
                'country',
                1
              ],
              [
                'broadway',
                1
              ],
              [
                'hip hop',
                1
              ]
            ],
            taste: {
              danceability: 0.5292400000000003,
              energy: 0.375458,
              speechiness: 0.087272,
              acousticness: 0.560952,
              valence: 0.39453999999999995,
            }
          },
          {
            display_name: 'Gac Zottschall',
            id: '1245234q385585',
            decade: 2010,
            trendex: '59.8',
            topArtists: [
              {
                name: 'ABBA',
                id: '0LcJLqbBmaGUft1e9Mm8HV'
              },
              {
                name: 'Cigarettes After Sex',
                id: '1QAJqy2dA3ihHBFIHRphZj'
              },
              {
                name: 'H.E.R.',
                id: '3Y7RZ31TRPVadSFVy1o8os'
              },
              {
                name: 'Ella Fitzgerald',
                id: '5V0MlUE1Bft0mbLlND7FJz'
              },
              {
                name: 'Beyoncé',
                id: '6vWDO969PvNqNYHIOW5v0m'
              },
              {
                name: 'Idina Menzel',
                id: '73Np75Wv2tju61Eo9Zw4IR'
              },
              {
                name: 'Clyde Lawrence',
                id: '1y2IF2R2mHA7SIAZKbNWx3'
              },
              {
                name: 'Kanye West',
                id: '5K4W6rqBFWDnAN6FQUkS6x'
              },
              {
                name: 'Duke Ellington',
                id: '4F7Q5NV6h5TSwCainz8S5A'
              },
              {
                name: 'James Gilchrist',
                id: '53h0zu3PaL8vYCgCepxdBA'
              },
              {
                name: 'Sabrina Claudio',
                id: '30DhU7BDmF4PH0JVhu8ZRg'
              },
              {
                name: 'Lynne Arriale Trio',
                id: '5aSW8XbsteHFgFPYpp1s3x'
              },
              {
                name: 'Taylor Swift',
                id: '06HL4z0CvFAxyc27GXpf02'
              },
              {
                name: 'Lin-Manuel Miranda',
                id: '4aXXDj9aZnlshx7mzj3W1N'
              },
              {
                name: 'Billie Eilish',
                id: '6qqNVTkY8uBg9cP3Jd7DAH'
              },
              {
                name: 'Barry White',
                id: '3rfgbfpPSfXY40lzRK7Syt'
              },
              {
                name: 'Stephen Sondheim',
                id: '4TbtUt49IMXEIMmNdifHb1'
              },
              {
                name: 'Xav A.',
                id: '64nEXLSpfNPGDEM5ZhrRTg'
              },
              {
                name: 'Ed Sheeran',
                id: '6eUKZXaKkcviH0Ku9w2n3V'
              },
              {
                name: 'Frank Sinatra',
                id: '1Mxqyy3pSjf8kZZL4QVxS0'
              },
              {
                name: 'Kenny Werner',
                id: '0ppaiYSgRlCaCQ028u4k5f'
              },
              {
                name: 'Lenny Kravitz',
                id: '5gznATMVO85ZcLTkE9ULU7'
              },
              {
                name: 'Mac Miller',
                id: '4LLpKhyESsyAXpc4laK94U'
              },
              {
                name: 'Michael Giacchino',
                id: '4kLvhMAuCloLxoP1aVM7Lr'
              },
              {
                name: 'Dartmouth Dodecaphonics',
                id: '7vyQHyJICvNsfju2JdVoMY'
              },
              {
                name: 'Eddie Higgins',
                id: '0W5dlTiXGpQqs0OhqCRE92'
              },
              {
                name: 'Reel Big Fish',
                id: '3bXhZFreBJF4QDUUiMmtZW'
              },
              {
                name: 'Nextlife',
                id: '4dYkprCmloYIbH4XWwHtk7'
              },
              {
                name: 'Eric Whitacre',
                id: '5TWpCLIhvGlbJmLK1zNpiL'
              },
              {
                name: 'hannah hausman',
                id: '5VfSeZYcDwD8WQVwbaoL6z'
              },
              {
                name: 'Himesh Patel',
                id: '7mFiLle487vR83fsFmcKgt'
              },
              {
                name: 'Reeve Carney',
                id: '7qDUWeBzKcDnh15yhYBf2U'
              },
              {
                name: 'Toots Thielemans',
                id: '0KyolDFb1RjJQb4qXZKCqo'
              },
              {
                name: 'Amber Gray',
                id: '14i357yzHOFOHFma68eNJb'
              }
            ],
            genre_counts: [
              [
                'r&b',
                2
              ],
              [
                'disco',
                7
              ],
              [
                'jazz',
                12
              ],
              [
                'folk',
                2
              ],
              [
                'soul',
                2
              ],
              [
                'funk',
                2
              ],
              [
                'rock',
                1
              ],
              [
                'a cappella',
                2
              ],
              [
                'classical',
                3
              ],
              [
                'blues',
                1
              ],
              [
                'pop',
                8
              ],
              [
                'metal',
                1
              ],
              [
                'soundtrack',
                1
              ],
              [
                'country',
                1
              ],
              [
                'broadway',
                1
              ],
              [
                'hip hop',
                1
              ]
            ],
            taste: {
              danceability: 0.5292400000000003,
              energy: 0.375458,
              speechiness: 0.087272,
              acousticness: 0.560952,
              valence: 0.39453999999999995,
            }
          }
    ]
}