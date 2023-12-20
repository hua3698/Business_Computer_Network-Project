$(function() {
    let init = function () {
        // const queryString = window.location.search;
    
        // if(queryString) {
        //     let action = queryString.split('?')[1].split('=')[1];

        //     switch (action) {
        //         case 'create':
        //             alert('帳號建立成功，請立即登入')
        //             break;
            

        //         case 'message':
        //             alert('請先登入後再開始留言')
        //             break;
            
        //         default:
        //             break;
        //     }
        // }
    }

    let event = function () {

        $('#psw').keypress(function (e) {
            let key = e.which
            if(key == 13)  // the enter key code
             {
               $('#btnSubmit').click();
               return false;  
             }
        });   

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

                    alert('登入成功，歡迎斗內')

                    location.href = 'chatting-board.html'
                }
                else {

                    alert('帳號密碼錯誤，請不要亂輸入喔')

                    // location.href = 'login.html'

                }
            });
        })


    }

    init()
    event()
})