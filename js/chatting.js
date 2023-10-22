$(function() {

    let init = function () {
        const queryString = window.location.search;
    
        if(queryString) {
            let action = queryString.split('?')[1].split('=')[1];

            switch (action) {
                case 'success':
                    alert('登入成功')
                    break;

                case 'create':
                    alert('留言新增成功')
                    break;

                default:
                    break;
            }
        }
    }

    let event = function () {
        // $('#board').on('click', '.like-button', function() {
        //     let this_button = $(this)
        //     let add_like = false
        //     if($(this).find('i').hasClass('bi-balloon-heart')) {
        //         add_like = true
        //     }

        //     let card_id = this_button.closest('.card').data('number')

        //     let data = {}
        //     data.card_id = card_id
        //     data.add_like = add_like
        //     data.user = getCookie('user')

        //     $.post('api/like_message.php', data, function(data) {

        //         let result = JSON.parse(data)
        //         this_button.closest('.card').find('.like-count').html(result.count)
        //     })

        //     $(this).find('i').toggleClass('bi-balloon-heart-fill').toggleClass('bi-balloon-heart')

        // })

    }

    let get_card = function () {

        $.get('api/get_card.php', function(data){

            let result = JSON.parse(data)

            let card = $('.post')
            $('#board').empty()

            result.forEach((row, idx) => {
                let template = card.clone()

                let img_url = 'https://picsum.photos/600/350?random=' + (idx+1)
                
                $(template).find('.card').data('number', row.id)
                $(template).find('.card-title').html(row.title)
                $(template).find('.card-text').html(row.content)
                $(template).find('.card-owner').html(row.name)
                $(template).find('.card-time').html(row.date)
                $(template).find('.card-img-top').attr('src', img_url)
                $(template).find('.like-count').html(row.count)

                let news_ele = $(template).find('#news')
                let today = new Date()
                today.setHours(0, 0, 0, 0)
                today = today.getTime()
                let post_date = Date.parse(row.date); 
                
                if(post_date < today) {
                    news_ele.css('visibility', 'hidden')
                }

                $('#board').append(template)
            });
        });
    }

    init()
    control_nav()
    get_card()
    event()
})