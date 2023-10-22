let control_nav = function() {

    let user = getCookie('user')
    let message_element = $('#message')
    if(message_element) {
        if(user) {
            message_element.show()
        } else {
            message_element.hide()
        }
    }

    let login_element = $('#login')
    let logout_element = $('#logout')

    if(user) {
        login_element.hide()
        logout_element.show()
    }
    else {
        login_element.show()
        logout_element.hide()
    }
}

let getCookie = function(name) {
    let user_name = false
    document.cookie.split(';').forEach((val) => {
        let cookie = val.split('=')

        if(cookie[0].trim() == name) {
            user_name = cookie[1]
        }
    })
    return user_name
}

let setCookie = function(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

let eraseCookie = function(name) {
    let user = getCookie('user')

    if(user) {
        document.cookie = name+'=; Max-Age=-99999999;';  
    }
}