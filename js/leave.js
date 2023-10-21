$(function() {
    let init = function () {
        check_login()
    }

    let check_login = function () {
        let user = getCookie('user')
        console.log(user)
        if(!user) {
            location.href = 'login.html?action=message'
        }
    }

    let event = function () {
        $('#submitButton').on('click', function() {
            let name = $('#name').val()
            let title = $('#title').val()
            let content = $('#textarea').val()

            let data = {}
            data.cookie = getCookie('user')
            data.name = name
            data.title = title
            data.content = content

            $.post('api/create_message.php', data, function(result){
                console.log(result)
                // if(result == 'success') {
                //     setCookie('user', user, 1)

                //     location.href = 'chatting-board.html?action=success'
                // }
                // else {
                //     location.href = 'login.html?action=fail'

                // }
            });
        })

    }

    init()
    control_nav()
    event()
})