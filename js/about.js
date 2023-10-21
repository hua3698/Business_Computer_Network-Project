$(function() {

    let init = function () {
        const queryString = window.location.search;
    
        if(queryString) {
            let action = queryString.split('?')[1].split('=')[1];

            // switch (action) {
            //     case 'logout':
            //         eraseCookie('user')
            //         alert('已登出')
            //         break;
            
            //     case '':
            //         break;
            
            //     default:
            //         break;
            // }
        }
    }

    init()
    control_nav()
})