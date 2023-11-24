const mainContentAndNavWidthSetter = (param) => {
    const mainContent = document.querySelector('#main-content')
    const sideLeft = document.querySelector('#side-left')
    const sideRight = document.querySelector('#side-right')
    const navbar = document.querySelector('#navbar')

    mainContent.style.width = document.body.clientWidth - sideLeft.clientWidth - sideRight.clientWidth + 'px'
    if (param) {
        navbar.style.width = document.body.clientWidth - sideLeft.clientWidth - sideRight.clientWidth - param + 'px'
    } else {
        navbar.style.width = document.body.clientWidth - sideLeft.clientWidth - sideRight.clientWidth - 8 + 'px'
    }
}

export default mainContentAndNavWidthSetter