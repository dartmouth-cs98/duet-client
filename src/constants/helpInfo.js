

export const TopArtistsDescription = {
    PAGE_NAME: "Top Artists",
    PAGE_INFO: "Spotify stores a top 50 artists for all users. Duet then accesses each user's top 50 artists and displays them. In the case of a group's top artists, we keep a count of how many users in a group share top artists and display the artists with the most overlap within the group. If you and a friend or a group have any artists in common from your top 50, duet shows you your top common artists!",
}

export const TrendexDescription = {
    PAGE_NAME: "Trendex",
    PAGE_INFO: "Fret not, your duet trendex is not a holistic arbitrator of how trendy you are. For every user, Spotify stores your top 50 songs. Each song has a popularity index so in order to find each user's trendex, we average all the popularity indexes of the group's top songs. We calculate a group's trendex by taking the average of the trendexes of all users in the group.",
}

export const TopGenresDescription = {
    PAGE_NAME: "Top Genres",
    PAGE_INFO: "Here, duet shows you the top genres of your top 50 songs. Each song hosted on Spotify contains a list of multiple genres which it falls under. The duet team then worked through all the genres which Spotify uses to categorize songs in order to flatten our genre space into broader, more recognizable genres and display them. For a group, we aggregate counts for each user in the group's top genres and display the group's top genres.",
}

export const MusicalAttrDescription = {
    PAGE_NAME: "Taste",
    PAGE_INFO: "In your duet, we also want to show you how your music compares to a friend's or a group's in terms of broader attributes. Each song on Spotify has a value for attributes such as mode, acousticness, danceability, and energy. Duet then averages among an individual's top songs in order to plot their attribute value. When you join a group, your attribute values are added to the group's average attribute values!",
}

export const DecadesDescription = {
    PAGE_NAME: "Decades",
    PAGE_INFO: "This one is pretty straightforward. Each song on Spotify has a year in which it was released. For each user, we plot the years of your top songs on a bar graph. For groups, we keep counts for songs in each decade and whenver a user joins a group, their counts are added. Duet then plots the group's counts to scale by scaling by the number of people in the group.",
}

export const BlenderDescription = {
    PAGE_NAME: "Music Taste Mixer",
    PAGE_INFO: "Congrats! You've made it to our music taste mixer. Are you intrigued by your friend or a group's music taste and want to explore it or create the perfect playlists for you two? First, you can decide whose tastes you want to include in your playlist - you can include your own taste, your parter in your duet's taste, or both your tastes. Our music taste mixer then seeds a playlist with your selection's top artists and songs. It then allows you to select attributes which you would like to highlight in the songs which are added to your playlist. We then use our recommendation engine to generate songs from artists you would both enjoy with the attributes you select.",
}

