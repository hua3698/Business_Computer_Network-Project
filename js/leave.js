$(function() {
    let init = function () {
        check_login()

        // const queryString = window.location.search;
    
        // if(queryString) {
        //     let action = queryString.split('?')[1].split('=')[1];

        //     switch (action) {
        //         case 'fail':
        //             alert('系統錯誤，請重新輸入')
        //             break;

        //         default:
        //             break;
        //     }
        // }
    }

    let check_login = function () {
        let user = getCookie('user')
        console.log(user)
        if(!user) {
            alert('請先登入後再開始留言')

            location.href = 'login.html'
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
                    alert('留言新增成功')

                    location.href = 'chatting-board.html'
                }
                else {
                    alert('系統錯誤，不要問我為什麼，也不要問我從哪來')

                    location.href = 'leave-chatting.html'

                }
            });
        })

    }

    init()
    control_nav()
    event()
})