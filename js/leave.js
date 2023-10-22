$(function() {
    let init = function () {
        check_login()

        const queryString = window.location.search;
    
        if(queryString) {
            let action = queryString.split('?')[1].split('=')[1];

            switch (action) {
                case 'fail':
                    alert('系統錯誤，請重新輸入')
                    break;

                default:
                    break;
            }
        }
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

            $.post('api/create_message.php', data, function(result) {
                if(result == 'success') {
                    location.href = 'chatting-board.html?action=create'
                }
                else {
                    location.href = 'leave-chatting.html?action=fail'

                }
            });
        })

    }

    init()
    control_nav()
    event()
})