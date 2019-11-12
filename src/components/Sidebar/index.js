import React, { useState } from 'react';
import SearchField from 'react-search-field';

const Sidebar = () => {

  const [selectedButton, setSelectedButton] = useState("profile")
  const [showPopup, setShowPopup] = useState(false)
  const [searchResults, setSearchResults] = useState(["Kevin", "Becky"])


  const onButtonPress = (e) => {
    setSelectedButton(e.currentTarget.id)
  }

  const onFriendPress = (e) => {
    var activeFriends = document.getElementsByClassName("activeFriend");
    while (activeFriends.length)
        activeFriends[0].classList.remove("activeFriend");
    e.target.classList.add('activeFriend');
  }

  // const onGroupPress = (e) => {
  //   var activeGroups = document.getElementsByClassName("activeGroup");
  //   while (activeGroups.length)
  //       activeGroups[0].classList.remove("activeGroup");
  //   e.target.classList.add('activeGroup');
  // }

  const openPopup = () => {
    setShowPopup(true)
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  const search = () => {
    setSearchResults(["Kevin", "Becky"])
  }

  const addFriend = () => {

  }

  const logout = () => {

  }

  return (
    <div className="Sidebar">
      <a className="DuetLogo" href="/">
        <svg id="duetlogo" width="250" height="250" viewBox="0 0 250 153" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M51.4107 142.329C46.395 148.763 38.558 152.215 29.7806 152.215C13.1661 152.215 0.783691 139.191 0.783691 121.772C0.783691 104.354 13.1661 91.3292 29.6238 91.3292C38.4012 91.3292 46.0815 95.0954 51.2539 101.215V4.23694C51.2539 3.45232 51.5674 2.66771 51.8809 2.04002C52.8213 0.784631 54.3887 0.470785 55.9561 0.941554L98.9028 15.5354C100.627 16.32 101.254 18.36 100.313 20.0862C99.5298 21.8123 97.4922 22.44 95.768 21.4985L58.4639 9.72925V121.772C58.4639 130.717 55.9561 136.366 51.4107 142.329ZM51.4107 121.772C51.4107 108.434 42.0063 98.3908 29.7806 98.3908C17.5549 98.3908 7.99372 108.434 7.99372 121.772C7.99372 134.954 17.3981 144.997 29.6238 144.997C41.8495 144.997 51.4107 134.954 51.4107 121.772Z" fill="#FEEBDB"/><path d="M118.339 144.526C113.793 149.234 107.524 152.215 100.47 152.215C93.417 152.215 87.3042 149.391 82.9155 144.369C78.6835 139.662 76.3324 133.071 76.3324 126.009V94.6246C76.3324 92.7415 77.8998 91.1723 79.9374 91.1723C81.975 91.1723 83.5424 92.7415 83.5424 94.6246V126.009C83.5424 136.994 90.5957 144.84 100.47 144.84C110.502 144.84 118.339 136.523 118.339 126.009V125.538C118.339 125.382 118.339 125.382 118.339 125.225V94.7815C118.339 92.8984 119.906 91.3292 121.944 91.3292C123.981 91.3292 125.549 92.8984 125.549 94.7815V125.695C125.549 132.914 122.414 140.289 118.339 144.526Z" fill="#FEEBDB"/><path d="M172.571 152.215C156.113 152.215 143.731 139.034 143.731 121.772C143.731 113.455 146.395 105.923 151.411 100.274C156.583 94.4677 163.95 91.1723 171.944 91.1723C188.088 91.1723 199.687 103.883 199.687 121.615C199.687 123.498 198.119 125.225 196.082 125.225H151.097C152.665 136.68 161.442 144.84 172.571 144.84C180.094 144.84 186.834 141.231 190.596 134.64C191.693 132.914 193.887 132.443 195.611 133.542C197.336 134.64 197.806 136.837 196.865 138.563C191.536 147.351 182.759 152.215 172.571 152.215ZM151.097 118.163H192.32C190.909 106.394 183.072 98.3907 171.944 98.3907C160.815 98.3907 152.665 106.551 151.097 118.163Z" fill="#FEEBDB"/><path d="M247.962 142.015C249.53 143.271 249.687 145.468 248.433 147.037C245.611 150.332 241.536 152.058 237.304 152.058C229.154 152.058 222.571 145.468 222.571 137.465V98.3907H219.279C217.398 98.3907 215.831 96.8215 215.831 94.7815C215.831 92.8984 217.398 91.3292 219.279 91.3292H222.571V79.8738C222.571 77.8338 224.295 76.2646 226.176 76.2646C228.213 76.2646 229.781 77.8338 229.781 79.8738V91.3292H242.477C244.514 91.3292 246.082 92.8984 246.082 94.7815C246.082 96.8215 244.514 98.3907 242.477 98.3907H229.781V137.778C229.781 141.858 233.229 145.154 237.304 145.154C239.499 145.154 241.536 144.212 242.79 142.486C244.201 140.917 246.395 140.76 247.962 142.015Z" fill="#FEEBDB"/><line x1="10" x2="240" y1="180" y2="180" stroke="#E5277B" strokeWidth="6" strokeLinecap="round"/></svg>
      </a>

      <div className="ButtonGroup">
        <a className={["SidebarButton", selectedButton == "profile" ? 'active' : ''].join(' ')} id="profile" onClick={onButtonPress}>
          <img className="icon" src={selectedButton == "profile" ? '../images/profile-active.svg' : '../images/profile.svg'}/>
        </a>
        <a className={["SidebarButton", selectedButton == "friend" ? 'active' : ''].join(' ')} id="friend" onClick={onButtonPress}>
          <img className="icon" src={selectedButton == "friend" ? '../images/friend-active.svg' : '../images/friend.svg'}/>
        </a>
        { selectedButton == "friend"
              ? (
                  <div className="FriendMenu">
                      <div className="border"></div>
                      { showPopup ? 
                        null
                        : 
                        <div>
                          <div className="TopBar">
                            <p>Friends</p>
                            <a className="addButton" onClick={openPopup}>+ add friend </a>
                          </div>
                          <div className="MenuLinkGroup">
                              <a onClick={onFriendPress}> Emma </a>
                              <a onClick={onFriendPress}> Zac </a>
                              <a onClick={onFriendPress}> Linford </a>
                              <a onClick={onFriendPress}> Ally </a>
                              <a onClick={onFriendPress}> Himadri </a>
                          </div>
                      </div>
                      }
                      { showPopup ? 
                        <div className="SearchBox">
                          <div className="TopBar">
                            <SearchField
                              placeholder='Search item'
                              onSearchClick={search}
                              onEnter={search}
                            /> 
                            <button onClick={closePopup}>x</button> 
                          </div>
                          <div className="results">
                          {searchResults.map(item => (
                            <a key={item} onClick={addFriend}>{item}</a>
                          ))}
                          </div>
                        </div>
                        : null
                      }
                  </div>
              )
              : (
                  null
              )
          }
        <a className={["SidebarButton", selectedButton == "group" ? 'active' : ''].join(' ')} id="group" /*onClick={onButtonPress}*/>
          <img className="icon" src={selectedButton == "group" ? '../images/group-active.svg' : '../images/group.svg'}/>
          <div id="stayTuned">Stay Tuned!</div>
        </a>
        {/* {selectedButton == "group"
              ? (
                  <div className="GroupMenu">
                      <div className="border"></div>
                      <p>Groups</p>
                      <div className="MenuLinkGroup">
                          <a onClick={onGroupPress}> Dartmouth </a>
                          <a onClick={onGroupPress}> Club Swim </a>
                          <a onClick={onGroupPress}> Taco Lovers of America Wow</a>
                      </div>
                      <a className="addButton">+ add friend </a>
                  </div>
              )
              : (
                  null
              )
          } */}
      </div>

      <div className="LinkGroup">
          <a href="/">home</a>
          <a href="/#about">about</a>
          <a onClick={logout} href="/">logout</a>
      </div>
    </div>
  )
}

export default Sidebar;
