$(() => {
    $('#add-option-btn').on('click', () => {
        $('#answerOptionList').append($('<li>').append($('<input>').attr('type', 'text').attr('placeholder', 'Option').attr('name', 'options'
        ),('&nbsp;&nbsp;'), $('<input>').attr('type', 'radio').attr('name', 'correctAnswerIndex').attr('value', $('#answerOptionList').children().length), ('&nbsp;&nbsp;'), $('<span>').text('Correct Answer')));
    })
})