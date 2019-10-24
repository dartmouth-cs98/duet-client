# Duet Client

We're using React Slingshot as a starterpack. Read about it [here](https://github.com/coryhouse/react-slingshot) or look in `docs/FAQ.md`.

## Getting Setup on your Local Machine
1. **Initial Machine Setup**

    [Initial Machine Setup](#initial-machine-setup).

2. **Clone this repo**

## Explanation of File Structure
1. **Actions**
    This is where we'll put our Redux actions. If you don't know what that is, we'll all know very soon!
2. **Components**
    This is where we'll put our React Components.  Components create a a place of the view. They render DOM elements and put content on the screen. 
3. **Containers**
    The containers participate in the data elaboration. They "talk" with Redux, because they will need to modify the state. So, we should include connect (react-redux) which makes the connection and the functions mapStateToProps and mapDispatchToProps.
4. **Constants**
    This is where we can keep constant variables that are used throughout the codebase. It's nice to have them in one place.
5. **Reducers**
    This is where we'll keep our Redux reducers. 
6. **Store**
    This is where we'll keep our stores for Redux. Shouldn't have to do much more here!
7. **Styles**
    This is where we'll keep our .sass files which are a fancier version of CSS. If you've ever worked with CSS, you'll pick up .sass in a second. I think it'd be nice instead of having one style file with everything we break up style sheets by component.
8. **types**
    If we end up wanting to create our own types, we can put them here.
9. **utils**
    This is where we can put utility functions.
10. **tools**
    We don't need to worry about this. It came with the starter pack.

## To run locally
Run `npm start` and a window in your browser should open up. If not, navigate to `localhost:3000`.