$(function () {

    let init = function () {
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

    let event = function () {
        $('#btnCreate').on('click', function() {
            let user = $('#user').val()
            let password = $('#psw').val()

            if(!user || !password) {
                alert('請輸入帳號密碼')
                return
            }

            let data = {}
            data.user = user
            data.password = password

            $.post('api/create.php', data, function(result) {
                console.log(result)
                if(result == 'success') {
                    location.href = 'login.html?action=create'
                }
                else {
                    location.href = 'register.html?action=fail'
                }
            });
        })


    }

    init()
    event()

})