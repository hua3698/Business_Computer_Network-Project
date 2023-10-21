$(function() {
    let init = function () {
        const queryString = window.location.search;
    
        if(queryString) {
            let action = queryString.split('?')[1].split('=')[1];

            switch (action) {
                case 'create':
                    alert('帳號建立成功，請立即登入')
                    break;
            
                case 'fail':
                    alert('帳號密碼錯誤，請重新登入')
                    break;
            
                case 'message':
                    alert('請先登入後再開始留言')
                    break;
            
                default:
                    break;
            }
        }
    }

    let event = function () {
        $('#btnSubmit').on('click', function() {
            let user = $('#user').val()
            let password = $('#psw').val()

            if(!user || !password) {
                alert('請輸入帳號密碼')
                return
            }

            let data = {}
            data.user = user
            data.password = password

            $.post('api/login.php', data, function(result){
                
                if(result == 'success') {
                    setCookie('user', user, 1)

                    location.href = 'chatting-board.html?action=success'
                }
                else {
                    location.href = 'login.html?action=fail'

                }
            });
        })


    }

    init()
    event()
})