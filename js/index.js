$(function() {

    let init = function () {
        // const queryString = window.location.search;
    
        // if(queryString) {
        //     let action = queryString.split('?')[1].split('=')[1];

        //     switch (action) {
        //         case 'logout':
        //             eraseCookie('user')
        //             alert('已登出')
        //             break;
            
        //         case '':
        //             break;
            
        //         default:
        //             break;
        //     }
        // }
    }

    let check_login = function() {

        if(getCookie('user')) {
            $('#login_block').removeClass("d-sm-flex").addClass("d-none");
        } else {
            $('#login_block').removeClass("d-none").addClass("d-sm-flex");
        }

        control_nav()
    }

    init()
    check_login()
})