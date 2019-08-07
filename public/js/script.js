$(() => {
    $('.q-card').hide();

    $('#add-option-btn').on('click', () => {
        $('#answerOptionList').append($('<li>').append($('<input>').attr('type', 'text').attr('placeholder', 'Option').attr('name', 'options'
        ),('&nbsp;&nbsp;'), $('<input>').attr('type', 'radio').attr('name', 'correctAnswerIndex').attr('value', $('#answerOptionList').children().length), ('&nbsp;&nbsp;'), $('<span>').text('Correct Answer')));
    })

    $('.q-link').on('click', (event) => {
        // console.log($(event.currentTarget).attr('data'))
        $('.q-link').removeClass('q-link-selected');
        $(event.currentTarget).addClass('q-link-selected');
        $('.q-card').hide();
        $(`#${$(event.currentTarget).attr('data')}`).show();
    })
})