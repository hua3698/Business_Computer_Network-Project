$(function() {
    let init = function () {
        const queryString = window.location.search;
    
        if(queryString) {
            let action = queryString.split('?')[1].split('=')[1];

            switch (action) {
                case 'success':
                    alert('登入成功')
                    break;

                default:
                    break;
            }
        }
    }

    let card_template = function () {
        
    }

    let get_card = function () {

        $.get('api/get_card.php', function(data){

            let result = JSON.parse(data)

            let card = $('.post')
            $('#board').empty()

            result.forEach(row => {
                console.log(row)
                let template = card.clone()
                
                $(template).find('.card-title').html(row.title)
                $(template).find('.card-text').html(row.content)
                $(template).find('.card-owner').html(row.name)
                $(template).find('.card-time').html(row.date)

                $('#board').append(template)
            });
        });
    }

    init()
    control_nav()
    get_card()
})