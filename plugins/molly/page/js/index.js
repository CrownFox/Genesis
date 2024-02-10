$(()=>
{
    console.log('Ready')

    $('#send_button').click(()=>
    {
        let message = $('#prompt_input').val()
        $('#messages').append('<div class="message"><p class="message_content" style="white-space: pre-line">' + message + '</div></div>')
        console.log(message)
        $.ajax({
            type: 'POST',
            url: '/molly/api/completion',
            async: true,
            data: {
                username: $('#username_input').val(),
                prompt: $('#prompt_input').val(),
            },
            dataType: 'json',
            success: (data)=>
            {
                console.log(data)
                $('#messages').append('<div class="message"><p class="message_content" style="white-space: pre-line">' + data + '</div></div>')
            }
        })
    })
})