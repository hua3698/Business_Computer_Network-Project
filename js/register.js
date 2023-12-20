$(function () {

    let init = function () {
        // const queryString = window.location.search;
    
        // if(queryString) {
        //     let action = queryString.split('?')[1].split('=')[1];

        //     switch (action) {
        //         case 'fail':
        //             alert('系統錯誤，請重新輸入')
        //             break;

        //         case 'exist':
        //             alert('帳號已存在')
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
               $('#btnCreate').click();
               return false;  
             }
        });   

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
                    alert('帳號建立成功! 請享用')

                    location.href = 'login.html'
                }
                else if(result == 'exist') {
                    alert('帳號已存在，是不是該吃銀杏了')

                    // location.href = 'register.html'
                }
                else {
                    alert('系統錯誤，不要問我為什麼')

                    // location.href = 'register.html'
                }
            });
        })


    }

    init()
    event()

})